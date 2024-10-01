const blog_model = require("../models/bolg_model");
const fs = require("fs");

const myBlogShowCon = async  (req, res) => {

    console.log(req.body);

    let myBlogData = await blog_model.find({});

    console.log("blogData", myBlogData);
    res.render('myBlog', { myBlogData });
}

const myBlogDataCon = async (req, res) => {
    
    const myAddBlogData = new blog_model({
        imgPath : req.file.path,
        title : req.body.title,
        userName : req.body.userName,
        date : req.body.date,
        description : req.body.description
    })

    console.log("blogData", myAddBlogData);

    try {
        const newBlog = await myAddBlogData.save();
        console.log("newBlog", newBlog);
        res.redirect('/myBlog');
    } catch (error) {
        console.log(error, "not finde page");
    }
}

const myBlogEaditCon = async (req, res) => {

    const { id } = req.params;

    const singleRecEdit = await blog_model.findOne({ _id : id });

    console.log(singleRecEdit, "singleRecEdit");

    await res.render("blog_editPage", { singleRecEdit })
    
}

const myBlogUpdateCon = async (req, res) => {

    const { id } = req.params;
    
    const updateData = await blog_model.findById({ _id : id });

    console.log(updateData, "updateData");

    if(req.file){
        fs.unlinkSync(updateData.imgPath);
        updateData.imgPath = req.file.path;
    }

    updateData.title = req.body.title;
    updateData.userName = req.body.userName;
    updateData.date = req.body.date;
    updateData.description = req.body.description;

    // handel try cache 
    try {
        const newUpdateBlog = await blog_model.findByIdAndUpdate(id , updateData , {new : true})
        console.log(newUpdateBlog, "newUpdateBlog");
        res.redirect("/myBlog");
    } catch (error) {
        console.log(error, "not finde page");
    }

}

const myBlogDeleteCon = async (req, res) => {

    const { id } = req.params;

    const deleteData = await blog_model.findOne({ _id : id });

    if(deleteData.imgPath){
        fs.unlinkSync(deleteData.imgPath);
    }

    deleteData.remove();

    res.redirect("/myBlog");
    
}

module.exports = { myBlogShowCon, myBlogDataCon, myBlogEaditCon, myBlogUpdateCon, myBlogDeleteCon };