const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Datastore = require('nedb');
const eventEmitter = require('events');
const { url } = require('inspector');
const { config } = require('process');
const { resolve } = require('path');
const { reject } = require('lodash');
const { stringify } = require('querystring');
const Events = new eventEmitter();
const app = express();


// middleware
app.set('view engine', 'ejs');
app.use('/statics', express.static(path.join(__dirname, '/js_file')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join('./uploads_Jordan1')));
app.use('/public', express.static(path.join('./uploads_Airforce1')));

const uri = "mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/butik?retryWrites=true&w=majority";
// database connection
mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// setup storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+file.originalname);
        console.log(file);
    }
});

const upload = multer({ storage }).single('Image');

// docs schema
const schema = new mongoose.Schema({
    model: String,
    size: Number,
    price: Number,
    image: {
        data: Buffer,
        contentType: String
    }
});

// creating model
const Detail = mongoose.model('Detail', schema);


// get request
app.get('/uploads/butik', (req, res) => {
    res.render('butik');
});
app.get('/butik', (req, res) => {
    res.render('index')
})

// post request
app.post('/uploads/butik', upload, (req, res) => {

    const obj = {
        model: req.body.model,
        size: req.body.size,
        price: req.body.size,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        }
    };
    console.log(obj);
    Detail.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.render('index');
        }
    })
    // console tst
    console.log(req.body);
});

app.listen(3000);
