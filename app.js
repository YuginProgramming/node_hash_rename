const express = require('express');
const multer = require('multer');
const server = express();

const crypto = require('crypto');
const fs = require('fs');

server.use(express.static(__dirname));
server.set('view engine', 'ejs');
server.set('views', './views');
server.use(multer({dest:'uploads'}).single('filedata'));

server.get('/', (req, res) => {
    res.render('main');
})

server.post('/upload', function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);    
});

server.post('/upload1', function (req, res, next) {
   
    const fileBuffer = fs.readFileSync(req.file.path);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    
    const hex = hashSum.digest('hex');
    
    console.log('Nazva', hex);
    
    fs.rename(req.file.path, `./uploads/${hex}.jpg`, (err) => {
        if (err) throw err;
        console.log('renamed complete');
        
      });    
    });

server.listen(3000);