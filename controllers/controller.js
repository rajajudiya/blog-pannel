const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

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