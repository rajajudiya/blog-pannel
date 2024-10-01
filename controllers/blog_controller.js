const blog_model = require("../models/bolg_model");

const blogShowCon = async  (req, res) => {

    console.log(req.body);

    let blogData = await blog_model.find({});

    console.log("blogData", blogData);
    res.render('blog_Add', { blogData });
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
        res.redirect('/blog_Add');
    } catch (error) {
        console.log(error);
    }
}


module.exports = { blogShowCon, blogDataCon};