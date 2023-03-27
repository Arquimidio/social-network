const PostModel = require('../Models/Post');
const table = require('../Database/Knex.config');
const formatDistanceToNowStrict = require('date-fns/formatDistanceToNowStrict')

const posts_get = async (req, res) => {
    if(res.locals.user) {
        const allPosts = await table
            .select(['posts.content', 'posts.created', 'posts.id_user', 'posts.id', 'users.name'])
            .from('posts')
            .leftJoin('users', 'posts.id_user', 'users.id')

        const postsWithRightDateFormat = allPosts.map(post => ({
            ...post,
            created: formatDistanceToNowStrict(post.created)
        }))

        res.render('feed', { posts: postsWithRightDateFormat});
    } else {
        res.redirect('/');
    }
}

const posts_post = async (req, res) => {
    const postData = req.body;
    const post = new PostModel(postData.id_user, postData.content);
    await table('posts').insert(post);
    res.redirect('/feed');
}

const posts_delete = async (req, res) => {
    const { id } = req.params;
    await table('posts')
        .where('id', id)
        .del()
    res.end();
}

module.exports = {
    posts_get,
    posts_post,
    posts_delete
}