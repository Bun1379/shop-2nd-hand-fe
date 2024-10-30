import { axiosClient, axiosPrivate } from "./Axios";
import axios from "axios";

class AddressAPI {
    static async CreateAddress(data) {
        const url = "/address";
        return axiosPrivate.post(url, data);
    }

    static async UpdateAddress(id, data) {
        const url = `/address/${id}`;
        return axiosPrivate.put(url, data);
    }

    static async DeleteAddress(id) {
        const url = `/address/${id}`;
        return axiosPrivate.delete(url);
    }

    static async GetAddressByUser() {
        const url = "/address";
        return axiosPrivate.get(url);
    }

    static async SetDefaultAddress(id) {
        const url = `/address/default/${id}`;
        return axiosPrivate.put(url);
    }

    static async CheckAddress(city, district, ward, specificAddress) {
        if (district === "Quận Thủ Đức") {
            district = "Thành phố Thủ Đức";
        }
        const address = `${specificAddress}, ${ward}, ${district}, ${city}, VietNam`;
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
        try {
            const response = await axios.get(url);
            console.log(response.data);
            return response.data.length > 0;
        } catch (error) {
            console.error("Error checking address:", error);
            return false;
        }
    }
}
export default AddressAPI;