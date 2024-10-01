import { axiosClient, axiosPrivate } from "./Axios";

class CategoryAPI {
    static async getAllCategories() {
        const url = '/category';
        return axiosClient.get(url);
    }
}

export default CategoryAPI;