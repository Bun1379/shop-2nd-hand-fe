import { axiosClient, axiosPrivate } from "./Axios";

class BlogAPI {
  static async GetBlog(params = {}) {
    const url = "/blog";
    return axiosClient.get(url, { params });
  }

  static async CreateBlog(data) {
    const url = "/blog";
    return axiosPrivate.post(url, data);
  }

  static async UpdateBlog(id, data) {
    const url = `/blog/${id}`;
    return axiosPrivate.put(url, data);
  }

  static async GetBlogBySlug(slug) {
    const url = `/blog/${slug}`;
    return axiosClient.get(url);
  }
}

export default BlogAPI;
