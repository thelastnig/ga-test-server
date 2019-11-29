var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var WordPOS = require('wordpos');
 
/* GET : "/noun" */
router.get('/', (req, res) => {

    var words = [];
    var articles = [];
    var db = admin.database();
    var ref = db.ref("/");
    var wordsRef = ref.child('words_node');
    var articleRef = ref.child("articles_node");
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
});
 
/* POST : "/noun" */
router.post('/', (req, res) => {

    // 게시글을 DB에 저장
    var text = req.body.article;

    var db = admin.database();
    var ref = db.ref("/");

    var today = new Date();

    var articleRef = ref.child("articles_node");
    articleRef.push({
        content: text,
        date: today.toString()
    }, function(error) {
        if (error) {
            console.error(error);
            res.send({success_article: false});
            return;
        } else {
            // 저장 후 노드 라이브러리를 통해 명사만 추출하여 자동 완성 DB에 저장
            wordpos = new WordPOS();
            
            wordpos.getNouns(text, function(result){  
                result.forEach(function(word){                    
                    var wordsRef = ref.child('words_node').child(word);
                    
                    wordsRef.set({[word]: word}, function(error) {
                        if (error) {
                            console.error(error);
                        }
                    });
                });
                
                res.send({success_words: result}); 
            });        
        }
    });
});
 
module.exports = router;
