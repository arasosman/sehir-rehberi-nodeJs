const express = require('express');
const router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/index', {title: 'Merhaba Havuz. İlk NodeJs Proje'});
});



module.exports = router;
