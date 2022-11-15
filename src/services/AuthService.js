import $api from '../http/axios'

export default class AuthService {
    static async login (username, password){
        try{
            return $api.post('auth/login', {username, password})
        }
        catch (err) {
            console.error(err)
        }
    }

    static async register (username, email, password, first_name, last_name, phone_number, age) {
        return $api.post('auth/register', {username, email, password, first_name, last_name, phone_number, age})
    }

    static async logout () {
        return $api.post('auth/logout')
    }
}