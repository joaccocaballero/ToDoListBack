'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasklists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasklists.init({
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    description: DataTypes.STRING,
    priorityType:{
        type:DataTypes.ENUM("prioridad-baja", "prioridad-media","prioridad-alta"),
    },
    status: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    userId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Tasklists',
  });
  return Tasklists;
};