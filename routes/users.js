const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', (req, res, next) => {
    const promise = User.find({});

    promise.then((data) => {
        let returnUser = [];

        data.forEach((item) => {
            let element = {
                email:item.email,
                username:item.username,
                name:item.name,

            };
            returnUser.push(element);
        });

        res.json(returnUser)
    }).catch((err) => {
        res.json(err)
    });
});



router.post('/', (req, res, next) => {
    const {username, email, password, name} = req.body;


    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            username,
            password: hash,
            email,
            name,
        });

        const promise = user.save();
        promise.then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        });
    });
});


module.exports = router;
