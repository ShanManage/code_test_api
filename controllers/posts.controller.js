const Post = require('../models/posts.model');
const { v4: uuidv4 } = require('uuid');

/* Create Post */
exports.createPost = async (req, res, next) => {
    try {
        console.log(req.files.file)
        const file = req.files.file;
        const fileName = uuidv4() + file.name;
        const filePath = `uploads/${fileName}`;

        file.mv(filePath, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        })

        let post = new Post({
            postTitle: req.body.title,
            description: req.body.description,
            imagePath: filePath,
            likes: 0,
            dislikes: 0,
        });
        await post.save((err) => {
            if (err) {
                return res.status(200).json({
                    error: true,
                    message: "Unknown Error",
                });
            }

            return res.status(200).json({
                error: false,
                message: "Post created",
            });
        });
    } catch (error) {
        console.log(error.message)
    }
}

// Get all posts
exports.getPosts = async (req, res, next) => {
    try {
        await Post.find().exec((err, posts) => {
            if (err) {
                return res.status(200).json({
                    error: true,
                    message: "Unknown error"
                });
            }
            return res.status(200).send({
                error: false,
                message: "All posts received",
                data: posts
            });
        });
    } catch (error) {
        console.log(error.message)
    }
}


// addLikeOrDislike
exports.addLikeOrDislike = async (req, res, next) => {
    try {
        await Post.findById(req.body.postId).exec((err, post) => {
            if (err) {
                return res.status(200).json({
                    error: true,
                    message: "Unknown error"
                });
            } else {
                let isLike = req.body.isLike;

                if (isLike === 1) {
                    post.likes = post.likes + 1;
                } else {
                    post.dislikes = post.dislikes + 1;
                }

                post.save((err) => {
                    if (err) {
                        return res.status(200).json({
                            error: true,
                            message: "Not updated"
                        });
                    } else {
                        return res.status(200).json({
                            error: false,
                            message: "Updated successfully."
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error.message)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        if (req.params.id !== null && req.params.id !== undefined) {
            await Post.findByIdAndRemove(req.params.id).exec((err) => {
                if (err) {
                    return res.status(200).json({
                        error: true,
                        message: "Unknown error"
                    });
                }

                return res.status(200).json({
                    error: false,
                    message: "Post removed"
                });
            })
        } else {
            return res.status(200).json({
                error: true,
                message: "Invalid parameters"
            });
        }
    } catch (error) {
        console.log(error.message)
    }
}