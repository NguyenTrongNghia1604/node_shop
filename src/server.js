import express from 'express';
const port = process.env.PORT || 8081;
//
import bodyParser from 'body-parser';
//
import session from 'express-session';
import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';
const clientRedis = new Redis();
//const clientRedis = Redis.createClient(); // Tạo client kết nối với Redis;
//
import cors from 'cors';
import configCors from './config/cors';
//
import initRestFullApi from './router/restFullApi';
//
//import checkConnection from './config/connectDB';

const app = express();

app.use(
    session({
        secret: 'keyboard cat',
        store: new RedisStore({ client: clientRedis }),
        resave: false, // có nghĩa là đặt lại session cho mỗi yêu cầu, Giả sử gằng cookie hết hạn sau 10p thì nó sẻ đặt thêm 10p nữa cho mỗi lần request sau.
        saveUninitialized: true, // có nghĩa là bất kì có cookie session hay không mỗi khi cookie và session yêu cầu thì nó được đánh dấu bởi connect.sid theo yêu cầu mặt định
        //saveUninitialized: false, // Chỉ lưu session khi có dữ liệu
        cookie: {
            secure: false, // nếu nó là true thì nó chạy trong https, còn false thì nó chạy trong http
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        },
    }),
);
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
        origin: 'http://localhost:3003',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);

clientRedis.on('connect', () => {
    console.log('Connected to Redis');
});

clientRedis.on('error', (err) => {
    console.error('Redis error:', err);
});

//
initRestFullApi(app);
configCors(app);

//checkConnection();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
