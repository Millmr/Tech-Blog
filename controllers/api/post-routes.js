const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
            model: Comment,
            attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
    .then(data => res.json(data.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    });

    router.get('/:id', async (req, res) => {
        try {
            const postData = await Post.findOne({
                where: {
                    id: req.params.id
                },
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at'
                ],
                include: [{
                    model: User,
                    attributes: ['username']
                },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
            });
            const posts = postData.get({ plain: true });
    
            res.status(200).json(posts)
            
        } catch (err) {
            res.status(500).json(err);
        }
    });

    router.post('/', withAuth, async (req, res) => {
        try {
            const userData = await Post.create({
                title: req.body.comment_text,
                content: req.body.post_id,
                user_id: req.session.user_id
            });
    
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
    
            res.status(200).json(userData);
            });
        } catch (err) {
            res.status(400).json(err);
        }
    });

    router.delete('/:id', withAuth, async (req, res) => {
        try {
            const projectData = await Post.destroy({
                where: {
                    id: req.params.id,
                    },
            });
    
        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
            }
    
            res.status(200).json(projectData);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    module.exports = router;