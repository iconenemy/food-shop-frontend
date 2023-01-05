import $api from '../http/axios'

export default class AdminService {
    static async getModels(){
        return $api.get('admin/models')
    }

    static async getModelKeys(model){
        return $api.get(`admin/${model}/keys`)
    }

    static async getAll(model){
        return $api.get(`admin/${model}`)
    }
    
    static async delete(model, id) {
        return $api.get(`admin/${model}/${id}/delete`)
   }

    static async findOne(model, id) {
        return $api.get(`admin/${model}/${id}/find`)
    }

    static async updateOne(model, id, updateData) {
        return $api.post(`admin/${model}/${id}/update`, updateData)
    }

    static async upload(fd) {
        return $api.post(`admin/upload`, fd)
    }

    static async checkFile(fd) {
        return $api.post(`admin/check-file`, fd)
    }

    static async create(model, fd) {
        return $api.post(`admin/${model}/create`, fd)
    }
}