import $api from '../http/axios'

export default class UserService {
    static async getAll(){
        return $api.get(`user/get-all`)
    }
    
    static async findOne(id) {
        return $api.get(`user/${id}/find`)
       
    }

    static async delete(id) {
        return $api.get(`user/${id}/delete`)
        
    }

    static async create(fd) {
        return $api.post(`user/create`, fd)
        
   }
   
    static async update( id, updateData) {
        return $api.post(`user/${id}/update`, updateData)
    }
}