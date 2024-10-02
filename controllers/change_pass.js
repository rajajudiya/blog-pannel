const usermodel = require('../models/user_model');

const bcrypt = require('bcrypt');

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

module.exports = {changePass,updatePass}