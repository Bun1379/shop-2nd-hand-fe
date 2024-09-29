import { axiosClient, axiosPrivate } from "./Axios";

class ProductAPI {
    static async GetProducts(params = {}) {
        const url = "/product";
        return axiosClient.get(url, { params });
    }

    static async GetProduct(id) {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    }

    //     static async CreateProduct(data) {
    //         const url = '/products';
    //         return axiosPrivate.post(url, data);
    //     }

    //     static async UpdateProduct(id, data) {
    //         const url = `/products/${id}`;
    //         return axiosPrivate.put(url, data);
    //     }

    //     static async DeleteProduct(id) {
    //         const url = `/products/${id}`;
    //         return axiosPrivate.delete(url);
    //     }
}

export default ProductAPI;