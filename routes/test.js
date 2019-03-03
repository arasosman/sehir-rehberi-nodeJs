const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {

    res.cookie('token', 'asc', {maxAge: 9000000000, httpOnly: true, secure: false });
    res.render('index', {title: 'Merhaba Havuz. İlk NodeJs Proje'});
});

router.get('/read', function (req, res, next) {


    res.send(req.cookies.token);
});




module.exports = router;
