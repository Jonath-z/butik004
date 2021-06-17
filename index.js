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
const { reject, result, isArguments, conforms } = require('lodash');
const { stringify } = require('querystring');
const { MongoClient } = require('mongodb');
const { MulterError } = require('multer');
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const Events = new eventEmitter();
const favicon = require('serve-favicon');
const fetch = require('node-fetch');
const { json } = require('body-parser');
const { request } = require('express');
const { body, validationResult } = require('express-validator');
const Nexmo = require('nexmo');
const nodemailer = require('nodemailer');
const googleAuth = require('google-auth-library');
const { Console } = require('console');
const momo = require("mtn-momo");


// nexmo init 
const nexmo = new Nexmo({
    apiKey: `${process.env.NEXMO_API_KEY}`,
    apiSecret: `${process.env.NEXMO_API_SECRET}`
}, { debug: true });

// express init 
const app = express();

// middleware
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/statics', express.static(path.join(__dirname, './js_file')));
app.use('/publics', express.static(path.join(__dirname, './image')));
app.use(express.json());
app.use('/public', express.static(path.join('./uploads')));
app.use('/customers', express.static(path.join('./uploads2')));
app.use('/static', express.static(path.join('./css_Style')));

const uri = `mongodb+srv://joz:${process.env.DB_PASS}@butik.qrb2j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

const storage2 = multer.diskStorage({
    destination: './uploads2/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload2 = multer({
    storage: storage2
}).single('Image');

// get request upload butik page
app.get('/uploads/butik', (req, res) => {
    res.redirect('/admin/butik');
});

app.get('/admin/butik', (req, res) => {
    db.collection('commandUser').find({}).toArray((err, data) => {
        res.render("butik", {
            command: data,
            number: data.length,
        });
    });
});
// post Admin ckekin
app.post('/butik/admin/login', (req, res) => {
    const admin = {
        name: "butik004",
        password: "butik0042021"
    }
    // console.log(req.body);
    const pass = req.body.password;
    const name = req.body.name;
    if (pass !== admin.password || name !== admin.name) {
        res.render('login', {
            text: 'login incorrect'
        });
    }
    else {
        res.redirect('/admin/butik')
    }
});

// get main page
app.get('/', (req, res) => {
    db.collection("details").find().toArray((err, data) => {
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
    db.collection("details").find({ "model": /^Air force 1/ }).toArray((err, data) => {
        res.render("airforce", {
            shoes: data
        });
    });

});

// get jordan1 page
app.get('/butik/jordan1', (req, res) => {
    db.collection("details").find({ "model": /^Jordan 1/ }).toArray((err, data) => {
        res.render("jordan1", {
            shoes: data
        });
    });
});

// get jordan4 page
app.get('/butik/jordan4', (req, res) => {
    db.collection("details").find({ "model": /^Jordan 4/ }).toArray((err, data) => {
        res.render("jordan4", {
            shoes: data
        });
    });
});

// get jordan6 page
app.get('/butik/jordan6', (req, res) => {
    db.collection("details").find({ "model": /^Jordan 6/ }).toArray((err, data) => {
        res.render("jordan6", {
            shoes: data
        });
    });
});

// get timberland page
app.get('/butik/timberland', (req, res) => {
    db.collection("details").find({ "model": /^Timberland/ }).toArray((err, data) => {
        res.render("timberland", {
            shoes: data
        });
    });
});

// get about us page
app.get('/butik/about', (req, res) => {
    res.render("about")      
});


//get command 
app.get("/butik/command", (req, res) => {
        res.render("command")
});

// post request for client command
const commande = app.post('/command',
    body('email').isEmail().normalizeEmail(),
    body('Phone').isLength({ min: 10 }).isNumeric(),
    body('name').isLength({ min: 2 }),
    body('postName').isLength({ min: 2 }),
    body('ClientContry').notEmpty(),
    upload, (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send("command unsent because of error in command formular");
        }

        // message sendind system
        const number = req.body.Phone;
        const text = `Dear ${req.body.name} ${req.body.postName}: command is sent`;
        nexmo.message.sendSms(
            "Vonage APIs", number, text, { type: 'unicode' },
            (err, responseData) => {
                if (err) {
                    console.log("err");
                }
                else {
                    // console.dir(responseData);
                }
            }
        );
        // mail sending system
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'Gmail',
            auth: {
                user: `${process.env.EMAIL_USER}`,
                pass: `${process.env.EMAIL_PASS}`
            },
            tls: {
                rejectUnauthorized: false
            }
        });
            
        // send mail with defined transport object
        let info = transporter.sendMail({
            from: `"Butik" <${process.env.EMAIL_USER}>`, // sender address
            to: `"${req.body.email}"`, // list of receivers
            subject: "Command's confirmation", // Subject line
            html: `"<p>Dear ${req.body.name} ${req.body.postName};<br>
            from ${req.body.ClientContry};<br>
            your command is received.
            Please send money to +243977473567 if your are in DRC,<br>
            to +250781980810 if your are in Rwanda <b>to confirm your command</b>,specifying the name and postname entered to command's form.<br>
             <b>Thanks for trusting us, BUTIK 004</b></p>"`, // html body
        });
            
        // console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        let today = new Date();
        const user = {
            Name: req.body.name,
            PostName: req.body.postName,
            Phone: req.body.Phone,
            Contry: req.body.ClientContry,
            Email: req.body.email,
            Command: req.body.file,
            Date: today
        }
        const link = db.collection('commandUser').insertOne(user);
        // console.log(today);
        // console.log(user);
        res.redirect('/');
    });
    
  // post request from client
