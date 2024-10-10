'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Productimages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Productimages.init(
        {
            id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
            product_id: DataTypes.INTEGER,
            image_path: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Productimages',
            tableName: 'Productimages',
        },
    );
    return Productimages;
};
