// thư viện dùng để định dạng process.env.PORT 
import 'dotenv/config'

const configCors = (app) => {
    // Add headers before the routers are defined
    app.use(function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL)

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

        // Pass to next layer of middleware
        next()
    });
}

export default configCors;
