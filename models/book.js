'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    createdBy() {
      return `${this.title} by ${this.author}`
    }

    static associate(models) {
      // define association here
      Book.belongsTo(models.BookUser, { foreignKey: 'BookId' })
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `title is required!`
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `author's name is required!`
        }
      }
    },
    released_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          msg: `please insert valid year!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};