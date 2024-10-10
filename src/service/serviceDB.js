import db from '../models/index';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Thêm dòng này để import fs

//const UPLOAD_FOLDER = path.join(__dirname, '..', 'uploads'); // Đường dẫn tương đối đến thư mục lưu trữ
const UPLOAD_FOLDER = 'src/public/images';
// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, '').split(' ').join('-');
        console.log('Generated filename:', fileName + fileExt);
        cb(null, fileName + fileExt);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000,
    },
    fileFilter: (req, file, cb) => {
        // đoạn này là phát sinh ra lỗi
        // if (file.fieldname === 'image') {
        //     if (
        //         file.mimetype === 'image/png' ||
        //         file.mimetype === 'image/jpg' ||
        //         file.mimetype === 'image/jpeg' ||
        //         file.mimetype === 'image/jfif'
        //     ) {
        //         cb(null, true);
        //     } else {
        //         cb(new Error('Only .png .jpg or .jpeg files allowed!'));
        //     }
        // }
        // đoạn này mới đúng
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});
const createProductsDB = async (files, body) => {
    try {
        // main image
        const avatarPath = files['image'][0].path;
        const relativeAvatarPath = path.relative(__dirname, avatarPath);
        // Kiểm tra sự tồn tại của các tệp
        if (!fs.existsSync(avatarPath)) {
            throw new Error(`File not found: ${avatarPath}`);
        }
        let data = await db.Products.create({
            title: body.title,
            price: body.price,
            description: body.description,
            categoryId: parseInt(body.category),
            image: `${path.basename(relativeAvatarPath)}`,
            priceKm: body.priceKm,
            count: body.count,
            url: body.url,
            type: body.type,
        });
        // review images
        if (files['image_path'] && Array.isArray(files['image_path'])) {
            for (const reviewImage of files['image_path']) {
                const relativeImagePath = path.relative(__dirname, reviewImage.path);
                await db.Productimages.create({
                    product_id: data.id,
                    image_path: path.basename(relativeImagePath),
                });
            }
        }
        if (data) {
            return { EM: 'Create Thành công', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

const updateProducts = async (files, body, id) => {
    try {
        const avatarPath = files['image'][0].path;
        const relativeAvatarPath = path.relative(__dirname, avatarPath);
        // Kiểm tra sự tồn tại của các tệp
        if (!fs.existsSync(avatarPath)) {
            throw new Error(`File not found: ${avatarPath}`);
        }
        let data = await db.Products.update(
            {
                title: body.title,
                price: body.price,
                description: body.description,
                categoryId: parseInt(body.category),
                image: `${path.basename(relativeAvatarPath)}` || undefined,
                priceKm: body.priceKm,
                count: body.count,
                url: body.url,
                type: body.type,
            },
            {
                where: {
                    id: id,
                },
            },
        );
        // Xóa các hình ảnh cũ nếu có
        await db.Productimages.destroy({
            where: {
                product_id: id,
            },
        });
        if (files['image_path'] && Array.isArray(files['image_path'])) {
            for (const reviewImage of files['image_path']) {
                const relativeImagePath = path.relative(__dirname, reviewImage.path);
                await db.Productimages.create({
                    product_id: id,
                    image_path: path.basename(relativeImagePath),
                });
            }
        }

        if (data) {
            return { EM: 'Update Thành Công', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

const deleteProducts = async (id) => {
    try {
        let data = await db.Products.destroy({
            where: {
                id: id,
            },
        });
        await db.Productimages.destroy({
            where: {
                product_id: id,
            },
        });
        if (data) {
            return { EM: 'Delete Thành Công', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

// shopping cart
const getShoppingCartDB = async (req, body) => {
    try {
        console.log('ody', body);
        let data = await db.Shoppingcart.create({
            userId: body.userId,
            productId: body.productId,
            title: body.title,
            price: body.price,
            size: body.size,
            amount: body.amount,
        });
        if (data) {
            return { EM: 'Đã thêm vào giỏ hàng', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};
// getShoppingCartDBLogin
const getShoppingCartDBLogin = async (req, body) => {
    try {
        // Kiểm tra kiểu dữ liệu
        // Giả sử body là một mảng
        if (Array.isArray(body)) {
            const productIds = body.map((item) => item.productId);
            // Tìm tất cả các sản phẩm đã có trong giỏ hàng dựa trên productId
            const existingItems = await db.Shoppingcart.findAll({
                where: {
                    productId: productIds,
                },
            });
            // Tạo một danh sách các productId đã tồn tại
            const existingProductIds = existingItems.map((item) => item.productId);

            // Kiểm tra sản phẩm nào đã có trong giỏ hàng
            const newItems = body.filter((item) => !existingProductIds.includes(item.productId));

            // Nếu tất cả sản phẩm đã có trong giỏ hàng, trả về thông báo
            if (newItems.length > 0) {
                // Nếu có sản phẩm mới, thêm chúng vào giỏ hàng
                const results = [];
                for (const item of newItems) {
                    const createdItem = await db.Shoppingcart.create({
                        userId: item.userId,
                        productId: item.productId,
                        title: item.title,
                        price: item.price,
                        size: item.size,
                        amount: item.amount,
                    });
                    results.push(createdItem);
                }

                return { EM: 'Đã thêm sản phẩm mới vào giỏ hàng', EC: 0, DT: results };
            } else {
                return { EM: 'Tất cả sản phẩm đã có trong giỏ hàng', EC: -1 };
            }
        } else {
            return { EM: 'Dữ liệu không hợp lệ', EC: -1, DT: null };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

// xử lý xóa sản phẩm trong shopping cart
const deleteShoppingCartDB = async (body) => {
    try {
        console.log('body', body);
        let data = await db.Shoppingcart.destroy({
            where: {
                id: body,
            },
        });
        if (data) {
            return { EM: 'Delete Thành Công', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

// take data info user
const getUserDB = async (id) => {
    try {
        let data = await db.User.findOne({
            where: {
                userId: id,
            },
        });
        if (data) {
            return { EM: 'Get Thành Công', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

// xử lý cập nhật thông tin khách hàng
const updataInfoUser = async (files, body) => {
    try {
        const avatarPath = files['avatar'][0].path;
        const relativeAvatarPath = path.relative(__dirname, avatarPath);
        let data = await db.User.update(
            {
                fullName: body.fullName,
                images: `${path.basename(relativeAvatarPath)}`,
                phone: String(body.number),
                address: body.address,
            },
            {
                where: {
                    userId: body.userId,
                },
            },
        );
        if (data) {
            return { EM: 'Update Thành Công', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

const ipnResualts = async (req, body) => {
    try {
        const { resultCode, message, extraData: rawExtraData } = body;
        if (resultCode == 0) {
            console.log('check extraData', rawExtraData);
            let extraData = JSON.parse(rawExtraData); // Parse JSON trước khi xử lý
            let dataShoppingCart = await db.Shoppingcart.findAll(); // Await for this promise
            let shoppingId = dataShoppingCart.map((item) => item.id);
            let shoppingUserId = dataShoppingCart.map((item) => item.userId);
            // Use Promise.all to handle asynchronous operations
            let result = await Promise.all(
                extraData.productId.map(async (productId, index) => {
                    let userId = extraData.userId[index];
                    let amount = extraData.amount[index];
                    let price = extraData.price[index];
                    let ck = shoppingId.includes(productId);
                    let ck1 = shoppingUserId.includes(userId);
                    if (ck && ck1) {
                        return db.Orders.create({
                            userId: userId,
                            productId: productId,
                            amount: amount,
                            price: price,
                            payment_status: 'Đanh xử lý...',
                            payment_method: 'MOMO',
                            trading_hours: new Date().toLocaleString(),
                        });
                    } else {
                        console.log('cceeeeeeeeeeeeeeeeeeeeeeee sai');
                    }
                }),
            );
            return { EM: 'Thanh Cong', EC: 0, DT: result };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};

// xủ lý like product
const likeProduct = async (body) => {
    try {
        const { id, userId } = body;
        let likeProduct = await db.Likeproduct.findAll();
        let checkLike = likeProduct.map((item) => {
            return {
                productID: item.product_id,
                userID: item.user_id,
            };
        });
        let idProduct = id.includes((item) => item.id === checkLike.productID);
        let idUser = userId.includes((item) => item.userId === checkLike.userID);
        if (idProduct && idUser) {
            return { EM: 'Đã có like product rồi', EC: 0, DT: null };
        } else {
            let data = await db.Likeproduct.create({
                product_id: id,
                user_id: userId,
                like: 1,
            });
            if (data) {
                return { EM: 'Đã like product', EC: 0, DT: data };
            }
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: error };
    }
};
export default {
    upload,
    createProductsDB,
    updateProducts,
    deleteProducts,
    getShoppingCartDB,
    getShoppingCartDBLogin,
    deleteShoppingCartDB,
    getUserDB,
    updataInfoUser,
    ipnResualts,
    likeProduct,
};
