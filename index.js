const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');


// const product = require('./butik_html/js_file/product');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    fs.readdir('./butik_html/airForce_1',(err, data)=> {
        if (err)
        console.log(err);
        else {
                let i = 0;
                for (i; i < data.length-1; i++) {
                  const  dt = '<div class="shoes"><img src="' + data[i] + '"' + ' alt="airforce1"></div>';
                    res.render('products', {
                        imgData: dt,
                    });
                    // console.log(dt);
                }
                console.log(data);
               
    
        } 
    });
    
});

app.listen(3000);