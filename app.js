const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const posts_controller = require('./controllers/posts.controller');

const app = express();

app.use(express.static(__dirname + '/uploads')); 
// app.use(express.static(path.join(__dirname, '/uploads')));

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("DB connection error", err);
    })


app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
});


app.post("/createPost", posts_controller.createPost);

app.get("/getPosts", posts_controller.getPosts);

app.post("/addLikeOrDislike", posts_controller.addLikeOrDislike);

app.delete("/deletePost/:id", posts_controller.deletePost);