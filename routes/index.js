const express = require('express');
const router = express.Router();
const request = require("request"),
    cheerio = require("cheerio"),
    url = 'https://fierce-chamber-94656.herokuapp.com';
const mongoose = require("mongoose");
const uri = 'mongodb+srv://test:test@dataBaseParser-jgwie.mongodb.net/test?retryWrites=true';

/* GET home page. */
router.get('/', function(req, res, next) {

  request(url, (err, res, html) => {
    output = '';

    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      const siteHead = $(".sectionText");
      output = siteHead.find("h2").text();

      // Connect to mongodb
      mongoose.connect(uri, { useNewUrlParser: true }).catch((err)=>{
        if(err){
          console.log("Error: " + err);
        }else{
          console.log("Connect Database");
        }
      });
      return output;

    } else {
        console.log(err);
    }
  });
  res.render('index', { data: output });
});

module.exports = router