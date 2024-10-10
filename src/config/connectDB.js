const { Sequelize } = require('sequelize');

// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize('react_shop', 'root', '1234@abcd', {
    host: 'localhost', // Địa chỉ host của cơ sở dữ liệu
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
