const express = require('express');
var app = express;

app.get('/',(req, res)=> {
    res.send("weclome to homepage");
});

app.set('port', process.env.PORT || 3000);
