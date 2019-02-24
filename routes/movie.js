var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({
        title: 'Merhaba Havuz. İlk NodeJs Proje',

    });
});

router.post('/', (req, res, next) => {
    res.json(req.body);
});

module.exports = router;
