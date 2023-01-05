import $api from '../http/axios'

export default class FoodSectionService {
    static async getAll(){
       return $api.get(`food-section/get-all`)
    }
    
    static async findOne(id) {
       return $api.get(`food-section/${id}/find`)
    }

    static async delete(id) {
       return $api.get(`food-section/${id}/delete`)
    }

    static async create(fd) {
        return $api.post(`food-section/create`, fd)
   }
   
    static async update(id, updateData) {
       return $api.post(`food-section/${id}/update`, updateData)
    }
}