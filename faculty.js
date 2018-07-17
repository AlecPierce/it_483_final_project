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
      idMap.set(facultyMember.FACULTY_NAME, index.toString());
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
    img.setAttribute("id", facultyMember.FACULTY_NAME + facultyMember.FACULTY_ID);
    img.setAttribute("src", "facultyMember.IMAGE_PATH");
    document.getElementById(facultyMember.FACULTY_ID).appendChild(img);
  }

  function createTopHalfCourseDiv(faculty, facultyId) {
    var facultyMember = faculty[idMap.get(facultyId)];

    // Container div
    newDiv = document.createElement('div');
    newDiv.setAttribute("id", "top-half-div");

    document.getElementById("top-half").appendChild(newDiv);
    createFacultyHTML(facultyMember);
  }

  function createFacultyHTML(facultyMember) {
    var facultyImageDiv = document.createElement('div');
    var facultyImgElement = document.createElement('img');
    var facultyImageDivId = "facultyImgId";   
    var facultyImage = facultyMember.IMAGE_PATH;
    facultyImageDiv.setAttribute("id", facultyImageDivId);
    facultyImgElement.setAttribute("src", facultyImage);
    document.getElementById("top-half-div").appendChild(facultyImageDiv);
    document.getElementById(facultyImageDivId).appendChild(facultyImgElement);

    var facultyNameDiv = document.createElement('div');
    var facultyDescDiv = document.createElement('div');
    var facultyInterestDiv = document.createElement('div');
    var facultyOfficeBuildingDiv = document.createElement('div');
    var facultyOfficeNumDiv = document.createElement('div');
    var facultyDegreeDiv = document.createElement('div');
    var facultyTitleDiv = document.createElement('div');
    var facultyEmailDiv = document.createElement('div');
    var facultyPhoneNumDiv = document.createElement('div');

    var facultyName = facultyMember.FACULTY_NAME;
    var facultyDesc = facultyMember.FACULTY_DESC;
    var facultyInterest = facultyMember.FACULTY_INTEREST;
    var facultyOfficeBuilding = facultyMember.FACULTY_OFFICE_BUILDING;
    var facultyOfficeNum = facultyMember.FACULTY_OFFICE_NUMBER;
    var facultyDegreeDiv = facultyMember.FACULTY_DEGREE;
    var facultyTitleDiv = facultyMember.FACULTY_TITLE;
    var facultyEmail = facultyMember.FACULTY_EMAIL
    var facultyPhoneNum = facultyMember.FACULTY_PHONE_NUM;

    var facultyDivs = [facultyNameDiv, facultyDescDiv,
                      facultyInterestDiv, facultyOfficeBuildingDiv, facultyOfficeBuildingDiv,
                      facultyOfficeNumDiv, facultyDegreeDiv, facultyTitleDiv, facultyEmailDiv, facultyPhoneNumDiv];

    var facultyInfo = [facultyName, facultyDesc,
                      facultyInterest, facultyOfficeBuilding, facultyOfficeBuilding,
                      facultyOfficeNum, facultyDegree, facultyTitle, facultyEmail, facultyPhoneNum];

    for (i in facultyDivs) {
      var childDiv = facultyDivs[i];
      childDiv.setAttribute("id", "topHalfDivChild" + facultyInfo.indexOf(childDiv));
      childDiv.innerHTML += facultyInfo[i];
      document.getElementById("top-half-div").appendChild(childDiv);
    }
  }

  function deleteTopHalfCourseDiv() {
    // Removes the current "top-half-div"
    var oldDiv = document.getElementById("top-half-div");
    document.getElementById("top-half").removeChild(oldDiv);
  }