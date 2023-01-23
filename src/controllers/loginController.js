const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
    return;
};

exports.register = async (req, res) => {
    const login = new Login(req.body);
    await login.register();

    if(!login.body.email || !login.body.password) return; 

    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(() => {
            return res.redirect('/login');
        });
        return;
    }

    res.send('Em viado');
};