app.post("/butik/command/render", (req, res) => {
    const request = `${req.body.data.imglink}`;
    if (request.indexOf("/public/") >= 0) {
        const index = request.replace("/public/", "")
        db.collection("details").find({ "image": index }).toArray((err, data) => {
            res.send(data);
            res.end();
        });
    }
});

// get customer page 
app.get("/special/command", (req, res) => {
    res.render("SpecialCommand");
});

// post customer Command
app.post("/customers/command", upload2, (req, res) => {
    fs.readdir('./uploads2', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let today = new Date();
            const img = data[data.length - 1];
            const obje = {
                image: img,
                Name: req.body.name,
                PostName: req.body.postName,
                Phone: req.body.Phone,
                Contry: req.body.ClientContry,
                Email: req.body.email,
                Comment: req.body.customersDetails,
                Date: today
            };
            console.log(obje);
            db.collection('customersCommand').insertOne(obje);
            // send Email on butik

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                service: 'Gmail',
                auth: {
                    user: `${process.env.EMAIL_USER}`,
                    pass: `${process.env.EMAIL_PASS}`
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            
            // send mail with defined transport object
            let info = transporter.sendMail({
                from: `"Butik Web" <${process.env.EMAIL_USER}>`, // sender address
                to: `${process.env.ADMIN_MAIL}`, // list of receivers
                subject: "Special Command", // Subject line
                // text:
                html: `"<h1>command from <span>BUTIK 004</span></h1><br>
                        <p>Name: ${obje.Name} ${obje.PostName}<br>
                        Phone: ${obje.Phone}<br>
                        Contry: ${obje.Contry}<br>
                        Email: ${obje.Email}<br>
                        Command details: ${obje.Comment}</p>
                        <p><b>${obje.Date}</b></p>"`, // html body
                attachments: [{
                    filename: `${obje.image}`,
                    path: `http://localhost:6578/customers/${obje.image}`
                }]
            });
            
        // send email spacial command to user
        let transporters = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'Gmail',
            auth: {
                user: `${process.env.EMAIL_USER}`,
                pass: `${process.env.EMAIL_PASS}`
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        // send mail with defined transport object
        let information = transporters.sendMail({
            from: `"Butik Web" <${process.env.EMAIL_USER}>`, // sender address
            to: `${obje.Email}`, // list of receivers
            subject: "Special Command", // Subject line
            // text:
            html: `"<h1>command from <span>BUTIK 004</span></h1><br>
                    <p>Name: ${obje.Name} ${obje.PostName}<br>
                    Phone: ${obje.Phone}<br>
                    Contry: ${obje.Contry}<br>
                    Email: ${obje.Email}<br>
                    Command details: ${obje.Comment}</p>
                    <p><b>${obje.Date}</b></p>"`, // html body
            attachments: [{
                filename: `${obje.image}`,
                path:  `http://localhost:6578/customers/${obje.image}`
            }]
        });
            
            // console.log("Message sent: %s", info.messageId);
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        }
    });
    

    res.redirect("/");
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

const port = process.env.PORT || 6578;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
