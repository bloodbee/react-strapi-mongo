'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const slugify = require('slugify')

module.exports = {
  lifecycles: {
    // Auto generate slug on video creation
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = slugify(data.title).toLowerCase();
      }
    },
    // Auto generate slug on video update
    beforeUpdate: async (params, data) => {
      if (data.title) {
        data.slug = slugify(data.title).toLowerCase();
      }
    },
  },
};
