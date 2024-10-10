'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Products.init(
        {
            id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
            title: DataTypes.STRING,
            price: DataTypes.STRING,
            description: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
            image: DataTypes.STRING,
            priceKm: DataTypes.STRING,
            count: DataTypes.INTEGER,
            url: DataTypes.STRING,
            type: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Products',
            tableName: 'products',
        },
    );
    return Products;
};
