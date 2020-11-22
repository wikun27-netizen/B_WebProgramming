const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

// GET http://localhost:3000/
app.get('/', (request, response) => {
    response.render('index', { title:'Hello World!', message:'Hello there!'});
    //response.send('Hello, world');
});

// GET http://localhost:3000/about
app.get('/about', (request, response) => {
    response.render('index', {title:'About Us', message:'We are something...'});
});

// GET http://localhost:3000/news/500
app.get('/news/:id', (request, response) => {
    const id_news = request.params.id;
    response.send(`Request data = ${news_id}`);
})

//GET http://localhost:3000/login => menampilkan form login
app.get('/login', (response, request) => {
    response.send('Ketikkan username dan password.');
})


//POST http://localhost:3000/login => melakukan login, cek username dan password yang diketik user
app.post('/login', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    response.send(`Request POST login: ${username} and ${password}`);
})


app.listen(3000);
console.log('Server runs at 3000');