const fs = require('fs');

async function readFile(){
    const data = await fs.promises.readFile(__dirname + '/data.txt', 'utf8');
    let result = "";
    for(let i = 0; i < data.length; i += 2){
        result += data[i
        ]
    }
    return result;
}

(async() => {
    console.log(await readFile())
})();