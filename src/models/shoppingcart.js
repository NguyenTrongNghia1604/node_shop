'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shoppingcart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Shoppingcart.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            userId: DataTypes.STRING,
            productId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            price: DataTypes.STRING,
            size: DataTypes.STRING,
            amount: DataTypes.INTEGER,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            address: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Shoppingcart',
            tableName: 'shoppingcart',
        },
    );
    return Shoppingcart;
};
