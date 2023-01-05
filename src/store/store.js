import {makeAutoObservable} from 'mobx'
import axios from 'axios'

import { API_URL } from '../http/axios'

import AuthService from '../services/AuthService'
import FoodItemService from '../services/FoodItemService'
import FoodSectionService from '../services/FoodSectionService'
import UserService from '../services/UserService'

export default class Store {
    username = ''
    isAuth = false
    isLoading = false
    isStaff = false
    errors = []
    errorStatus = null
    
    constructor() {
        makeAutoObservable(this)
    }

    setUser(username) {
        this.username = username
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

    setErrors (error) {
        this.errors = error
    }

    setErrorStatus (errorStatus) {
        this.errorStatus = errorStatus
    }

    async login(username, password) {
        try{
            const response = await AuthService.login(username, password)
            localStorage.setItem('access_token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.username)
            this.setStaff(response.data.is_staff)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }

    async register(username, email, password, first_name, last_name, phone_number, age) {
        try{
            await AuthService.register(username, email, password, first_name, last_name, phone_number, age)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }

    async logout() {
        try{
            await AuthService.logout()
            localStorage.removeItem('access_token')
            this.setAuth(false)
            this.setStaff(false)
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
            this.setUser(response.data.username)
        } catch (err) {
            console.log(err.response?.data)
        } finally {
            this.setLoading(false)
        }
    }

    async createFoodItem (fd) {
        try {
            return await FoodItemService.create(fd)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }
    
    async createUser(formData) {
        try {
            return await UserService.create(formData)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }

    async updateUser(id, updateData) {
        try {
            return await UserService.update(id, updateData)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }

    async createFoodSection(formData) {
        try {
            return await FoodSectionService.create(formData)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }

    async updateFoodSection(id, updateData){
        try {
            return await FoodSectionService.update(id, updateData)
        } catch (err) {
            this.setErrorStatus(err.response?.status)
            this.setErrors(err.response?.data)
        }
    }
}