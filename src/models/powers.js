'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Powers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Powers.init(
        {
            powersId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            adds: DataTypes.BOOLEAN,
            deletes: DataTypes.BOOLEAN,
            edits: DataTypes.BOOLEAN,
            userId: DataTypes.STRING,
            role: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Powers',
            tableName: 'powers',
            timestamps: false, // Thêm dòng này để tắt timestamps
        },
    );
    return Powers;
};
