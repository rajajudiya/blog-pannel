const usermodel = require('../models/user_model');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const otpGenerator = require('otp-generator');
let myOTP = null;

const changePass = (req, res) =>{

    res.render('change_password');

}

const updatePass = (req, res) =>{
    const {password} = req.user;

    const {current_pass, new_pass, confirm_pass} = req.body;

    bcrypt.compare(current_pass, password, (err, result) =>{

        if(result){
            // console.log('password match');
            if(new_pass == confirm_pass){

                bcrypt.hash(new_pass,10,async (err,hashPass) =>{
                    console.log("Hash", hashPass);
                    if(err){
                        res.redirect('/changePassword')
                    }

                    const upadteP = await usermodel.updateOne({_id:req.user._id},{password:hashPass});

                    console.log("Update", upadteP);
                    if(upadteP){
                        res.redirect('/');
                    }
                
                })
            }
        }else{
            console.log('password not match');
            res.redirect('/changePassword');
        }
    })
}

const forgotPassword = (req, res) => {
    res.render('forgot_password');
}

const forgotPasswordData = async (req, res) => {

    const { email } = req.body;
    const userEmail = await usermodel.findOne({ email: email });

    if (userEmail) {

        const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        console.log("user OTP", otp);

        myOTP = otp;

        res.redirect(`/otp/${userEmail._id}`);

    } else {

        res.redirect('/login');
    }
}

const otp = (req, res) => {
    res.render('otp', { id: req.params.id });
}

const otpCheck = (req, res) => {

    const { id } = req.params;
    const { otp } = req.body;

    if (otp == myOTP) {
        res.redirect(`/newPass/${id}`);
    } else {
        res.redirect(`/login/${id}`);
    }

}

const newPass = (req, res) => {
    res.render('new_password', { id: req.params.id });
}

const newPassWord = (req, res) => {

    const { pwd, new_pwd } = req.body;

    if (pwd === new_pwd) {
        console.log("paasword Match");

        bcrypt.hash(pwd, saltRounds, async (err, hash) => {

            if (err) {
                console.log("err", err);
                res.redirect('/forgotPassword');
            }

            try {
                const newPass = await usermodel.updateOne({ _id: req.params.id }, { password: hash });
                console.log("newPass", newPass);

                res.redirect('/logInForm');

            } catch (error) {
                console.log("password not matchhh", error);
                res.redirect('/forgotPassword');
            }
        })

    } else {
        console.log("password not match");

        res.redirect('/forgotPassword');

    }

}

module.exports = {changePass,updatePass,forgotPassword, forgotPasswordData, otp, otpCheck, newPass, newPassWord }