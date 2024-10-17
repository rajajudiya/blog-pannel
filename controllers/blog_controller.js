const blog_model = require("../models/blog_model.js");
const comment = require("../models/comment.js");

const blogShowCon = async  (req, res) => {
    console.log(req.body);
    const commentAdd = await comment.find({}).populate("user");

    console.log("commentAdd", commentAdd);

    let blogData = await blog_model.find({});

    console.log("blogData", blogData);
    res.render('blog_view',
        { 
            userPath : req.user.userPath,
            userName : req.user.userName,
            email : req.user.email,
            role : req.user.role,
            blogData : blogData,
            commentAdd : commentAdd
        });
}

const blogDataCon = async (req, res) => {
    
    const addBlogData = new blog_model({
        imgPath : req.file.path,
        title : req.body.title,
        userName : req.body.userName,
        date : req.body.date,
        description : req.body.description
    })

    console.log("blogData", addBlogData);

    try {
        const newBlog = await addBlogData.save();
        console.log("newBlog", newBlog);
        res.redirect('/blog_view');
    } catch (error) {
        console.log(error);
    }
}


const addComentsContoller = async (req, res) => {
    try {
      // Ensure blogId is coming from the form submission
      const commentAdd = new comment({
        text: req.body.text,
        user: req.user._id,  // Assuming user is logged in
        blog: req.body.blogId // blogId is now included
      });
  
      const newComment = await commentAdd.save();
      console.log("newComment", newComment);
  
      // Redirect to the blog view after saving the comment
      res.redirect('/blog_view');
  
      // Fetch comments and populate blogId for further processing
      const getCommentsData = await comment.find({}).populate("blog");
      console.log("getCommentsData", getCommentsData);
  
    } catch (error) {
      console.log("Error saving comment:", error);
    }
  };
  

module.exports = { blogShowCon, blogDataCon, addComentsContoller};