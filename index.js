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
const Events = new eventEmitter();
const app = express();

app.set('view engine', 'ejs');

app.use('/statics', express.static(path.join(__dirname, '/js_file')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join('./uploads_Jordan1')));
app.use('/public', express.static(path.join('./uploads_Airforce1')));

const uri = "mongodb+srv://jo_z:2511@cluster0.h1rni.mongodb.net/admin?retryWrites=true&w=majority";

// setup storage engine
const storage = new GridFsStorage({
    url: uri,
    file: function (req, file) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                else {
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        buketname: 'uploads'
                    }
                    resolve(fileInfo);
                }
            });
        });
    }
});

const upload = multer({ storage }).single('Image');

const connect = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   });
let gfs;
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});

const AirF = 'Air force 1';
const AirJ = 'Jordan 1';

app.get('/uploads/butik', (req, res) => {
    res.render('butik');
    console.log(req.body);
});

app.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index');
        }
    });
});

 

app.listen(3000);
