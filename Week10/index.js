const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const layouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

//enable session

app.use(session({
    secret:'som3_s3cret_key5',
    cookie: {}
}));

//use layouts
app.use(layouts);
app.set('layout', 'layouts/main.ejs');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/todo', todoRouter);

app.listen(3000);
console.log('Server runs at port 3000...');