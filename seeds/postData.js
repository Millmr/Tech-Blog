const { Post } = require('../models');

const postData = [
    {
        "title": "Why MVC is so important",
        "content": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controlller layer for application logic.",
        "user_id": 1
    },
    {
        "title": "Authentication vs. Authorization",
        "content": "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
        "user_id": 2
    },
    {
        "title": "Object-Relational Mapping",
        "content": "Object-Relational Mapping, better known as ORM, allows you to model your data using sequelize and helps simplify the way you build your relational database and execute queries.",
        "user_id": 3
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
