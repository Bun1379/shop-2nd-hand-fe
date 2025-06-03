import { axiosPrivate } from "./Axios";

class OpenAiAPI {
  static async GenerateDescription(data) {
    const url = "/openai/generate-description";
    return axiosPrivate.post(url, data);
  }
}

export default OpenAiAPI;
