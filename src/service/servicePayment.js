//
//import db from '../models/index';
import axios from 'axios';

const payment = async (req, res, body) => {
    // totalPrice
    const { listProduct, totalPrice } = body;
    console.log('check listProduct', listProduct);
    let idProduct = listProduct.map((item) => {
        return {
            id: item.id, // Lấy id
            userId: item.userId, // Lấy userId
            amount: item.amount,
            price: item.price,
        };
    });
    // Kiểm tra xem idProduct có dữ liệu không
    console.log('Product IDs: ', idProduct); // Log để kiểm tra

    // Chuyển đổi thành mảng id và mảng userId
    let productIds = idProduct.map((item) => item.id);
    let userIds = idProduct.map((item) => item.userId);
    let amounts = idProduct.map((item) => item.amount);
    let prices = idProduct.map((item) => item.price);

    // Log để kiểm tra
    console.log('Product IDs Array: ', productIds);
    console.log('User IDs Array: ', userIds);
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    //
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3003/shoppingCart';
    var ipnUrl = `https://edd9-2402-800-6327-a201-317a-d52c-5cab-72e1.ngrok-free.app/api/v1/ipn`;
    var requestType = 'payWithMethod';
    var amount = totalPrice;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = JSON.stringify({
        productId: productIds, // Truyền thông tin sản phẩm đã chọn
        userId: userIds, // Truyền thêm thông tin người dùng nếu cần
        amount: amounts,
        price: prices,
    });
    //var extraData = '';
    // var paymentCode =
    //     'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';
    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
        'accessKey=' +
        accessKey +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
    });
    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
        data: requestBody, // Thêm phần này để gửi dữ liệu
    };
    //Send the request and get the response
    try {
        const result = await axios(options);
        console.log(result.data);
        return { EM: 'OK', EC: 0, DT: result.data };
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};
export default { payment };
