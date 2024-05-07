"use strict";

module.exports = {
  async find(ctx) {
    try {
      return await strapi
      .plugin("form")
      .service("form")
      .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    try {
      ctx.body = await strapi
        .plugin("form")
        .service("form")
        .delete(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      ctx.body = await strapi
        .plugin("form")
        .service("form")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      ctx.body = await strapi
        .plugin("form")
        .service("form")
        .update(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  
};