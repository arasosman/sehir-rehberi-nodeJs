const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Movie = require('../models/Movie')

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Merhaba Havuz. İlk NodeJs Proje' });
});

router.post('/login', (req, res) => {
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


module.exports = router;
