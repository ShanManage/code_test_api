const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    postTitle: { type: String, required: false },
    description: { type: String, required: false },
    imagePath: { type: String, required: false },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
})

module.exports = mongoose.model('Posts', PostsSchema);