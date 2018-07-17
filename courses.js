var courses = [];
var idMap = new Map();
$( document ).ready(function() {
  $.ajax({
        url: "db_courses.txt",
        success: function(result) {
          courses = JSON.parse(result);
          console.log("Successfully grabbed db_courses Content");
          createBottomHalfContent(courses);
        },
        error: function() {
          console.log('An error occurred');
        }
  });
  $('.courseLink').on("click", function(event) {
    console.log("Click was accepted");
    var courseId = $(event.target).attr('id');
    $.ajax({
        url: "db_courses.txt",
        success: function(result) {
          courses = JSON.parse(result);
          console.log("Successfully grabbed db_courses Content");
        },
        error: function() {
          console.log('An error occurred');
        }
    });
    deleteTopHalfCourseDiv();
    createTopHalfCourseDiv(courses, courseId);
  });
});

  function createBottomHalfContent(courses) {
    var index = 0;
    courses.forEach(function(course) {
      idMap.set(course.COURSE_ID, index.toString());
      createNewDiv(course);
      index++;
    });
  }

  function createNewDiv(course) {
    // Container div
    div = document.createElement('div');
    div.setAttribute("id", course.COURSE_ID);

    // Setting the text of the button
    div.innerHTML += course.COURSE_ID;

    document.getElementById("courseLinks").appendChild(div);
  }

  function createTopHalfCourseDiv(courses, courseId) {
    var course = courses[idMap.get(courseId)];

    // Container div
    newDiv = document.createElement('div');
    newDiv.setAttribute("id", "top-half-div");

    document.getElementById("top-half").appendChild(newDiv);
    createCourseHTML(course);
  }

  function createCourseHTML(course) {
    var courseIdDiv = document.createElement('div');
    var courseTitleDiv = document.createElement('div');
    var courseOfferingsDiv = document.createElement('div');
    var courseDescDiv = document.createElement('div');
    var coursePrereqDiv = document.createElement('div');
    var courseCreditsDiv = document.createElement('div');
    var courseIdInfo = course.COURSE_ID;
    var courseDescInfo = course.COURSE_DESC;
    var coursePrereqInfo = course.COURSE_PREREQ;
    var courseOfferingsInfo = course.COURSE_OFFERINGS;
    var courseCreditsInfo = course.COURSE_CREDITS;
    var courseTitleInfo = course.COURSE_TITLE;

    var courseInfoDivs = [courseIdDiv, courseDescDiv, coursePrereqDiv,
                      courseOfferingsDiv, courseCreditsDiv, courseTitleDiv];

    var courseInfo = [courseIdInfo, courseDescInfo, coursePrereqInfo,
                      courseOfferingsInfo,  courseCreditsInfo,  courseTitleInfo]

    for (i in courseInfoDivs) {
      var childDiv = courseInfoDivs[i];
      childDiv.setAttribute("id", "topHalfDivChild" + courseInfo.indexOf(childDiv));
      childDiv.innerHTML += courseInfo[i];
      document.getElementById("top-half-div").appendChild(childDiv);
    }
  }

  function deleteTopHalfCourseDiv() {
    // Removes the current "top-half-div"
    var oldDiv = document.getElementById("top-half-div");
    document.getElementById("top-half").removeChild(oldDiv);
  }