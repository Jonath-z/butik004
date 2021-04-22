const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const eventEmitter = require('events');
const Events = new eventEmitter();
const app = express();

app.set('view engine', 'ejs');

app.use('/statics', express.static(path.join(__dirname, '/js_file')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join('./uploads_Jordan1')));
app.use('/public', express.static(path.join('./uploads_Airforce1')));
   

// set database
const database2 = new Datastore('descript.db');
database2.loadDatabase();

const AirF = 'Air force 1';
const AirJ = 'Jordan 1';

        // set storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads_Airforce1/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
                //  init upload
const upload = multer({
    storage: storage,
    limits: { filesize: 3000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('Image');

    // check file type

function checkFileType(file, cb) {
    const filetype = /jpeg|jpg|png/;
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetype.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('please images only');
    }

}

app.get('/butik/seller/upload',function (req, res){
    res.render('butik');
    
});



app.post('/uploads', (req, res) => {

    database2.insert({
        size: req.body.size,
        model: req.body.model,
        price: req.body.price
    });

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.render('butik', {
                msg: (err)
            });
        }
        else {

            if (err)
                console.log(err);
            else{
                fs.readdir('./uploads_Airforce1', (err, data) => {
                    
                    if (err) {
                        console.log(err);
                    }
                    else {
                        for (let i = 0; i < data.length;i++) {
                            database2.insert({
                                imgLink: i
                            });
                        }
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.render('index', {
                                imgData: data,
                            });
                        }
                    }
                });
            }
        }
    });
});

 

app.listen(3000);
