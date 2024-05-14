"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany("plugin:product.product", query);
  },

  async delete(id) {
    return await strapi.entityService.delete("plugin::product.product", id);
  },

  async create(data) {
    console.log('Creating product with data:', data); // Add this line for debugging
    return await strapi.entityService.create('plugin::product.product',data);},
 
  
  async update(id, data) {
    return await strapi.entityService.update("plugin::product.product", id, data);
  },

  async toggle(id) {
    const result = await strapi.entityService.findOne("plugin::product.product", id);
    return await strapi.entityService.update("plugin::product.product", id, {
      data: { isDone: !result.isDone },
    });
  },
});
