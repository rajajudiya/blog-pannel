const admin_model = require("../models/user_model.js")
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerForm = (req, res) => {
    res.render("register")
}

const registerCon = async (req, res) => {
    console.log(req.body);
    
    if(req.body.password === req.body.comPass) {
        bcrypt.hash(req.body.password, saltRounds, async (err, hashPass) => {

            const user = new admin_model({
                userName : req.body.userName,
                email : req.body.email,
                userPath : req.file.path,
                password : hashPass,
            })

            try {
                const newUser = await user.save()
                console.log("newUser", newUser);
                
            } catch (error) {
                res.redirect("/logInForm")
            }

        })
    } else {
        res.redirect("/registerForm")
    }

}
module.exports = { registerForm, registerCon }

