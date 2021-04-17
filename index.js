const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');



app.use('/statics', express.static(path.join(__dirname, '/js_file')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join('./uploads_Jordan1')));
app.use('/public', express.static(path.join('./uploads_Airforce1')));

const AirF = 'Air force 1';
const AirJ = 'Jordan 1';
   
        
        // set storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        switch (req.body.model) {
            case AirF:
                cb(null,'./uploads_Airforce1/');
                break;
            case AirJ:
                cb(null,'./uploads_Jordan1/');
                break;
        }
        console.log(req);
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
}).single('imageFile');

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


    
app.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.render('butik', {
                msg: (err)
            });
        }
        else {
            switch (req.body.model) {
                case AirJ:
           
                    fs.readdir('./uploads_Jordan1', (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.render('index', {
                                imgData: data,
                                size: req.range(),
                                price: req.number,
                                model: req.text,
                                Req: req.file
                            });
    
                        }
                    });
                    break;
                    case AirF:
           
                        fs.readdir('./uploads_Airforce1', (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.render('index', {
                                    imgData: data,
                                    size: req.range(),
                                    price: req.number,
                                    model: req.text,
                                    Req: req.file
                                });
        
                            }
                        });
                        break;
                default:
                    res.render('butik');
                   
            }
        }
    });
});
app.listen(3000);
