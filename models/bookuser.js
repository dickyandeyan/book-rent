'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookUser.hasMany(models.Book, { foreignKey: 'BookId' })
      BookUser.hasMany(models.User, { foreignKey: 'UserId' })
    }
  };
  BookUser.init({
    rent_date: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookUser',
  });
  return BookUser;
};