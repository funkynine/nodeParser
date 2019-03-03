var express = require('express');
var router = express.Router();
var request = require("request"),
    cheerio = require("cheerio"),
    url = 'https://fierce-chamber-94656.herokuapp.com';

/* GET home page. */
router.get('/', function(req, res, next) {

  

  request(url, (err, res, html) => {

    output = '';
    
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);
      const siteHead = $(".sectionText");
      output = siteHead.find("h2").text();

      return output;
    } else {
        console.log(err);
    }
  });
  
  console.log(output);

  res.render('index', { title: output });
});

module.exports = router;
