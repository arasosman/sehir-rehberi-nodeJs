const express = require('express');
const router = express.Router();
const Category = require('../models/Category')

/* GET home page. */
router.get('/',(req, res, next) => {
    let promise = Category.find({});

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});


router.post('/', (req, res, next) => {
    const category = new Category(req.body);

    const promise = category.save();

    promise.then((data)=>{
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });

});

module.exports = router;
