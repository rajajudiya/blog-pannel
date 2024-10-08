const express = require("express");
const router = express.Router();
const con = require("../controllers/controller.js");
const regCon = require("../controllers/register_controller.js");
const loginCon = require("../controllers/login_controller.js");
const passport = require("../middlewares/passport_config.js");
const blogCon = require("../controllers/blog_controller.js");
const myBlog = require("../controllers/myBlog_con.js");
const userAuth = require("../middlewares/auth.js");
const upload = require("../middlewares/multer_middlere.js");
const changePass = require('../controllers/change_pass.js');
const topic = require('../controllers/topic_con.js');

router.get("/topic",topic.topic)
//dashbord default path
router.get("/", userAuth, con.userDefaultCon);
router.get("/userProfile", userAuth, con.userProfileCon)

//register path
router.get("/registerForm", regCon.registerForm);
router.post("/register", upload.single("userPath"), regCon.registerCon);

//login path
router.get("/logInForm", loginCon.loginFormCon);
router.post("/login", passport.authenticate('local', { failureRedirect: '/loginForm' }), loginCon.loginCon);

//logout path
router.get("/logOut", loginCon.logOutCon);

//blogAd
router.get("/blog_Add",blogCon.blogShowCon);
router.post("/blogShow", upload.single("imgPath") ,blogCon.blogDataCon);

//myBlog
router.get("/myBlog", myBlog.myBlogShowCon);

// myBlogEdit
router.get("/my_blogEdit/:id", myBlog.myBlogEaditCon);
router.post("/my_BlogUpdate/:id", upload.single("imgPath"),myBlog.myBlogUpdateCon);

// myBlogDelete
router.get("/my_BlogDelete/:id", myBlog.myBlogDeleteCon);

router.get('/changePassword', changePass.changePass);
router.post('/updatePass', changePass.updatePass);

router.get('/forgotPassword', changePass.forgotPassword);
router.post('/forgotPasswordData', changePass.forgotPasswordData);

router.get('/otp/:id', changePass.otp);
router.post('/otpCheck/:id', changePass.otpCheck);

router.get('/newPass/:id', changePass.newPass);
router.post('/newPassWord/:id', changePass.newPassWord);

module.exports = router;
