const express = require('express');
const {check,body} = require('express-validator/check');


const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);
const User = require('../models/user');
router.post('/login', authController.postLogin);

router.post(
'/signup',
[
    check('email')
    .isEmail()
    .withMessage('please enter a valid Email.')
    .normalizeEmail()
    .custom((value, {req}) => {
        //if (value === 'test@test.com'){
        //    throw new Error('this email if forbidden.');
        //}
        //return true;
        return User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email exist already, please pick a diffent one');
          }
        })
    }),
    body('password')
    .isLength({min:5})
    .withMessage('please enter a password with ony numbers and text at least 5 characters')
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error('password have to match');
        }
        return true

    })
],
 authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);
router.get('/reset/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);
module.exports = router;