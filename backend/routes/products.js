const express = require("express");
const { createNewProductForListing } = require("../api/controllers/products/createNewProductForListing");
const { fetchUnapprovedProducts } = require('../api/controllers/products/fetchUnapprovedProducts');
const { approveProduct } = require('../api/controllers/products/approveProduct');
const { fetchProduct } = require('../api/controllers/products/fetchProduct');
const { updateProduct } = require("../api/controllers/products/updateProduct");
const { deleteProduct } = require("../api/controllers/products/deleteProduct");
const { uploadImage } = require("../api/controllers/products/uploadImage");
const { fetchCartProducts } = require('../api/controllers/products/fetchCartProducts')
const {removeFromCart,} = require("../api/controllers/products/removeFromCart");
const {sellProduct} = require('../api/controllers/products/sellProduct')
const { addToCart } = require("../api/controllers/products/addToCart");
const checkAuth = require('../api/middleware/check-auth');
const { fetchAllExchangable } = require("../api/controllers/products/fetchAllExchangable");
const router = express.Router();

router.route("/fetch_all_exchangable").get(checkAuth, fetchAllExchangable);
router.route("/create_new").post(checkAuth,createNewProductForListing);
router.route("/unapproved").get(checkAuth,fetchUnapprovedProducts);
router.route("/approve").post(checkAuth, approveProduct);
router.route("/sell_product").post(checkAuth, sellProduct);
router.route("/upload_image").get(uploadImage)
router.route("/update").post(checkAuth,updateProduct);
router.route("/:product_id").get(fetchProduct);
router.route("/:product_id").delete(checkAuth, deleteProduct);
router.route("/cart/:userId").get(checkAuth, fetchCartProducts);
router.route("/addToCart/:product_id").post(checkAuth, addToCart);
router.route("/removeFromCart/:product_id").post(checkAuth, removeFromCart);


module.exports = router;
