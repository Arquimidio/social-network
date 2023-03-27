const table = require('../Database/Knex.config');
const jwt = require('jsonwebtoken');

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                res.locals.user = await table('users')
                    .select('*')
                    .where({ id: decodedToken.id })
                    .first()

                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    checkUser,
}