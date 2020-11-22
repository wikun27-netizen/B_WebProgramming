const fs = require('fs');
const http = require('http');

const port = 3000;

const routes = {
    '/'     : 'index.html',
    '/about': 'views/about.html'
}

const app = http.createServer(function (request, response) {
    const url = request.url;
    console.log(`Incoming request to ${url}`);

    if (routes[url]) { // cek apakah url ada di dalam routes
        response.writeHead(200, {'Content-Type': 'text/html'});

        //baca isi html dari file
        fs.readFile(routes[url], (err, data) => {
            response.end(data);
        })

    } else {
            response.writeHead(404, {'Content-Type': 'text/plain'})
            response.end('Page not found.');
        }


    /*
    if (routes[url]) {
        response.writeHead(200, {'Content-Type': 'text/html'});
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page not found.');
    }*/
    /*
    response.writeHead(200, {'Content-Type': 'text/html'});

    response.write('<h1>Hello, Universe!</h1>');

    response.write('<p>This is a node server</p>');

    response.end();
    */
    //response.end('This is an HTTP example.');
});
app.listen(port);

console.log(`The server has been started on post ${port}`);