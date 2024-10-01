
const userDefaultCon = (req, res) => {
    
    if(req.isAuthenticated()) {    
        res.render("index",
        {
            userPath : req.user.userPath,
            userName : req.user.userName,
            email : req.user.email,
        });
    } else {
        res.redirect("loginForm");
    }
}

const userProfileCon = (req, res) => {

    if(req.isAuthenticated()) {    
        res.render("Profile",
        {
            userPath : req.user.userPath,
            userName : req.user.userName,
            email : req.user.email,
        });
    } else {
        res.redirect("loginForm");
    }
}

module.exports = { userDefaultCon, userProfileCon }