var faculty = [];
var idMap = new Map();
$( document ).ready(function() {
  $.ajax({
        url: "db_faculty.txt",
        success: function(result) {
          faculty = JSON.parse(result);
          createBottomHalfContent(faculty);
        },
        error: function() {
          console.log('An error occurred');
        }
  });
  $('.facultyLink').on("click", function(event) {
    var facultyId = $(event.target).attr('id');
    $.ajax({
        url: "db_faculty.txt",
        success: function(result) {
          faculty = JSON.parse(result);
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
    div.setAttribute("class", "facultyMemberDiv");

    // Setting the text of the button
    var textDiv = document.createElement('div');
    textDiv.innerHTML += facultyMember.FACULTY_NAME;

    document.getElementById("facultyLinks").appendChild(div);

    var img = document.createElement('img');
    img.setAttribute("id", facultyMember.FACULTY_ID);
    img.setAttribute("src", facultyMember.FACULTY_IMAGE);
    img.setAttribute("class", "facultyImg");
    document.getElementById(facultyMember.FACULTY_ID).appendChild(textDiv);
    document.getElementById(facultyMember.FACULTY_ID).appendChild(img);

    var facultyLinkElement = document.createElement('a');  
    var facultyLink = facultyMember.FACULTY_LINK;
    facultyLinkElement.setAttribute("href", facultyLink);
    facultyLinkElement.innerHTML += "<br/>Link to their work";
    document.getElementById(facultyMember.FACULTY_ID).appendChild(facultyLinkElement);
  }

  function createTopHalfCourseDiv(faculty, facultyId) {
    // Container div
    newDiv = document.createElement('div');
    newDiv.setAttribute("id", "top-half-div");
    newDiv.setAttribute("class", "topHalfDiv");

    document.getElementById("top-half").appendChild(newDiv);
    createFacultyHTML(faculty, facultyId);
  }

  function createFacultyHTML(faculty, facultyId) {
    var facultyMember = faculty[idMap.get(facultyId)];
    var facultyImageDiv = document.createElement('div');
    var facultyImgElement = document.createElement('img');
    var facultyImageDivId = "facultyImgId";   
    var facultyImage = facultyMember.FACULTY_IMAGE;
    facultyImageDiv.setAttribute("id", facultyImageDivId);
    facultyImageDiv.setAttribute("class", "imgContainer");
    facultyImgElement.setAttribute("src", facultyImage);
    document.getElementById("top-half-div").appendChild(facultyImageDiv);
    document.getElementById(facultyImageDivId).appendChild(facultyImgElement);

    var facultyInfo = [facultyMember.FACULTY_NAME, facultyMember.FACULTY_DESC,
                      facultyMember.FACULTY_INTEREST, facultyMember.FACULTY_OFFICE_LOC, 
                      facultyMember.FACULTY_DEGREE, facultyMember.FACULTY_TITLE, 
                      facultyMember.FACULTY_EMAIL, facultyMember.FACULTY_PHONE_NUM];

    var parentDiv = document.createElement('div');
    parentDiv.setAttribute("id", "topHalfDivParent");
    document.getElementById("top-half-div").appendChild(parentDiv);

    for (i in facultyInfo) {
      var childDiv = document.createElement('div');
      childDiv.setAttribute("id", "topHalfDivChild" + i);
      childDiv.innerHTML += facultyInfo[i];
      document.getElementById("topHalfDivParent").appendChild(childDiv);
    }
  }

  function deleteTopHalfCourseDiv() {
    // Removes the current "top-half-div"
    var oldDiv = document.getElementById("top-half-div");
    document.getElementById("top-half").removeChild(oldDiv);
  }