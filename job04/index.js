const fs = require('fs');

console.log(fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(files);
}));