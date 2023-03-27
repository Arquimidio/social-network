const table = require('../Database/Knex.config');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken');

const makeToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.TOKEN_MAX_AGE
        }
    )
}

const signup_get = async (req, res) => {
    res.render('signup');
}

const signup_post = async (req, res) => {
    const { body: userData } = req;
    try {
        const receivedUserData = new UserModel(
            userData.name, 
            userData.birthday, 
            userData.email, 
            userData.password
        );
        const registeredUser = await table('users').insert(receivedUserData);
        const allUsers = await table('users').select('*');
        console.log(allUsers);
        res.render('signup', { success: true, registeredUser, attempt: true });
    } catch(error) {
        console.log(error);
        res.render('signup', { success: false, attempt: true });
    }
}

const login_get = async (req, res) => {
    res.render('login');
}

const login_post = async (req, res) => {
    try { 
        const user = req.body;
        const checkedUser = await table('users').where(user).select('*').limit(1).first();
        if(checkedUser) {
            const token = makeToken(checkedUser.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.TOKEN_MAX_AGE * 1000 });
            res.redirect('/');
        } else {
            console.log('wrong credentials');
        }
        res.end();
    } catch(error) {
        console.log(error);
        res.end();
    }
}

const logout_get = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}