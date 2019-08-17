const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  
});

module.exports = Book;