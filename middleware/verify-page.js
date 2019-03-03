const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'] || req.body.token || req.query.token || req.cookies.token;

    if (token) {
        jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
            if (err) {
                res.render('auth/login', {message: 'Lütfen Giriş yapınız'})
            } else {
                req.decode = decoded;
                next();
            }
        })
    } else {
        res.render('auth/login', {message: 'Lütfen Giriş yapınız'})
    }
};
