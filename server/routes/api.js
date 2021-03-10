const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { type } = require("os");

const router = express.Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../pdfs'),
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('pdf')

router.get('/', (req, res) => {
    res.send("Bienvenido a la plataforma ValGo");
});

router.post('/pdfs/post', fileUpload, (req, res) => {

    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('Server Error')
        
        const Tipo = req.file.mimetype
        const Nombre = req.file.originalname
        const data = fs.readFileSync(path.join(__dirname, '../pdfs/' + req.file.filename))

        conn.query('INSERT INTO archivos set ?', [{Tipo, Nombre, data}], (err, rows) => {
            if(err) return res.status(500).send('Server Error')

            res.send('PDF recibido')
        })
    })
    //console.log(req.file)
    
})

module.exports = router;