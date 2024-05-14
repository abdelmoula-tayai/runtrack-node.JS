const { hostname } = require('os');
const url = require('url');

const URL = 'https://www.google.com/search?q=node.js';

const parsedUrl = url.parse(URL);

const protocol = parsedUrl.protocol;

const host = parsedUrl.hostname;

const query = parsedUrl.query;

const newURL = url.format({
    protocol,
    hostname: "www.laplateforme.io",
    search: '/?lang=fr'
});

console.log(newURL);

