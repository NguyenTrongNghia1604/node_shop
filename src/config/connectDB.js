const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load biến môi trường từ file
// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, // Địa chỉ host của cơ sở dữ liệu
    dialect: 'mysql', // Loại cơ sở dữ liệu, ví dụ: 'mysql', 'postgres', 'sqlite', 'mssql'
});

// Kiểm tra kết nối
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = checkConnection; // Export hàm đúng cách
