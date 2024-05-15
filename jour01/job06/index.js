const fs = require('fs');

console.log(fs.readFileSync(__dirname + '/data.txt', 'utf8'))