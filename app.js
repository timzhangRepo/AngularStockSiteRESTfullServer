var express = require('express');
var cors = require('cors');
const https = require('https')

let searchUrl = "https://api.tiingo.com/tiingo/utilities/search?query=";
let lastestPriceUrl = "https://api.tiingo.com/iex/?tickers=";
let dailyURL = "https://api.tiingo.com/tiingo/daily/";
let token = "token=a24173cb58feb7109d23ffe4d3f16abe1594f938";

let newsURL ="https://newsapi.org/v2/everything?q=";
let newsToken = "&sortBy=publishedAt&apiKey=dbc03e0b69d34663a517e07fa02a0c9f";
let pricesUrl = "https://api.tiingo.com/iex/"

var app = express();
app.use(cors());

var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};


app.get('/', function (req, res) {
    res.json({msg: '200'})
})

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

app.get('/prices/:todayStart/:stock', function (req, res) {
    var symbol = req.params.stock;
    var begins = req.params.todayStart;
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
app.get('/hist/:startDate/:stock', function (req, res) {
    var symbol = req.params.stock;
    var begins = req.params.startDate;
    var data = '';
    var url = dailyURL+symbol+'/prices?startDate='+begins+"&resampleFreq=daily&token=a24173cb58feb7109d23ffe4d3f16abe1594f938";
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


// Listen on port 3000, IP defaults to 127.0.0.1
app.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
