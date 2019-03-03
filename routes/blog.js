const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')

/* GET home page. */
router.get('/',(req, res, next) => {

    const promise = Blog.find({});


    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});


router.get('/:blog_id',(req, res, next) => {
    const promise = Blog.findById(req.params.blog_id);

    promise.then( (data) => {
        res.json(data)
    }).catch( (err) => {
        res.json(err)
    });
});


router.put('/:blog_id',(req, res, next) => {
    const promise = Blog.findByIdAndUpdate(req.params.blog_id, req.body);

    promise.then( (data) => {
        res.json({
            status : true,
            data: req.body
        })
    }).catch( (err) => {
        res.json(err)
    });
});


router.delete('/:blog_id',(req, res, next) => {
    const promise = Blog.findByIdAndRemove(req.params.blog_id);

    promise.then( (number) => {
        res.json({
            status : true
        })
    }).catch( (err) => {
        res.json(err)
    });
});

router.post('/', (req, res, next) => {
    const blog = new Blog(req.body);

    const promise = blog.save();

    promise.then((data)=>{
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });

});

module.exports = router;
