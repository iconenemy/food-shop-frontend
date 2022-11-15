import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true, 
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    console.log('access: ', localStorage.getItem('access_token'));
    return config
})

$api.interceptors.response.use(config => config, async error => {
    const originRequest = error.config
    console.log(originRequest);
    if (error.response.status === 401 && error.config && !error.config._isRetry){
        originRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('access_token', response.data.accessToken)
            return $api.request(originRequest)
        } catch (err){
            console.log('Unauthorized');
        }
    }
    throw error
})

export default $api