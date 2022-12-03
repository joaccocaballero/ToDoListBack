'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports =  {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Users', [{
      firstName: 'Joaquin',
      lastName: 'Caballero',
      email:'jca@jca.com',
      password: bcrypt.hashSync('jc123', bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date()
      },
     { 
     firstName: 'José',
     lastName: 'López',
     email: 'jl@jl.com',
     password: bcrypt.hashSync('jl123', bcrypt.genSaltSync(10)),
     createdAt: new Date(),
     updatedAt: new Date()
    }    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users',null, {});
  }
};
