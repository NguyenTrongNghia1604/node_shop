import { Op, Sequelize } from 'sequelize';
import db from '../models/index';

const categoryDB = async () => {
    try {
        let data = await db.Category.findAll();
        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// phân trang
const paginationProductsDB = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const { count, rows } = await db.Products.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                'id',
                'title',
                'price',
                'description',
                'categoryId',
                'image',
                'priceKm',
                'count',
                'url',
                'type',
            ],
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            products: rows,
        };
        console.log('check data', data);
        return { EM: 'OK', EC: 0, DT: data };
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// get products handle in admin
const getProductsDB = async () => {
    try {
        let data = await db.Products.findAll();
        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// take data product display in home
const productsToastCartDB = async (id) => {
    try {
        let products = await db.Products.findOne({
            where: {
                id: id,
            },
        });
        let productImages = await db.Productimages.findAll({
            where: {
                product_id: id,
            },
        });
        let data = products
            ? {
                  ...products.toJSON(),
                  imagesReview: productImages,
              }
            : null;

        if (data) {
            // Kiểm tra nếu có dữ liệu
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'No products found', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};
const productsHomeDB = async () => {
    try {
        let data = await db.Products.findAll({
            order: Sequelize.literal('RAND()'), // Sắp xếp ngẫu nhiên
            limit: 20, // Giới hạn 20 sản phẩm
        });

        // let productID = products.map((item) => item.id);

        // let productImages = await db.Productimages.findAll({
        //     where: {
        //         product_id: {
        //             [Op.in]: productID,
        //         },
        //     },
        // });
        // let data = products.map((product) => {
        //     return {
        //         ...product.toJSON(),
        //         imagesReview: productImages.filter((item) => item.product_id === product.id),
        //     };
        // });
        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

const productsShirtMenDB = async () => {
    try {
        let data = await db.Products.findAll({
            where: {
                type: 'áo',
            },
        });

        // let productID = products.map((item) => item.id);

        // let productImages = await db.Productimages.findAll({
        //     where: {
        //         product_id: {
        //             [Op.in]: productID,
        //         },
        //     },
        // });
        // let data = products.map((product) => {
        //     return {
        //         ...product.toJSON(),
        //         imagesReview: productImages.filter((item) => item.product_id === product.id),
        //     };
        // });
        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

const productsPantsDB = async (req, res) => {
    try {
        let data = await db.Products.findAll({
            where: {
                type: 'quần',
            },
        });

        // let productID = products.map((item) => item.id);

        // let productImages = await db.Productimages.findAll({
        //     where: {
        //         product_id: {
        //             [Op.in]: productID,
        //         },
        //     },
        // });
        // let data = products.map((product) => {
        //     return {
        //         ...product.toJSON(),
        //         imagesReview: productImages.filter((item) => item.product_id === product.id),
        //     };
        // });
        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

const productsAccessoriesDB = async (req, res) => {
    try {
        let data = await db.Products.findAll({
            where: {
                type: 'phụ kiện',
            },
        });

        // let productID = products.map((item) => item.id);

        // let productImages = await db.Productimages.findAll({
        //     where: {
        //         product_id: {
        //             [Op.in]: productID,
        //         },
        //     },
        // });
        // let data = products.map((product) => {
        //     return {
        //         ...product.toJSON(),
        //         imagesReview: productImages.filter((item) => item.product_id === product.id),
        //     };
        // });
        if (data && data.length > 0) {
            // Kiểm tra nếu có dữ liệu
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'No products found', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};
const productsSaleDB = async (req, res) => {
    try {
        let data = await db.Products.findAll({
            where: {
                priceKm: { [Op.gt]: 0 }, // điều kiện tren 0
            },
        });

        // let productID = products.map((item) => item.id);

        // let productImages = await db.Productimages.findAll({
        //     where: {
        //         product_id: {
        //             [Op.in]: productID,
        //         },
        //     },
        // });
        // let data = products.map((product) => {
        //     return {
        //         ...product.toJSON(),
        //         imagesReview: productImages.filter((item) => item.product_id === product.id),
        //     };
        // });
        if (data) {
            // Kiểm tra nếu có dữ liệu
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'No products found', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};
// end take data

// search product
const searchProductsDB = async (body) => {
    try {
        // Kiểm tra nếu body hoặc search không có giá trị
        if (!body || !body.search) {
            return { EM: 'Dữ liệu tìm kiếm không hợp lệ', EC: 1, DT: [] };
        }
        const { search, userId } = body;

        // Tìm key đầu tiên trong object body
        let checkKeyWord = await db.Search_keyword.findOne({
            where: {
                keyword: search,
            },
        });
        if (checkKeyWord) {
            await db.Search_keyword.update({ count: checkKeyWord.count + 1 }, { where: { keyword: search } });
        } else {
            await db.Search_keyword.create({
                keyword: search,
                userId: userId || [],
                count: 1,
            });
        }
        let data = await db.Products.findAll({
            where: {
                title: { [Op.like]: `%${search}%` }, // Tiếm kê tiếu cập nhật
            },
        });

        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'Không tìm thấy sản phẩm', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// category product
const categoryProductsDB = async (id) => {
    try {
        let data = await db.Products.findAll({
            where: {
                categoryId: id,
            },
        });

        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'Không tìm thấy sản phẩm', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// result search
const resultSearchDB = async () => {
    try {
        let data = await db.Search_keyword.findAll();
        if (data) {
            return { EM: 'OK', EC: 0, DT: data };
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

// take data category
const takeCatogoryDB = async (req, res) => {
    try {
        let type = await db.Type.findAll();
        let typeId = type.map((item) => item.id);
        let category = await db.Category.findAll({
            where: {
                type: { [Op.in]: typeId }, // So sánh cột 'type' với danh sách 'typeIds'
            },
        });
        let data = type.map((item) => {
            return {
                ...item.toJSON(),
                Category: category.filter((category) => parseInt(category.type) === item.id),
            };
        });

        if (data && data.length > 0) {
            // Kiểm tra nếu có dữ liệu
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'No products found', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};
//

//  lấy data phụ kiện tương thích
const productsCompatibleAccessoriesDB = async (req, res) => {
    try {
        let products = await db.Products.findAll({
            where: {
                type: 'phụ kiện', // Điều kiện loại sản phẩm
            },
            order: Sequelize.literal('RAND()'), // Sắp xếp ngẫu nhiên
            limit: 5, // Giới hạn 5 sản phẩm
        });

        let productID = products.map((item) => item.id);

        let productImages = await db.Productimages.findAll({
            where: {
                product_id: {
                    [Op.in]: productID,
                },
            },
        });
        let data = products.map((product) => {
            return {
                ...product.toJSON(),
                imagesReview: productImages.filter((item) => item.product_id === product.id),
            };
        });
        if (data && data.length > 0) {
            // Kiểm tra nếu có dữ liệu
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'No products found', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

//

// filter => là nó lấy toàn bộ dữ liệu thành 1 mảng
// find => lấy 1 phần dữ liệu trong mảng
// takeDataShoppingCart
const takeDataShoppingCart = async () => {
    try {
        let shoppingCart = await db.Shoppingcart.findAll();
        let productId = shoppingCart.map((item) => item.productId);
        let products = await db.Products.findAll({
            where: {
                id: {
                    [Op.in]: productId,
                },
            },
        });
        let data = shoppingCart.map((item) => {
            let product = products.find((product) => product.id === item.productId);
            return {
                ...item.toJSON(),
                images: product && product.image,
                type: product && product.type,
            };
        });

        if (data && data.length > 0) {
            // Kiểm tra nếu có dữ liệu
            return { EM: 'OK', EC: 0, DT: data };
        } else {
            return { EM: 'No products found', EC: 1, DT: [] }; // Không có sản phẩm nào
        }
    } catch (error) {
        console.log(error);
        return { EM: 'Error from service', EC: -1, DT: '' };
    }
};

export default {
    categoryDB,

    paginationProductsDB,
    getProductsDB,
    //
    productsToastCartDB,
    productsHomeDB,
    productsShirtMenDB,
    productsPantsDB,
    productsAccessoriesDB,
    productsSaleDB,
    //
    searchProductsDB,
    categoryProductsDB,
    //
    resultSearchDB,
    //
    takeCatogoryDB,
    //
    productsCompatibleAccessoriesDB,
    //
    takeDataShoppingCart,
};
