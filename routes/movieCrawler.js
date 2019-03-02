const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', (req, res, next) => {

    rp('http://osmanaras.com')
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);

            res.send($('.right_side p a').text());
        })
        .catch((err) => {
            res.send(err)
        });

});


module.exports = router;
