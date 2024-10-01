const userAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/loginForm");
    }
}

module.exports = userAuth; 