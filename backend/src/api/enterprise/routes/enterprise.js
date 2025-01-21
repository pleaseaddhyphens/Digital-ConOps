'use strict';

/**
 * enterprise router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::enterprise.enterprise');
