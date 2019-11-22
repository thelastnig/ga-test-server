var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

router.get('/', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.yna.co.kr/sports/all");
    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.headline-list ul").children("li.section02");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('strong.news-tl a').text(),
          url: $(this).find('strong.news-tl a').attr('href'),
          image_url: $(this).find('p.poto a img').attr('src'),
          image_alt: $(this).find('p.poto a img').attr('alt'),
          summary: $(this).find('p.lead').text().slice(0, -11),
          date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );

});

module.exports = router;

