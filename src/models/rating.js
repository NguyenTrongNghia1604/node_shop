'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Rating.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            userId: DataTypes.STRING,
            productId: DataTypes.INTEGER,
            rate: DataTypes.INTEGER,
            description: DataTypes.STRING,
            count: DataTypes.INTEGER,
            likes: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Rating',
            tableName: 'rating',
        },
    );
    return Rating;
};
