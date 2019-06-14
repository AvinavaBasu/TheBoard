(function (homeCOntroller) {
  var data = require("../data");
  homeCOntroller.init = function (app) {

    app.get("/", function (req, res) {
      res.write("<html><body><h1>Express </html></body></h1>");
      // this way is painful, so we'll use view engines
      res.end();
    });

    app.get("/jade", function (req, res) {
      res.render("jade/index", { title: "Express+jade" });
      res.end();
    });

    app.get("/ejs", function (req, res) {
      res.render("ejs/index", { title: "Express + EJS" });
      res.end();
    });

    app.get("/vash", function (req, res) {
      data.getNoteCategories(function (err, results) {
        res.render("vash/index", { title: "Express + Vash", error: err, categories: results });
        res.end();
      });
    });

    app.get("/api/users", function (req, res) {
      res.set("Content-Type", "application/json");
      res.send({ name: "Avinava", iValid: true, group: "Admin" });
      res.end();
    });


    app.get("/api/sql", function (req, res) {
      //const sql = require('mssql');
      //sql.connect('Driver={SQL Server Native Client 11.0};Server=.\\sqlexpress;Database=DMFAMaster;Uid=sa;Pwd=password@123;');
      //const result = sql.query`select * from FileIdentification`;
      //res.send(result);


    //  var request = new sql.Request();
    //  var con = "Data Source=(LocalDB)\v13.0;Initial Catalog=DUO;Integrated Security=True;";
    //  request.query(con, "select * from CodeMapping", function (err, results) {
    //    if (err) {
    //      res.send(err);
    //    };
    //    res.send(results);
    //    res.end();
    //  });
    //  con.close();



    //1.
    var sql = require('mssql');
    //2.
    var config = {
      server: '(local)\\SQLEXPRESS',
      //database: 'DMFAMaster',
      userName: 'sa',
      password: 'password@123',
      
      options: {
        //port: 0,
        instancename: 'SQLEXPRESS',
        database: 'DMFAMaster',
      }
    };
    //3.
    function loadEmployees() {
      //4.
      var dbConn = new sql.ConnectionPool(config);
      //5.
      dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);
        //7.
        request.query("select * from FileIdentification").then(function (recordSet) {
          console.log(recordSet);
          dbConn.close();
        }).catch(function (err) {
          //8.
          console.log(err);
          dbConn.close();
        });
      }).catch(function (err) {
        //9.
        console.log(err);
      });
    }
    //10.
      loadEmployees();

    });


    //app.get('/api/sql', function (req, res) {
    //  var sql = require("mssql");
    //  // config for your database
    //  var config = {
    //    user: 'sa',
    //    password: 'password@123',
    //    server: '(local)\\sqlexpress',
    //    database: 'DMFAMaster'
    //  };

    //  // connect to your database
    //  sql.connect(config, function (err) {

    //    if (err) console.log(err);

    //    // create Request object
    //    var request = new sql.Request();

    //    // query to the database and get the records
    //    request.query('select * from FileIdentification', function (err, recordset) {

    //      if (err) {
    //        console.log(err);
    //        return;
    //      }
    //      else {
    //      // send records as a response
    //        res.send(recordset);
    //      }

    //    });
    //  });
    //});

    //app.get("/api/sql", function (req, res) {
    //  const sql = require("mssql");
    //  const conn = new sql.ConnectionPool({
    //    database: "DUO",
    //    server: "(LocalDB)\\v13.0",
    //    options: {
    //      trustedConnection: true
    //    }
    //  });
    //  conn.connect().then(() => {
    //    var conn = new sql.Connection(config);
    //    var request = sql.Request(conn);

    //    conn.connect(function (err) {
    //      if (err) {
    //        console.log(err);
    //        return;
    //      }

    //      request.query("select * from CodeMapping", function (err, table) {
    //        if (err) {
    //          console.log(err);
    //          return;
    //        }
    //        else {
    //          res.send(table);
    //          console.log(table);
    //        }

    //        conn.close();
    //      });
    //    });
    //  });
    //});


  };
})(module.exports);