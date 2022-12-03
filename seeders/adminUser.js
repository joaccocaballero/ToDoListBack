'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('AdminUsers', [{
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('admin123', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AdminUsers', null, {});
  }
};
