'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likeproduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Likeproduct.init(
        {
            id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
            product_id: DataTypes.INTEGER,
            user_id: DataTypes.STRING,
            like: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Likeproduct',
            tableName: 'likeproduct',
            timestamps: false, // Thêm dòng này để tắt timestamps
        },
    );
    return Likeproduct;
};
