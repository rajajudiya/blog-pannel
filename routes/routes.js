const express = require("express");
const router = express.Router();
const con = require("../controllers/controller.js");
const regCon = require("../controllers/register.js");
const loginCon = require("../controllers/login.js");
const passport = require("../middlewares/passport_config.js");
const userAuth = require("../middlewares/auth.js");
const upload = require("../middlewares/multer_middlere.js");
const changePass = require('../controllers/change_pass.js');
const addTopic = require("../controllers/topic_con.js");
// const addSubTopic = require("../controllers/subTopic_Controller.js");
const blogCon = require("../controllers/blog_controller.js");
const myBlog = require("../controllers/myBlog_con.js");


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
router.get("/blog_view", userAuth, blogCon.blogShowCon);
router.post("/blogShow", upload.single("imgPath") ,blogCon.blogDataCon);

//myBlog
router.get("/myBlog", userAuth, myBlog.myBlogShowCon);

// myBlogEdit
router.get("/my_BlogEdit/:id", myBlog.myBlogEaditCon);
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

// add topice
router.get("/add_TopicForm", addTopic.addToPic);
router.post("/addTopiceCon", addTopic.addTopic_Con);

//delete topice
router.get("/deleteTopicCon/:id", addTopic.deleteTopic_Con);

router.post("/formComment",blogCon.addComentsContoller)


module.exports = router;
