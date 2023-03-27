const express = require('express');
const router = express.Router();
const postsController = require('../Controllers/posts');

router.route('/')
    .get(postsController.posts_get)
    .post(postsController.posts_post)

router.route('/:id')
    .delete(postsController.posts_delete)

module.exports = router;
