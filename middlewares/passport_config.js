const passport = require("passport");
const LocalStrategy = require("passport-local");
const admin_model = require("../models/user_model");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({ usernameField : "email", passwordfield : "password"},
  async (email, password, done) => {
    const user = await admin_model.findOne({email : email});
    if(user) {
      bcrypt.compare(password, user.password, async(err, result) => {
        if(err) {
          done(null, false);
        }
        if(result) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
    } else {
      done(null, false);
    }
  }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const userData = await admin_model.findById(id);
      console.log("userData", userData);
      
      done(null, userData);
      
    } catch (err) {

      done(err);
    }
  });
  
module.exports = passport;