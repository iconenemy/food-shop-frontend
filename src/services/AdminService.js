import $api from '../http/axios'

export default class AdminService {
    static async getModels (){
        try{
            return $api.get('admin/models')
        }
        catch (err) {
            console.error(err)
        }
    }
}