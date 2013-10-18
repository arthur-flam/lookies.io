var express = require('express');
var app = express();
var fs = require('node-fs');
var htmlfile = "index.html";

app.use(express.compress());
app.use(express.static(__dirname));
// app.get('/',function(req,res){
//     var html = fs.readFileSync(htmlfile).toString();
//     console.log(req);
//     res.send(html);
// });

var port = process.env.PORT || 80;
app.listen(port,function(){
    console.log("Listenning on "+port);
});
