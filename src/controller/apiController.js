//
//import serviceShoppingCart from '../service/shoppingCart';
import getDB from '../service/getDB';
import serviceDB from '../service/serviceDB';

// nhận database category
const getCategoryDB = async (req, res) => {
    try {
        let data = await getDB.categoryDB();
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

// nhận order DB
const getOrdersDB = async (req, res) => {
    try {
        let data = await getDB.getOrdersDB();
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log(error);
        return req.status(500).json({
            EM: 'Error from service',
            EC: -1,
            DT: '',
        });
    }
};

// updateStatusDB
const updateStatusDB = async (req, res) => {
    try {
        let id = req.params.id;
        let e = req.body;
        let data = await getDB.updateStatusDB(id, Object.keys(e));
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
    } catch (error) {
        console.log(error);
        return req.status(500).json({
            EM: 'Error from service',
            EC: -1,
            DT: '',
        });
    }
};

// nhận database products phân trang
const getProductsDB = async (req, res) => {
    try {
        console.log('check body', req.query);
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // +page , +limit => tức là chuyển nó sang dạng number
            let data = await getDB.paginationProductsDB(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
        // ngược lại nếu không có chuyền page và limit thì nó hiện tất cả database
        else {
            let data = await getDB.getProductsDB();
            return res.status(200).json({
                EM: data.EM, // viết tắt của từ error message;
                EC: data.EC, // viết tắt của từ error code (khi có lỗi thì -1)
                DT: data.DT, // viết tắt của từ Data
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

// create products
const createProducts = async (req, res) => {
    try {
        console.log('thành công ');
        if (!req.files['image'][0]) {
            return res.status(400).json({
                EM: 'Không được để trống Avatar',
                EC: '1',
                DT: '',
            });
        }
        if (!req.files['image_path']) {
            return res.status(400).json({
                EM: 'Không là một anh review',
                EC: '1',
                DT: '',
            });
        }
        let data = await serviceDB.createProductsDB(req.files, req.body);
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

// update products
const updateProducts = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await serviceDB.updateProducts(req.files, req.body, id);
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

// delete products
const deleteProducts = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await serviceDB.deleteProducts(id);
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

// phân trang

// shopping cart
const getShoppingCartDB = async (req, res) => {
    try {
        let data = await serviceDB.getShoppingCartDB(req, req.body);
        console.log('check data shopping ', data);
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

// getShoppingCartDBLogin
const getShoppingCartDBLogin = async (req, res) => {
    try {
        let data = await serviceDB.getShoppingCartDBLogin(req, req.body);
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

// xử lý xóa sản phẩm trong shopping cart
const deleteShoppingCartDB = async (req, res) => {
    try {
        let id = req.params.id;
        console.log('id', id);
        let data = await serviceDB.deleteShoppingCartDB(id);
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

//takeDataShoppingCart
const takeDataShoppingCart = async (req, res) => {
    try {
        let data = await getDB.takeDataShoppingCart(req);
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

//take data
const takeDataToastCart = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await getDB.productsToastCartDB(+id);
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
const takeProcducts = async (req, res) => {
    try {
        let data = await getDB.productsHomeDB();
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
//api áo nam
const takeProcductsShirtMen = async (req, res) => {
    try {
        let data = await getDB.productsShirtMenDB();
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
// api quần
const takeProcductsPants = async (req, res) => {
    try {
        let data = await getDB.productsPantsDB();
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
// api phụ kiện
const takeProcductsAccessories = async (req, res) => {
    try {
        let data = await getDB.productsAccessoriesDB();
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
// api khuyến mãi
const takeProcductsSale = async (req, res) => {
    try {
        let data = await getDB.productsSaleDB();
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
//end take data

// lấy data phụ kiện tương thích
const takeProcductsCompatibleAccessories = async (req, res) => {
    try {
        let data = await getDB.productsCompatibleAccessoriesDB();
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

//end

// search products
const searchProducts = async (req, res) => {
    try {
        console.log('check body', req.body);
        let data = await getDB.searchProductsDB(req.body);
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

// category product
const categoryProducts = async (req, res) => {
    try {
        let id = req.params.id;

        let data = await getDB.categoryProductsDB(+id);
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

// result search
const resultSearch = async (req, res) => {
    try {
        let data = await getDB.resultSearchDB();
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
// take category
const takeDataCategory = async (req, res) => {
    try {
        let data = await getDB.takeCatogoryDB();
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
//
// take data info user
const getUserDB = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await serviceDB.getUserDB(id);
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

// cập nhật thông tin khách hàng
const updataInfoUser = async (req, res) => {
    try {
        let data = await serviceDB.updataInfoUser(req.files, req.body);
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

// xử lý nhận order db
const getOrdersClientDB = async (req, res) => {
    try {
        let data = await getDB.getOrdersClientDB();
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

// xử lý like product
const likeProduct = async (req, res) => {
    try {
        console.log('check body', req.body);
        let data = await serviceDB.likeProduct(req.body);
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

export default {
    getCategoryDB,
    getOrdersDB,
    updateStatusDB,
    getProductsDB,
    createProducts,
    updateProducts,
    deleteProducts,
    getShoppingCartDB,
    getShoppingCartDBLogin,
    deleteShoppingCartDB,
    takeDataShoppingCart,
    //
    takeDataToastCart,
    takeProcducts,
    takeProcductsShirtMen,
    takeProcductsPants,
    takeProcductsAccessories,
    takeProcductsSale,
    //
    searchProducts,
    categoryProducts,
    //
    resultSearch,
    //
    takeDataCategory,
    //
    takeProcductsCompatibleAccessories,
    //
    getUserDB,
    updataInfoUser,

    getOrdersClientDB,
    likeProduct,
};
