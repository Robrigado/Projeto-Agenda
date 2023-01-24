exports.middlewareGlobal = (req, res, next) => {
    res.locals.errorMessages = req.flash('errors');
    res.locals.successMessage = req.flash('success');
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