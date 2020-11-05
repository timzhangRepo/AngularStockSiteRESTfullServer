
const exress = require('express');
const app = express();
var port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("welcome to the home page");
})

server.listen(port);


