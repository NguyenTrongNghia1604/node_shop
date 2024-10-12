'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Search_keyword extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Search_keyword.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            keyword: DataTypes.STRING,
            userId: DataTypes.STRING,
            count: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Search_keyword',
            tableName: 'search_keyword',
        },
    );
    return Search_keyword;
};
