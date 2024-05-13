const http = require('http');

const requestHandler = (request, response) => {
    response.end('Hello World');
};

const server = http.createServer(requestHandler);

server.listen(8888, (err) => {
    if (err) {
        return console.error('Erreur : ', err);
    }
});
    console.log('Server is listening on 8888');