//
import serviceAuth from '../service/serviceAuth';
//import jwt from 'jsonwebtoken';

// login by admin
const loginAdmin = async (req, res) => {
    try {
        let data = await serviceAuth.loginAdmin(req, req.body);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
                ST: data.ST,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from service',
            EC: -1,
            DT: '',
        });
    }
};

// check auth login admin
const checkAuthLogin = async (req, res) => {
    try {
        let data = await serviceAuth.checkAuthLogin(req, res);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
                ST: data.ST,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from service',
            EC: -1,
            DT: '',
        });
    }
};
// xử lý logout admin
// const logoutAdmin = async (req, res) => {
//     try {
//         let data = await serviceAuth.logoutAdmin(req);
//         if (data) {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EM: 'Error from service',
//             EC: -1,
//             DT: '',
//         });
//     }
// };

// xử lý đăng ký tài khoản bên client
const register = async (req, res) => {
    try {
        let data = await serviceAuth.register(req.body);
        console.log('check data', data);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from service', // Sửa lỗi ở đây
            EC: -1,
            DT: '',
        });
    }
};

const login = async (req, res) => {
    try {
        let data = await serviceAuth.login(req, req.body);
        if (data) {
            console.log('thành côgn', data);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
                ST: data.ST,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from service',
            EC: -1,
            ST: '',
        });
    }
};

const checkLogin = async (req, res) => {
    try {
        let data = await serviceAuth.checkLogin(req);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
                ST: data.ST,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from service',
            EC: -1,
            ST: '',
        });
    }
};

// clearSessionLogin
const clearSessionLogin = async (req, res) => {
    try {
        let data = await serviceAuth.clearSessionLogin(req);
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
                ST: data.ST,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from service',
            EC: -1,
        });
    }
};

export default { loginAdmin, checkAuthLogin, register, login, checkLogin, clearSessionLogin };
