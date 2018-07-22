var mysql = require('mysql');
var writer = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "final_project_db"
});


con.connect(function(err) {
  if (err) {
    throw err;
  }
  con.query("SELECT * FROM Faculty", function (err, result) {
    if (err) {
      throw err;
    } else {
    var faculty = JSON.stringify(result);
    console.log(faculty);
    console.log('Writing to db_faculty.txt');
    var file = writer.createWriteStream('db_faculty.txt');
    file.on('error', function(err) {
    if (err) {
      return console.log(err);
    }
    });
    file.write(faculty);
    file.end();
    console.log('Written to db_faculty.txt');
    }
  });
});
