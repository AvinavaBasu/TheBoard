var http = require("http");
var express = require("express");
var app = express();
var ejsEngine = require("ejs-locals");
var controllers = require("./controllers");
//var server = http.createServer(function (req, res) {
//    console.log(`request url is ${req.url}`);
//    res.write("<html><body><h1>" + req.url + "</html></body></h1>");
//    res.end();
    
//});

//app.set("view engine", "jade");

//app.engine("ejs", ejsengine); //support master pages
//app.set("view engine", "ejs"); //ejs view engine
app.set("view engine", "vash")
app.use(express.static(__dirname + "/public"));
//Map routes
controllers.init(app);



//const sql = require('mssql');

//async () => {
//  try {
//    await sql.connect('Data Source=(LocalDB)\v13.0;Initial Catalog=DUO;Integrated Security=True;');
//    const result = await sql.query`select * from [CodeMapping]`;
//    console.dir(result);
//  } catch (err) {
//    // ... error checks
//  }
//};
var server = http.createServer(app);

server.listen(1337);