console.log("Hello World!");
const fs = require('fs');

const callback = function (err, data) {
    if (err) {
        console.log(err.stack);
    } else {
        console.log(data.toString());
    }
}

fs.readFile('hello.txt', callback) // asynchronous

const data = fs.readFileSync('hello.txt'); // synchronous
console.log(data.toString());