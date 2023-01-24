const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
    return;
};

exports.register = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();
    
        if(!login.body.email || !login.body.password) return res.redirect('/login'); 
    
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return;
        }
    
        res.send('Em viado');
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};