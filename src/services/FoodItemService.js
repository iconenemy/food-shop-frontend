import $api from '../http/axios'

export default class FoodItem {
    static async getAll(){
        return $api.get(`food-item/get-all`)
    }
    
    static async findOne(id) {
        return $api.get(`food-item/${id}/find`)
    }

    static async delete(id) {
       return $api.get(`food-item/${id}/delete`)
    }

    static async create(fd) {
       return $api.post(`food-item/create`, fd)
   }
   
    static async updateOne( id, updateData) {
        return $api.post(`food-item/${id}/update`, updateData)
    }
}