const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const commentData = await Comment.findaAll({})
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', async (req, res) => {
    const commentData = await Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', async (req, res) => {
    try {
        const userData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
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

router.put('/:id', withAuth, async (req, res) => {
    try{
        const userData = await Comment.update({
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
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
        const projectData = await Comment.destroy({
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
