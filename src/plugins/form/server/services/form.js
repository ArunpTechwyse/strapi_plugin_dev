"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany("plugin::form.form", query);
  },

  async delete(id) {
    return await strapi.entityService.delete("plugin::form.form", id);
  },

  async create(data) {
    return await strapi.entityService.create("plugin::form.form", data);
  },

  async update(id, data) {
    return await strapi.entityService.update("plugin::form.form", id, data);
  },

  
});
