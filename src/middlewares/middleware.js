exports.middlewareGlobal = (req, res, next) => {
    res.locals.errorMessages = req.flash('errors');
    res.locals.successMessage = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}