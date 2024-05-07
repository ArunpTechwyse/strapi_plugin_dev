'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('form')
      .service('myService')
      .getWelcomeMessage();
  },
});
