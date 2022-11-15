import {makeAutoObservable} from 'mobx'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { API_URL } from '../http/axios'

export default class Store {
    user = {}
    isAuth = false
    isLoading = false
    isStaff = false
    
    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.user = user
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setLoading (bool) {
        this.isLoading = bool
    }

    setStaff (bool) {
        this.isStaff = bool
    }

    async login(username, password) {
        try{
            const response = await AuthService.login(username, password)
            localStorage.setItem('access_token', response.data.accessToken)
            console.log('Access_token(login): ', localStorage.getItem('access_token'));
            this.setAuth(true)
            this.setUser({
                username: response.data.username,
            })
            this.setStaff(response.data.is_staff)
            console.log(this.isStaff);
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    async register(username, email, password, first_name, last_name, phone_number, age) {
        try{
            return await AuthService.register(username, email, password, first_name, last_name, phone_number, age)
        } catch (err) {
            console.log(err.response.data)
        }
    }

    async logout() {
        try{
            await AuthService.logout()
            localStorage.removeItem('access_token')
            this.setAuth(false)
            console.log(this.isAuth);
        } catch (err) {
            console.log(err.response?.data)
        }
    }

    async checkAuth () {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('access_token', response.data.accessToken)
            this.setAuth(true)
            this.setStaff(response.data.is_staff)
        } catch (err) {
            console.log(err.response?.data)
        } finally {
            this.setLoading(false)
        }
    }
}