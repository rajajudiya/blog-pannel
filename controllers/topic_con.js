const topic_model = require("../models/topic_model.js");


const addToPic =  async (req, res) => {

    const add_Topics = await topic_model.find({});

    console.log("add_Topics", add_Topics);
    
    
    res.render("topic", { add_Topics });
}

const addTopic_Con = async (req, res) => {

    const topic = new topic_model({
        topicName : req.body.topicName
    })

    try{
        const newTopic = await topic.save();
        console.log("newTopic", newTopic);
        res.redirect("/add_TopicForm");
    }catch(error){
        console.log(error);
    }
}


const deleteTopic_Con = async (req, res) => {

    const { id } = req.params;

    try{
        const deleteTopic = await topic_model.deleteOne({ _id : id });
        console.log("deleteTopic", deleteTopic);
        res.redirect("/add_TopicForm");
    }catch(error){
        console.log("deleteTopic error found", error);
    }
}

module.exports = { addToPic, addTopic_Con, deleteTopic_Con }