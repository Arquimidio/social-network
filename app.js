require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/auth');
const postsRouter = require('./Routes/posts');
const authMiddleware = require('./Middleware/authMiddleware');

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('*', authMiddleware.checkUser);
app.use('/auth', authRouter);
app.use('/feed', postsRouter);
app.use('/', (req, res) => res.render('index'));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));