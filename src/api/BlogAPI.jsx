import { axiosClient, axiosPrivate } from "./Axios";

class BlogAPI {
  static async GetBlog(params = {}) {
    const url = "/blog";
    return axiosPrivate.get(url, { params });
  }

  static async CreateBlog(data) {
    const url = "/blog";
    return axiosPrivate.post(url, data);
  }

  static async UpdateBlog(id, data) {
    const url = `/blog/${id}`;
    return axiosPrivate.put(url, data);
  }

  static async DeleteBlog(id) {
    const url = `/blog/${id}`;
    return axiosPrivate.delete(url);
  }

  static async GetBlogBySlug(slug) {
    const url = `/blog/${slug}`;
    return axiosPrivate.get(url);
  }
}

export default BlogAPI;
