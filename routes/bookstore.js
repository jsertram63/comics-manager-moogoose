const express = require('express');

const bookStoreController = require('../controllers/bookstore');

const router = express.Router();

router.get('/', bookStoreController.getIndex);
router.get('/bookstore/:comicsId', bookStoreController.getComics);

module.exports = router;
