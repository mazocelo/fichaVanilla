var express = require('express');
var desvantagem = require('../public/seleções/desvantagens.json')
var vantagens = require('../public/seleções/vantagens.json')
var vantsUnicas = require('../public/seleções/vantsUnicas.json')
var superPoder = require('../public/seleções/SuperPoder.json');
var Firebase = require('../public/src/util/Firebase')

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/desvantagem',function(req,res,next){
  res.send(desvantagem)
});


router.get('/vantagens',function(req,res,next){
  res.send(vantagens)
});


router.get('/unicas',function(req,res,next){
  res.send(vantsUnicas)
});


router.get('/superpoder',function(req,res,next){
  res.send(superPoder)
});

router.post('/newcharacter',function(req,res,next){
  console.log(req.body)
  
})

module.exports = router;
