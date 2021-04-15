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






        // // set storage 
        // const storage = multer.diskStorage({
        //     destination: './uploads_Airforce1/',
        //     filename: function (req, file, cb) {
        //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //     }
        // });

        // //  init upload
        // const upload = multer({
        //     storage: storage,
        //     limits: { filesize: 3000000 },
        //     fileFilter: function (req, file, cb) {
        //         checkFileType(file, cb);
        //     }
        // }).single('imageFile');

        // // check file type

        // function checkFileType(file, cb) {
        //     const filetype = /jpeg|jpg|png/;
        //     const extname = filetype.test(path.extname(file.originalname).toLowerCase());
        //     const mimetype = filetype.test(file.mimetype);

        //     if (mimetype && extname) {
        //         return cb(null, true);
        //     } else {
        //         cb('please images only');
        //     }
        // }
    
        // app.post('/upload', (req, res) => {
        //     upload(req, res, (err) => {
        //         if (err) {
        //             console.log(err);
        //             res.render('butik', {
        //                 msg: (err)
        //             });
        //         }
        //         else {
        //             console.log(req.body);
        //             console.log(req.file);
        //             fs.readdir('./uploads_Airforce1', (err, data) => {
        //                 if (err) {
        //                     console.log(err);
        //                 }
        //                 else {
        //                     console.log(data);
        //                     res.render('index', {
        //                         imgData: data,
        //                         type: req.body.model
        //                     });
        //                 }
        //             });
        //         }
        //     });
            
        // });
app.get('/butik/seller/upload', (req, res) => {
    res.render('butik');
});


    switch (req.body.model) {

        case AirJ:
            // set storage 
            const storage = multer.diskStorage({
                destination: './uploads_Jordan1/',
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
            
            app.post('/upload', (req, res) => {
                upload(req, res, (err) => {
                    if (err) {
                        console.log(err);
                        res.render('butik', {
                            msg: (err)
                        });
                    }
                    else {
                        console.log(req.body);
                        console.log(req.file);
                        fs.readdir('./uploads_Jordan1', (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(data);
                                console.log(req.body.model);
                                res.render('jordan1', {
                                    imgData: data,
                                    type: req.body.model
                                });
                            }
                        });
                    }
                });
            });
            break;
        default:
            res.render('butik');
            res.send('error');
    }


app.listen(3000);
