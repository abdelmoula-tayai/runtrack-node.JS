const fs = require('fs');

const modifyFile = () => {
    const content = "Je manipule les fichiers avec un module node !";
    fs.writeFile(__dirname + '/data.txt', content, (err) => {
        if (err) throw err;
        console.log('fichier modifie avec succes !')
    })
}

modifyFile();