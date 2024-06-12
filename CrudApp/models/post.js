const mongoose = require("mongoose");



const postSchema = mongoose.Schema({
    name:String,
    image:String,
    age:Number
})

const PostData =  mongoose.model("post", postSchema)
module.exports = PostData;