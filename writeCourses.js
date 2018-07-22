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
  con.query("SELECT * FROM Courses", function (err, result) {
    if (err) {
      throw err;
    } else {
	  var courses = JSON.stringify(result);
	  console.log(courses);
	  console.log('Writing to db_courses.txt');
	  var file = writer.createWriteStream('db_courses.txt');
	  file.on('error', function(err) {
		if (err) {
			return console.log(err);
		}
	  });
	  file.write(courses);
	  file.end();
	  console.log('Written to db_courses.txt');
    }
  });
});