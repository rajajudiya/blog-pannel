const blog_model = require("../models/blog_model.js");
const fs = require("fs");

const myBlogShowCon = async  (req, res) => {

    console.log(req.body);

    let myBlogData = await blog_model.find({ userName: req.user.userName });

    console.log("blogData", myBlogData);
    res.render('myBlog', 
        { 
            userPath : req.user.userPath,
            userName : req.user.userName,
            email : req.user.email,
            role : req.user.role,
            myBlogData : myBlogData 
        });
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
        const newBlog = new blog_model(myAddBlogData)
        await newBlog.save();
        console.log("newBlog", newBlog);
        res.redirect('/myBlog');
    } catch (error) {
        console.log(error, "error");
    }
}

const myBlogEaditCon = async (req, res) => {

    const { id } = req.params;

    const myBlogSingleRecEdit = await blog_model.findOne({ _id : id });

    console.log(myBlogSingleRecEdit, "myBlogSingleRecEdit");

    await res.render("blog_editPage", { myBlogSingleRecEdit })
    
}

const myBlogUpdateCon = async (req, res) => {

    const { id } = req.params;

    const myBlogUpdate = await blog_model.findById({ _id : id });

    console.log(myBlogUpdate, "myBlogUpdate");

        if(req.path) {
            fs.unlinkSync(myBlogUpdate.imgPath, (err) => {
                if (err) {
                    console.log(err, "File deleted!");
                }
            });
            //new img upload
            myBlogUpdate.imgPath = req.file.path 
        }

    myBlogUpdate.title = req.body.title
    myBlogUpdate.userName = req.body.userName
    myBlogUpdate.date = req.body.date
    myBlogUpdate.description = req.body.description

   try {
        const updateData = await blog_model.findByIdAndUpdate({ _id : id }, myBlogUpdate, {new : true});
        console.log(updateData, "updateData");
        res.redirect("/myBlog");
   } catch (error) {
     console.log(error, "error");
   }

}

const myBlogDeleteCon = async (req, res) => {

    const { id } = req.params;

    console.log(id, "id");
    // fs modele

    const myBlogDelete = await blog_model.findById({ _id : id });

    console.log("myBlogDelete",myBlogDelete);

    fs.unlinkSync(myBlogDelete.imgPath, (err) => {
        if (err) {
            console.log(err, "File deleted!");
        }
    });



    const deleteData = await blog_model.findByIdAndDelete({ _id : id });
    
    console.log(deleteData, "deleteData");
    
  
    res.redirect("/myBlog");
}


module.exports = { myBlogShowCon, myBlogDataCon, myBlogEaditCon, myBlogUpdateCon, myBlogDeleteCon };