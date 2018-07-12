var courseArray = [];

createNewDiv(5, courseArray);

var divUponEnterHidden = false;

function createNewDiv(i, courseArray) {
  // Container div
  div = document.createElement('div');
  div.setAttribute("id", "courseLink" + i);
  div.setAttribute("class", "course");
  div.setAttribute("hidden", "false");

  // Setting the text of the button
  div.innerHTML += "Course " + i;

  // TODO: Come up with unique onclicks
  // TODO: Figure out a way to hide the newest div
  $(div.click(function(courseArray){
    if (courseArray.length > 0) { 
        courseDiv = courseArray[courseArray.length - 1];
      if (!divUponEnterHidden) {
        $(document.getElementById("divUponEnter")).hide();
        divUponEnterHidden = true;
      }
      if (courseDiv.getAttribute("hidden").equals(false)) {
        document.getElementById(courseDiv.getAttribute("id")).hide();
        courseArray[courseArray.length - 1].setAttribute("hidden", true);
      }
    }
    // $(document.getElementByClass("course")).hide();
    createTopHalfCourseDiv();
  });

  document.getElementById("courseLinks").appendChild(div);
}

function createTopHalfCourseDiv() {
  // Container div
  div = document.createElement('div');
  div.setAttribute("id", "top-half-div");
  div.innerHTML += "divOnClick";
  courseArray.push(div);
  document.getElementById("top-half").appendChild(div);
}

var courses = [];
var courseID = "\"IT210\"";
var mysql = require('mysql');
var query = "SELECT * FROM Courses WHERE COURSE_ID LIKE " + courseID;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "it_483_project"
});

con.connect(function(err, courseID) {
  if (err) {
    throw err;
  }
  con.query(query, function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      courses = result;
      console.log(result);
    }
  });
});