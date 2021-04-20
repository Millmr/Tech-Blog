const { Comment } = require('../models');

const commentData = [
    {
    "comment_text": "Wow Wonderful",
    "user_id": 1,
    "post_id": 1
    },
    {
    "comment_text": "Yup, yup thats a yup",
    "user_id": 2,
    "post_id": 2
    },
    {
    "comment_text": "nooooooooooooo",
    "user_id": 3,
    "post_id": 3
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
