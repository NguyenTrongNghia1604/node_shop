import express from 'express';
const router = express.Router();

import serviceDB from '../service/serviceDB';

import apiController from '../controller/apiController';
import authController from '../controller/authController';
// thanh toán
import paymentController from '../controller/paymentController';
const initRestFullApi = (app) => {
    // nhận database category
    router.get('/category', apiController.getCategoryDB);

    // orders
    router.get('/orders', apiController.getOrdersDB);

    // update-status
    router.post('/update-status/:id', apiController.updateStatusDB);

    // login admin
    router.post('/login-admin', authController.loginAdmin);

    // check login admin
    router.get('/check-login-admin', authController.checkAuthLogin);

    // logout admin
    // router.get('/logout-admin', authController.logoutAdmin);

    // nhận database products phân trang
    router.get('/products/read', apiController.getProductsDB);

    // create products
    router.post(
        '/create-products',
        serviceDB.upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'image_path', maxCount: 4 },
        ]),
        apiController.createProducts,
    );
    // update products
    router.post(
        '/update-products/:id',
        serviceDB.upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'image_path', maxCount: 4 },
        ]),
        apiController.updateProducts,
    );
    // delete products
    router.delete('/delete-products/:id', apiController.deleteProducts);

    // shopping cart
    router.post('/shopping-cart', apiController.getShoppingCartDB);
    // shopping cart khi login sucsess
    router.post('/shopping-cart-login', apiController.getShoppingCartDBLogin);
    // xử lý xóa sản phẩm trong shopping cart
    router.post('/delete-shopping-cart/:id', apiController.deleteShoppingCartDB);

    // take data shopping cart
    router.get('/take-data-shoppingcart', apiController.takeDataShoppingCart);

    // take data product display in home
    router.get('/take-data-toast-cart/:id', apiController.takeDataToastCart);
    router.get('/take-data-products', apiController.takeProcducts);
    router.get('/take-data-shirt-men', apiController.takeProcductsShirtMen);
    router.get('/take-data-pants', apiController.takeProcductsPants);
    router.get('/take-data-accessories', apiController.takeProcductsAccessories);
    router.get('/take-data-sale', apiController.takeProcductsSale);
    //end take data

    // search product
    router.post('/search-products', apiController.searchProducts);

    //category product
    router.get('/category-products/:id', apiController.categoryProducts);

    // result search
    router.get('/search-keyword', apiController.resultSearch);

    // take category
    router.get('/take-data-category', apiController.takeDataCategory);

    //
    // take data phụ kiện tương thích
    router.get('/take-data-compatible-accessories', apiController.takeProcductsCompatibleAccessories);
    //end

    // auth
    router.post('/register', authController.register);
    router.post('/login', authController.login);

    // check vision
    router.get('/check-login', authController.checkLogin);

    // clear-session-login
    router.post('/clear-session-login', authController.clearSessionLogin);

    // thanh toán
    router.post('/payment', paymentController.payment);

    // lấy thông tin người dùng
    router.get('/get-user/:id', apiController.getUserDB);

    // cập nhật thông tin khách hàng
    router.post(
        '/updata-info-user',
        serviceDB.upload.fields([{ name: 'avatar', maxCount: 1 }]),
        apiController.updataInfoUser,
    );

    // xử lý nhận Orders db
    router.get('/get-order-db', apiController.getOrdersClientDB);

    // xử lý like product
    router.post('/like-product', apiController.likeProduct);

    // thanh toán
    router.post('/ipn', paymentController.ipnResualt);

    return app.use('/api/v1', router);
};
export default initRestFullApi;
