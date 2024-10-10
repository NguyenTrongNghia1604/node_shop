//
import serviceDB from '../service/serviceDB.js';
import servicePayment from '../service/servicePayment.js';

const payment = async (req, res) => {
    try {
        let data = await servicePayment.payment(req, res, req.body);
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
            EM: 'Error from service',
            EC: -1,
            DT: '',
        });
    }
};

const ipnResualt = async (req, res) => {
    try {
        // Log toàn bộ request để kiểm tra dữ liệu IPN từ MoMo
        console.log('MoMo IPN request received:', req.body);
        let data = await serviceDB.ipnResualts(req, req.body);
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
            EM: 'Error from service',
            EC: -1,
            DT: '',
        });
    }
};
export default {
    payment,
    ipnResualt,
};
