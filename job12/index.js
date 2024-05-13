const http = require('http');
const fs = require('fs');
const path = require('path');
const { response } = require('express');

const server = http.createServer((request, response) => {
    const pathFile = path.join(__dirname, 'index.html');

    fs.readFile(pathFile, (err, data) => {
        if (err){
            response.writeHead(500);
            response.end('Error loading file');
            return;
        }

        response.writeHead(200, {
            'content-type': 'text/html'
        })
        response.end(data);
    })
})

const port = process.env.Port || 3000;

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})