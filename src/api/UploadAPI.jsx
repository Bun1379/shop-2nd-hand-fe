import { axiosClient, axiosPrivate } from "./Axios";

class UploadAPI {
    static async Upload(file) {
        const url = "/upload";
        const formData = new FormData();
        formData.append("image", file);
        return axiosPrivate.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

export default UploadAPI;