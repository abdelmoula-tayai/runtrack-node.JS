const http = require('http');
const fs = require('fs');
const path = require('path');
const { response } = require('express');

const server = http.createServer((request, response) => {
    let filePath = "." + request.url;
    if (filePath == "./") {
        filePath = "./index.html";
    }
    else if (filePath == "./about") {
        filePath = "./about.html";
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            fs.readFile('./error.html', function(error, content) {
                response.writeHead(404, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            });
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

const port = process.env.Port || 3000;

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})