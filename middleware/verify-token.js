const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: "failed to authenticate."
                });
            } else {
                req.decode = decoded;
                next();
            }
        })
    } else {
        res.json({
            status: false,
            message: "Token not fount!"
        })
    }
};
