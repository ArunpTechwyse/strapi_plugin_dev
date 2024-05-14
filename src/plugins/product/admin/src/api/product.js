import { request } from "@strapi/helper-plugin";

const productRequests = {
  getAllProducts: async () => {
    return await request("/product/find", {
      method: "GET",
    });
  },

  addProduct: async (data) => {
    return await request(`/product/create`, {
      method: "POST",
      body: data, // Directly pass the data object
    });
  },
  

  toggleProduct: async (id) => {
    return await request(`/product/toggle/${id}`, {
      method: "PUT",
    });
  },

  editProduct: async (id, data) => {
    return await request(`/product/update/${id}`, {
      method: "PUT",
      body:   data ,
    });
  },

  deleteProduct: async (id) => {
    return await request(`/product/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default productRequests;
