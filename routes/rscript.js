var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var exec = child_process.exec;
var R = require("r-script");
var admin = require('firebase-admin');
var serviceAccount = require("C:/Users/pjw/ga/ga-test-server/firebaseAdmin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ga-sign-test.firebaseio.com'
});
 
/* GET : "/rscript" */
router.get('/', (req, res) => {

    var words = [];
    var articles = [];
    var db = admin.database();
    var ref = db.ref("/");
    var wordsRef = ref.child('words');
    var articleRef = ref.child("articles");
    wordsRef.once('value', function(snapshots) {
        
        snapshots.forEach(function(snapshot) {
            var word = snapshot.val();
            var array = Object.keys(word);
            var each = array[0];
            words.push(each);
        });

        articleRef.once('value', function(snapshots) {
            snapshots.forEach(function(snapshot) {
                var article = snapshot.val();
                articles.push(article);
            });
            res.send({status: "success", words: words, articles: articles});
        })
    })
} );
 
/* POST : "/rscript" */
router.post('/', (req, res) => {

    // 게시글을 DB에 저장
    var text = req.body.article;

    var db = admin.database();
    var ref = db.ref("/");

    var today = new Date();

    var articleRef = ref.child("articles");
    articleRef.push({
        content: text,
        date: today.toString()
    }, function(error) {
        if (error) {
            console.error(error);
            res.send({success_article: false});
            return;
        } else {
            // 저장 후 게시글에서 명사만 추출하여 자동 완성 DB에 저장
            var cmd = 'Rscript ./public/rscripts/extract_noun.R ' + text;
        
            exec(cmd, (error, stdout, stderr) => {
                if(error) {
                    console.error(error);
                    res.send({success_r: false});
                    return;
                }
                var words = stdout.split(' ');
                words.forEach(function(word){                    
                    var wordsRef = ref.child('words').child(word);
                    
                    wordsRef.set({[word]: word}, function(error) {
                        if (error) {
                            console.error(error);
                        } 
                    });
                });
                res.send({success_words: true});
            });
        }
    });
});
 
module.exports = router;
