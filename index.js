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
const assert = require('assert');
const eventEmitter = require('events');
const { url } = require('inspector');
const { config, nextTick } = require('process');
const { resolve } = require('path');
const { reject, result, isArguments } = require('lodash');
const { stringify } = require('querystring');
const { MongoClient } = require('mongodb');
const { MulterError } = require('multer');
const Sequelize = require('sequelize');
const { where } = require('sequelize');
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const Op = Sequelize.Op;
const Events = new eventEmitter();
const app = express();


// middleware
app.set('view engine', 'ejs');
app.use('/statics', express.static(path.join(__dirname, './js_file')));
app.use('/publics', express.static(path.join(__dirname, './image')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join('./uploads')));
app.use('/static', express.static(path.join('./css_Style')));

const uri = "mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/butik?retryWrites=true&w=majority";

// database connection
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
}).single('Image');


// get request
app.get('/uploads/butik', (req, res) => {
    res.render('butik');
});

app.get('/', (req, res) => {
    db.collection("details").find({}).toArray((err, data) => {
        if (err) {
            console.log("connection problem")
        }
        else {
            res.render('index', {
                img: data
            });
        }
    });

});
// get airforce page 
app.get('/butik/airforce', (req, res) => {
    db.collection("details").find({ "model": "Air force 1" }).toArray((err, data) => {
        res.render("airforce", {
            shoes: data
        });
    })

});

// get jordan1 page
app.get('/butik/jordan1', (req, res) => {
    db.collection("details").find({ "model": "Jordan 1" }).toArray((err, data) => {
        res.render("jordan1", {
            shoes: data
        });
    });
});

// get jordan4 page
app.get('/butik/jordan4', (req, res) => {
    db.collection("details").find({ "model": "Jordan 4" }).toArray((err, data) => {
        res.render("jordan4", {
            shoes: data
        });
    });
});

// get jordan6 page
app.get('/butik/jordan6', (req, res) => {
    db.collection("details").find({ "model": "Jordan 6" }).toArray((err, data) => {
        res.render("jordan6", {
            shoes: data
        });
    });
});

// get timberland page
app.get('/butik/timberland', (req, res) => {
    db.collection("details").find({ "model": "Timberland" }).toArray((err, data) => {
        res.render("timberland", {
            shoes: data
        });
    });
});

// get about us page
app.get('/butik/about', (req, res) => {
        res.render("about")      
});
// get command page
app.get("/butik/command", (req, res) => {
    res.render("command");
});




// post request butik
app.post('/uploads/butik', upload, (req, res) => {

    fs.readdir('./uploads', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const img = data[data.length - 1];
            obje = {
                image: img,
                model: req.body.model,
                size: req.body.size,
                price: req.body.price,
            };
            db.collection('details').insertOne(obje);
        }
    });
    res.redirect('/uploads/butik');

});

// post request for client command
app.post('/command', (req, res) => {
    res.redirect('/command');
});






app.listen(3000);
