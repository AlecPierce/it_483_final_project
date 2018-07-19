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
    var courseInfo = [course.COURSE_ID, course.COURSE_DESC, course.COURSE_PREREQ,
                      course.COURSE_OFFER,  course.COURSE_CREDITS,  course.COURSE_TITLE]

    for (i in courseInfo) {
      var childDiv = document.createElement('div');
      childDiv.setAttribute("id", "topHalfDivChild" + i);
      childDiv.innerHTML += courseInfo[i];
      document.getElementById("top-half-div").appendChild(childDiv);
    }
  }

  function deleteTopHalfCourseDiv() {
    // Removes the current "top-half-div"
    var oldDiv = document.getElementById("top-half-div");
    document.getElementById("top-half").removeChild(oldDiv);
  }