const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
    topicName : {
        type : String,
        required : true
    }
})

const topic_model = mongoose.model("topics", topicSchema);

module.exports = topic_model;