//
import db from '../models/index';
const jwt = require('jsonwebtoken');

import { redisClient } from '../server';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const checkPassword = (inputPassword, hash) => {
    const isMatch = bcrypt.compareSync(inputPassword, hash);
    return isMatch;
};

// Hàm tạo JWT
function createToken(user) {
    // Dữ liệu payload là thông tin bạn muốn lưu trong token
    const payload = {
        fullName: user.fullName,
        role: user.status,
    };

    // Tạo token với key bí mật và thời gian sống (expiresIn)
    const token = jwt.sign(payload, 'secret_key', { expiresIn: '1h' });
    return token;
}

// login by admin
const loginAdmin = async (req, body) => {
    try {
        const data = await db.Admin.findOne({
            where: {
                username: body.account,
            },
        });
        if (!data) {
            return { EM: 'Wrong email', EC: -1, DT: null, ST: false };
        }
        const checkPass = checkPassword(body.password, data.password);
        if (!checkPass) {
            return { EM: 'Wrong password', EC: -1, DT: null, ST: false };
        }
        if (data && checkPass) {
            // Giả sử người dùng đăng nhập thành công
            const token = createToken({ fullName: data.fullName || 'Admin', role: data.role });
            console.log('tolen', token);
            return { EM: 'Login thành công', EC: 0, DT: data, ST: token };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// xử lý check auth login admin
// Middleware kiểm tra token và xác thực
const checkAuthLogin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('authHeader:', authHeader); // Kiểm tra giá trị này

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { EM: 'Authorization header missing or malformed', EC: -1, DT: '' };
    }

    const token = authHeader.split(' ')[1]; // Lấy token từ header

    if (!token) {
        return { EM: 'Token is missing', EC: -1, DT: '' };
    }

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return { EM: 'Token is invalid', EC: -1, DT: '' };
        }

        if (user) {
            req.user = user; // Lưu thông tin user từ token vào request
            console.log('user:', user);
            next(); // Chuyển sang bước tiếp theo
        } else {
            return { EM: 'Authentication failed', EC: -1, DT: '' };
        }
    });
};

// logout admin
// const logoutAdmin = async (req) => {
//     try {
//         // Kiểm tra xem header Authorization có tồn tại không
//         const authHeader = req.headers['authorization'];
//         if (!authHeader) {
//             return { EM: 'Authorization header is missing', EC: -1, DT: '' };
//         }
//         // Tách token từ header
//         const token = authHeader.split(' ')[1];
//         if (!token) {
//             return { EM: 'Token is missing', EC: -1, DT: '' };
//         }
//         // Xác thực token
//         jwt.verify(token, 'secret_key', (err, decoded) => {
//             if (err) {
//                 return { EM: 'Token is invalid', EC: -1, DT: '' };
//             }

//             // Xóa token trong Redis hoặc cơ sở dữ liệu nếu có
//             redisClient.del(token, (err, reply) => {
//                 if (err) {
//                     return { EM: 'Error deleting token', EC: -1, DT: '' };
//                 }

//                 // Trả về phản hồi thành công
//                 return { EM: 'Đăng xuất thành công ', EC: 0 };
//             });
//         });
//     } catch (error) {
//         console.log(error);
//         return { EM: 'Error from service', EC: -1, DT: error };
//     }
// };

// xử lý đăng ký client
const register = async (body) => {
    const password = await hashPassword(body.password);
    const id = uuidv4();
    try {
        let data = await db.User.create({
            userId: id,
            fullName: body.fullName,
            username: body.username,
            email: body.email,
            password: password,
            role: 2,
            type: 'Client',
        });
        console.log('check auth', data);
        if (data) {
            return { EM: 'Đăng ký thành công', EC: 0, DT: data };
        } else {
            return { EM: 'Đăng ký thất bại', EC: -1, DT: '' };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

const login = async (req, body) => {
    try {
        let user = await db.User.findOne({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            return { EM: 'lỗi không tim thấy user', EC: -1, DT: '' };
        }
        let ckPass = checkPassword(req.body.password, user.password);

        // Kiểm tra nếu mật khẩu không đúng
        if (!ckPass) {
            return { EM: 'mật khẩu không đúng ', EC: -1, DT: '' };
        }
        const sessionKey = `session:${user.userId}`;
        // Lưu thông tin vào session nếu đăng nhập thành công
        await redisClient.hmset(sessionKey, {
            userId: user.userId,
            role: user.role,
            fullName: user.fullName,
            images: user.images,
            status: 'true',
        });
        await redisClient.expire(`session:${user.userId}`, 7 * 24 * 60 * 60); // 7 ngày
        // check redis
        const session = await redisClient.hgetall(sessionKey);
        console.log('check redis cloud', JSON.stringify(session, null, 2));

        // req.session.userId = user.userId;
        // req.session.role = user.role;
        // req.session.fullName = user.fullName;
        // req.session.images = user.images;
        // req.session.status = true;
        // Gửi phản hồi về phía client
        return {
            EM: 'thành coog ',
            EC: 0,
            DT: { userId: user.userId, role: user.role, fullName: user.fullName, images: user.images },
            ST: true,
        };
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

const checkLogin = async (req, userId) => {
    try {
        const sessionKey = `session:${userId}`;
        // Kiểm tra dữ liệu trong Redis
        const redisSession = await redisClient.hgetall(sessionKey);

        if (redisSession && redisSession.status === 'true') {
            // Cập nhật thời gian hết hạn
            await redisClient.expire(sessionKey, 7 * 24 * 60 * 60); // 7 ngày

            return {
                EM: 'OK',
                EC: 0,
                DT: {
                    userId: redisSession.userId,
                    role: redisSession.role,
                    fullName: redisSession.fullName,
                    images: redisSession.images,
                },
                ST: true,
            };
        } else {
            return {
                EM: 'Đã Hết phiên đăng nhập!',
                EC: 0,
                ST: redisSession.status,
            };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

// clearSessionLogin
const clearSessionLogin = async (req, userId) => {
    try {
        const sessionKey = `session:${userId}`;
        try {
            // Xóa session từ Redis
            await redisClient.del(sessionKey);
            return { EM: 'Đăng xuất thành công ', EC: 0 };
        } catch (error) {
            console.error('Lỗi khi xóa session khỏi Redis:', error);
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1 };
    }
};
export default { loginAdmin, checkAuthLogin, register, login, checkLogin, clearSessionLogin };
