var faculty = [];
var idMap = new Map();
$( document ).ready(function() {
  $.ajax({
        url: "db_faculty.txt",
        success: function(result) {
          faculty = JSON.parse(result);
          console.log("Successfully grabbed db_faculty Content");
          createBottomHalfContent(faculty);
        },
        error: function() {
          console.log('An error occurred');
        }
  });
  $('.facultyLink').on("click", function(event) {
    console.log("Click was accepted");
    var facultyId = $(event.target).attr('id');
    $.ajax({
        url: "db_faculty.txt",
        success: function(result) {
          faculty = JSON.parse(result);
          console.log("Successfully grabbed db_faculty Content");
        },
        error: function() {
          console.log('An error occurred');
        }
    });
    deleteTopHalfCourseDiv();
    createTopHalfCourseDiv(faculty, facultyId);
  });
});

  function createBottomHalfContent(faculty) {
    var index = 0;
    faculty.forEach(function(facultyMember) {
      idMap.set(facultyMember.FACULTY_ID.toString(), index.toString());
      createNewDiv(facultyMember);
      index++;
    });
  }

  function createNewDiv(facultyMember) {
    // Container div
    var div = document.createElement('div');
    div.setAttribute("id", facultyMember.FACULTY_ID);

    // Setting the text of the button
    div.innerHTML += facultyMember.FACULTY_NAME;

    document.getElementById("facultyLinks").appendChild(div);
    var img = document.createElement('img');
    img.setAttribute("id", facultyMember.FACULTY_ID);
    img.setAttribute("src", facultyMember.IMAGE_PATH);
    img.setAttribute("height", "250px");
    img.setAttribute("width", "250px");
    document.getElementById(facultyMember.FACULTY_ID).appendChild(img);
  }

  function createTopHalfCourseDiv(faculty, facultyId) {
    // Container div
    newDiv = document.createElement('div');
    newDiv.setAttribute("id", "top-half-div");

    document.getElementById("top-half").appendChild(newDiv);
    createFacultyHTML(faculty, facultyId);
  }

  function createFacultyHTML(faculty, facultyId) {
    var facultyMember = faculty[idMap.get(facultyId)];
    var facultyImageDiv = document.createElement('div');
    var facultyImgElement = document.createElement('img');
    var facultyImageDivId = "facultyImgId";   
    var facultyImage = facultyMember.IMAGE_PATH;
    facultyImageDiv.setAttribute("id", facultyImageDivId);
    facultyImgElement.setAttribute("src", facultyImage);
    facultyImgElement.setAttribute("height", "250px");
    facultyImgElement.setAttribute("width", "250px");
    document.getElementById("top-half-div").appendChild(facultyImageDiv);
    document.getElementById(facultyImageDivId).appendChild(facultyImgElement);

    var facultyInfo = [facultyMember.FACULTY_NAME, facultyMember.FACULTY_DESC,
                      facultyMember.FACULTY_INTEREST, facultyMember.FACULTY_OFFICE_LOC, 
                      facultyMember.FACULTY_DEGREE, facultyMember.FACULTY_TITLE, 
                      facultyMember.FACULTY_EMAIL, facultyMember.FACULTY_PHONE_NUM];

    for (i in facultyInfo) {
      var childDiv = document.createElement('div');
      childDiv.setAttribute("id", "topHalfDivChild" + i);
      childDiv.innerHTML += facultyInfo[i];
      document.getElementById("top-half-div").appendChild(childDiv);
    }
  }

  function deleteTopHalfCourseDiv() {
    // Removes the current "top-half-div"
    var oldDiv = document.getElementById("top-half-div");
    document.getElementById("top-half").removeChild(oldDiv);
  }