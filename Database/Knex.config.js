const knex = require('knex')
module.exports = knex({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : 'SocialNetwork'
    }
});
  