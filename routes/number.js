const express = require('express');
const router = express.Router();
const Number = require('../models/Number')

/* GET home page. */
router.get('/',(req, res, next) => {

    const promise = Number.find({});


    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});


router.get('/:number_id',(req, res, next) => {
    const promise = Number.findById(req.params.number_id);

    promise.then( (data) => {
        res.json(data)
    }).catch( (err) => {
        res.json(err)
    });
});

router.get('/tel/:number',(req, res, next) => {
    const promise = Number.find({number: req.params.number});

    promise.then( (data) => {
        res.json(data)
    }).catch( (err) => {
        res.json(err)
    });
});


router.put('/:number_id',(req, res, next) => {
    const promise = Number.findByIdAndUpdate(req.params.number_id, req.body);

    promise.then( (data) => {
        res.json({
            status : true,
            data: req.body
        })
    }).catch( (err) => {
        res.json(err)
    });
});


router.delete('/:number_id',(req, res, next) => {
    const promise = Number.findByIdAndRemove(req.params.number_id);

    promise.then( (number) => {
        res.json({
            status : true
        })
    }).catch( (err) => {
        res.json(err)
    });
});

router.post('/', (req, res, next) => {
    const number = new Number(req.body);

    const promise = number.save();

    promise.then((data)=>{
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });

});

module.exports = router;
