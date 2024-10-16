import express from 'express';
const port = process.env.PORT || 8081;
//
import 'dotenv/config';
const app = express();
import bodyParser from 'body-parser';
//
//import session from 'express-session';
import Redis from 'ioredis';
//import RedisStore from 'connect-redis';
//
import cors from 'cors';
import configCors from './config/cors';
//
import initRestFullApi from './router/restFullApi';
//

// export const redisClient = new Redis({
//     password: process.env.PASS,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT,
//         reconnectOnError: () => true, // Tự động thử lại khi có lỗi
//         socketType: 'tcp', // Đảm bảo rằng kết nối qua giao thức TCP
//         tls: true, // Nếu Redis yêu cầu kết nối bảo mật
//     },
// });

// up
export const redisClient = new Redis('redis://red-cs4het5svqrc738c7t9g:6379');

console.log('REDIS_HOST', process.env.REDIS_HOST);
console.log('REDIS_PORT', process.env.REDIS_PORT);
console.log('PASS', process.env.PASS);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
// app.use(
//     session({
//         secret: 'keyboard cat',
//         store: new RedisStore({ client: redisClient }),
//         resave: false, // có nghĩa là đặt lại session cho mỗi yêu cầu, Giả sử gằng cookie hết hạn sau 10p thì nó sẻ đặt thêm 10p nữa cho mỗi lần request sau.
//         saveUninitialized: true, // có nghĩa là bất kì có cookie session hay không mỗi khi cookie và session yêu cầu thì nó được đánh dấu bởi connect.sid theo yêu cầu mặt định
//         //saveUninitialized: false, // Chỉ lưu session khi có dữ liệu
//         cookie: {
//             secure: false, // nếu nó là true thì nó chạy trong https, còn false thì nó chạy trong http
//             httpOnly: true,
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
//         },
//         // log when the session is saved
//         save: (req, res, next) => {
//             req.session.save((err) => {
//                 if (err) {
//                     console.error('Lỗi khi lưu session:', err);
//                 } else {
//                     console.log('Session được lưu thành công vào Redis:', req.session);
//                 }
//                 next();
//             });
//         },
//     }),
// );
// thêm đoạn này mới định dạng được request api
// Cấu hình body parser
// Cấu hình CORS cho tất cả các route
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '50mb' }));
// Increase the limit for URL-encoded payloads
//app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000000, extended: true }));
// cấu hình đường dẫn vào public image
app.use(express.static('./src/public'));

app.use(
    cors({
        origin: process.env.REACT_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true, // Đảm bảo gửi cookie
    }),
);

//
initRestFullApi(app);
configCors(app);

//checkConnection();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
