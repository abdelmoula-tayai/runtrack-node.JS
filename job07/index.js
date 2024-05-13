const fs = require('fs');

async function readFile(){
    const data = await fs.promises.readFile(__dirname + '/data.txt', 'utf8');
    return data;
}

(async() => {
    console.log(await readFile())
})();