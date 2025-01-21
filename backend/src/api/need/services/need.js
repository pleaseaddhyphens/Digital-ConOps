'use strict';

/**
 * need service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::need.need');
