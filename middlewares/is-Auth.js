module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log('Falta redirect en middleware is Auth')
        // return res.redirect('/users/login');
    }
    next();
}