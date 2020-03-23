var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
var word2vec = require('word2vec.js');

var text = "";
var urls = [];
var sampleText = "";
// /* GET : "/word2vec" */
// router.get('/', (req, res) => {
//   //var word = req.body.word;
//   var word = req.query.word;
//   w2v.loadModel( './vectors.txt', function(error, model) {
//     if (error !== null) {
//       console.error(error);
//       res.send({status: "fail"});
//       return;
//     }

//     let synonyms = model.mostSimilar(word, 20);
//     res.send({status: "success", synonyms: synonyms});
//   });
// });

// /* GET : "/word2vec/similarity" */
// router.get('/similarity', (req, res) => {
//   //var word = req.body.word;
//   var word1 = req.query.word1;
//   var word2 = req.query.word2;

//   w2v.loadModel( './vectors.txt', function(error, model) {
//   if (error !== null) {
//     console.error(error);
//     res.send({status: "fail"});
//     return;
//   }
//     let similarity = model.similarity(word1, word2);
//     res.send({status: "success", similarity: similarity});
//   });
// });

/* GET : "/word2vec/urls" */
router.get('/urls', (req, res) => {
  const getHtml = async () => {
    try {
      return await axios.get("https://www.cannabisnews.com/news/list/cannabis.shtml");
    } catch (error) {
      console.error(error);
    } 
  };

  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("body").children("a");

    $bodyList.each(function(i, elem) {
    ulList.push("https://www.cannabisnews.com" + $(this).attr('href'));
    urls.push("https://www.cannabisnews.com" + $(this).attr('href'));
  });
    return ulList;
  })
  .then(response => res.send({status: 'success', data: response}));
});

router.get('/extract', (req, res) => {
  urls.map((url, index) => {
    if (index > 1) return; 
    let fullUrl = "https://www.cannabisnews.com" + url;

    const getHtml = async () => {
    try {
      return await axios.get(fullUrl);
    } catch (error) {
      console.error(error);
    }};

    getHtml()
    .then(html => {
      let ulList = "";
      const $ = cheerio.load(html.data);
      const $bodyList = $("body").children("p");
      $bodyList.each(function(i, elem) {
        sampleText = sampleText + $(this).text();
        //ulList = ulList + $(this).text();
      });
    })
  });
  res.send({status: 'success'});
});

router.get('/makeModel', (req, res) => {
    word2vec.trainer({
    train: './text8',
    output: './newVector.txt',
    on: function (log) {
        process.stdout.write(log);
    },
    done: function () {
      console.log('finish');
    },
    error: function (err) {
      console.log(err);
    }
  });
});

module.exports = router;
