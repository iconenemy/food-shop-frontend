import $api from '../http/axios'

export default class FoodService {
    static async getAllFoodSection(){
        return $api.get(`food/section/get-all`)
    }

    static async getAllFoodItemByFoodSectionId(id){
        return $api.post(`food/item/get-list-by-section`, {id: id})
    }

}