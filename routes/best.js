var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');



// 네이버 검색어
router.get('/naverKeyword', (req, res) => {
  
  const getHtml = async () => {
    try {
      //return await axios.get("https://www.yna.co.kr/sports/all");
      return await axios.get("https://datalab.naver.com/keyword/realtimeList.naver?where=main");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    // const $bodyList = $("div.headline-list ul").children("li.section02");
    const $bodyList = $("div.rank_inner[data-age='all'] ul").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          num: $(this).find('em.num').text(),
          title: $(this).find('span.title').text() 
          /*
          title: $(this).find('strong.news-tl a').text(),
          url: $(this).find('strong.news-tl a').attr('href'),
          image_url: $(this).find('p.poto a img').attr('src'),
          image_alt: $(this).find('p.poto a img').attr('alt'),
          summary: $(this).find('p.lead').text().slice(0, -11),
          date: $(this).find('span.p-time').text()
          */
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 구글 검색어
router.get('/googleKeyword', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://trends.google.co.kr/trends/trendingsearches/daily?geo=US");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.feed-list-wrapper").children("div.details-wrapper");

    $bodyList.each(function(i, elem) {
      console.log($(this).find("a"));
      ulList[i] = {
          title: $(this).find("a").text() 
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 82cook 최근 많이 읽은 글
router.get('/82cook', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.82cook.com");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.most").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 불펜 최고 조회
router.get('/bullpen', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("http://mlbpark.donga.com/mp/b.php?p=1&m=list&b=bullpen&query=&select=&user=");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.lists:nth-child(2)").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 일간베스트 
router.get('/ilbe', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.ilbe.com");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("a.widget-more[href='/list/ilbe']").next().children("li");
    

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 인스티즈 
router.get('/instiz', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.instiz.net");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("a[href='//www.instiz.net/bbs/list.php?id=pt&srt=3']").parent().parent().next().children("div.index_block_all").children("div.index_block_list");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(),
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 루리웹 
router.get('/ruliweb', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://bbs.ruliweb.com/best/humor/now");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    
    const strContents = Buffer.from(html);
    const convertedhtml = iconv.decode(strContents, 'utf-8').toString();

    const $ = cheerio.load(convertedhtml.data);
    const $bodyList = $("div.list.best_date.active").children("ul.col").children("li");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a').attr('title'),
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 뽐뿌 
router.get('/ppomppu', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.ppomppu.co.kr/");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.hot-post-list").children("ul:first-child").children("li");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a.title ').text(),
          link: $(this).find('a.title ').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


module.exports = router;

