const path = require('path');

const filename = path.basename(__filename);
console.log(filename);

const fileExt = path.extname(__filename);
console.log(fileExt);

const fileDir = path.dirname(__filename);
console.log(fileDir);