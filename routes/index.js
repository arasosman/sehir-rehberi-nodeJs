const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Merhaba Havuz. İlk NodeJs Proje'});
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    //clear all cookies
    res.clearCookie("token");
    res.clearCookie("rememberme");
    res.clearCookie("username");

    User.findOne({
        email
    }, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            res.render('auth/login',{
                status: false,
                message: "User not found"
            });
        } else {
            bcrypt.compare(password, user.password).then((ressult) => {
                if (!ressult) {
                    res.render('auth/login',{
                        status: false,
                        message: "password dont match"
                    });
                } else {
                    const payload = {
                        username: user.username
                    };
                    const token = jwt.sign(payload, req.app.get('secret_key'), {
                        expiresIn: 720
                    });
                    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true });
                    res.cookie('username', user.username , { maxAge: 900000, httpOnly: true });
                    res.cookie('token', token , { maxAge: 900000, httpOnly: true });
                    res.render('admin/index',{
                        status: true,
                        message: "Login Success"
                    });
                }
            }).catch((err) => {
                res.render('auth/login',{
                    status: false,
                    message: err
                });
            });
        }

    });
});

router.post('/api/login', (req, res) => {
    const {username, password} = req.body;

    User.findOne({
        username
    }, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            res.json({
                status: false,
                message: "User not-found"
            })
        } else {
            bcrypt.compare(password, user.password).then((ressult) => {
                if (!ressult) {
                    console.log('bcrpyt if');
                    res.json({
                        status: false,
                        message: "password dont match"
                    });
                } else {
                    const payload = {
                        username: username
                    };
                    const token = jwt.sign(payload, req.app.get('secret_key'), {
                        expiresIn: 720
                    });

                    res.json({
                        status: true,
                        token: token
                    });
                }
            }).catch((err) => {
                res.json(err)
            });
        }

    });
});

router.get('/register', (req,res) => {
    res.render('auth/register');
});

router.post('/register', (req,res) => {
    const {username, email, password, name, lastname} = req.body;


    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            username,
            password: hash,
            email,
            name,
            lastname
        });

        const promise = user.save();
        promise.then((data) => {
            res.render('auth/login');
        }).catch((err) => {
            res.render('auth/register',{
                status:false,
                err:err
            });
        });
    });
});

module.exports = router;
