const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
// /admin/add-category => GET
router.get('/add-category',isAuth, adminController.getAddCategory);
// /admin/add-category => POST
router.post('/add-category',isAuth, adminController.postAddCategory);
// /admin/products => GET
//router.get('/categories', adminController.getCategories);
router.get('/add-comics', isAuth,adminController.getAddComics);
router.post('/add-comics', isAuth,adminController.postAddComics);

module.exports = router;