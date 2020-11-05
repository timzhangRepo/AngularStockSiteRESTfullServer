var express = require('express');
var cors = require('cors');
const https = require('https')
var app = express();
app.use(cors());

let searchUrl = "https://api.tiingo.com/tiingo/utilities/search?query=";
let lastestPriceUrl = "https://api.tiingo.com/iex/?tickers=";
let dailyURL = "https://api.tiingo.com/tiingo/daily/";
let token = "token=a24173cb58feb7109d23ffe4d3f16abe1594f938";

let newsURL ="https://newsapi.org/v2/everything?q=";
let newsToken = "&sortBy=publishedAt&apiKey=dbc03e0b69d34663a517e07fa02a0c9f";

app.get('/', function (req, res) {
  res.json({msg: '200'})
})
/**
 * returns general inforamtion about a stock.
 */
app.get('/search/:stock', function (req, res) {
  var symbol = req.params.stock;
  var data = '';
  var url = searchUrl+symbol+'&'+token;
  https.get(url,function (response){
    var body = '';
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      data = JSON.parse(body);
      res.send(data);
    });
  })
})

//Checks the current stock price, only response with latest stock price
app.get('/price/:stock', function (req, res) {
  var symbol = req.params.stock;
  var data = '';
  var url = lastestPriceUrl+symbol+'&'+token;
  https.get(url,function (response){
    var body = '';
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      data = JSON.parse(body);
      res.send(data);
    });
  })
})

app.get('/daily/:stock', function (req, res) {
  var symbol = req.params.stock;
  var data = '';
  var url = dailyURL+symbol+'?'+token;
  https.get(url,function (response){
    var body = '';
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      data = JSON.parse(body);
      res.send(data);
    });
  })
})

app.get('/news/:stock', function (req, res) {
  var symbol = req.params.stock;
  var data = '';
  var url = newsURL+symbol+newsToken;
  https.get(url,function (response){
    var body = '';
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      data = JSON.parse(body);
      res.send(data);
    });
  })
})
/**
 *
 *
 */
let pricesUrl = "https://api.tiingo.com/iex/"
app.get('/prices/:todayStart/:stock', function (req, res) {
  var symbol = req.params.stock;
  var begins = req.params.todayStart;
  console.log(begins);
  var data = '';
  var url = pricesUrl+symbol+'/prices?startDate='+begins+"&resampleFreq=4min&token=a24173cb58feb7109d23ffe4d3f16abe1594f938";
  https.get(url,function (response){
    var body = '';
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      data = JSON.parse(body);
      res.send(data);
    });
  })
})


app.listen(3000);
