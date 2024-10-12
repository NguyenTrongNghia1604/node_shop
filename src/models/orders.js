'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Orders.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: DataTypes.STRING,
            shoppingcart_id: DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
            price: DataTypes.STRING,
            payment_status: DataTypes.STRING,
            payment_method: DataTypes.INTEGER,
            trading_hours: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Orders',
            tableName: 'orders',
        },
    );
    return Orders;
};
