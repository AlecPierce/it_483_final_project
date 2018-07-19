function prepareForm() {
	var select = document.getElementById("optionList");
	var selectedOption = select.options[select.selectedIndex].id
	deleteForm();
	createForm(selectedOption);
}

function deleteForm() {
	// deletes the current form
	var oldForm = document.getElementById("inputForm");
	if (oldForm != null) {
		document.getElementById("crudForm").removeChild(oldForm);
	}
}

var FormOps = {
	addFaculty: "addFaculty",
	updateFaculty: "updateFaculty",
	deleteFaculty: "deleteFaculty",
	addCourse: "addCourse",
	updateCourse: "updateCourse",
	deleteCourse: "deleteCourse",
	addNews: "addNews",
	updateNews: "updateNews",
	deleteNews: "deleteNews"
};

function createForm(selectedForm) {
	var form = document.createElement("form");
	form.setAttribute("id", "inputForm");
	form.setAttribute("action", selectedForm+".js");
	form.setAttribute("method", "POST");
	document.getElementById("crudForm").appendChild(form);
	if (selectedForm == FormOps.addFaculty || selectedForm == FormOps.updateFaculty
		|| selectedForm == FormOps.deleteFaculty) {
		createFacultyForm(form, selectedForm);
	} else if (selectedForm == FormOps.addCourse || selectedForm == FormOps.updateCourse
		|| selectedForm == FormOps.deleteCourse) {
		createCourseForm(form, selectedForm);
	} else if (selectedForm == FormOps.addNews || selectedForm == FormOps.updateNews
		|| selectedForm == FormOps.deleteNews) {
		createNewsForm(form, selectedForm);
	} 
}

var Faculty = {
	fName: "Faculty Name",
	fID: "Faculty ID",
	fEmail: "Faculty Email",
	fDeg: "Faculty Degree",
	fInt: "Faculty Interest",
	fOffLoc: "Faculty Office Location",
	fNum: "Faculty Phone Number",
	fTitle: "Faculty Title",
	fDesc: "Faculty Description"
};

var FacultyDelete = {
	fNameDel: "Faculty Name",
	fIdDel: "Faculty ID"
};

var Course = {
	cTitle: "Course Title",
	cDesc: "Course Description",
	cPre: "Course Prerequisite",
	cCred: "Course Credits",
	cOffer: "Course Offerings"
};

var CourseDelete = {
	cDelTitle: "Course Title"
};

var News = {
	nTitle: "News Title",
	nText: "News Text",
	nArticle: "News Article Link"
};

var NewsDelete = {
	nDelTitle: "News Title"
};

var image = "Faculty Image";

function createFacultyForm(form, selectedForm) {
	if (selectedForm == FormOps.deleteFaculty) {
		appendChildDivs(FacultyDelete, form);
		appendSubmitButton(form);
	} else {
		appendChildDivs(Faculty, form);
		var childDiv = document.createElement('div');
		childDiv.setAttribute("id", image+"Div");
		childDiv.innerHTML += "<br/>Image Related to Faculty";
		document.getElementById(form.id).appendChild(childDiv);
		var imageInputElem = document.createElement('input');
		imageInputElem.setAttribute("type", "file");
		imageInputElem.setAttribute("name", "New" + image);
		imageInputElem.setAttribute("placeholder", image);
		document.getElementById(image+"Div").appendChild(imageInputElem);
		appendSubmitButton(form);
	}
}

function createCourseForm(form, selectedForm) {
	if (selectedForm == FormOps.deleteCourse) {
		appendChildDivs(CourseDelete, form);
		appendSubmitButton(form);
	} else {
		appendChildDivs(Course, form);
		appendSubmitButton(form);
	}
}

function createNewsForm(form, selectedForm) {
	if (selectedForm == FormOps.deleteNews) {
		appendChildDivs(NewsDelete, form);
		appendSubmitButton(form);
	} else {
		appendChildDivs(News, form);
		appendSubmitButton(form);
	}
}

function appendChildDivs(jsonObject, form) {
	for (i in jsonObject) {
		var inputField = jsonObject[i];
		var childDiv = document.createElement('div');
		childDiv.setAttribute("id", inputField+"Div");
		document.getElementById(form.id).appendChild(childDiv);
		var inputElem = document.createElement('input');
		inputElem.setAttribute("type", "text");
		inputElem.setAttribute("name", "New" + inputField);
		inputElem.setAttribute("placeholder", inputField);
		document.getElementById(inputField+"Div").appendChild(inputElem);
	}
}

function appendSubmitButton(form) {
	var submitDiv = document.createElement('div');
	submitDivId = "submitToMeDiv";
	submitDiv.setAttribute('id', submitDivId);
	document.getElementById(form.id).appendChild(submitDiv);
	var submitButton = document.createElement('button');
	submitButton.setAttribute('id', "submitToMe");
	submitButton.setAttribute('type', "Submit");
	submitButton.innerHTML += "Submit To Me!";
	document.getElementById(submitDivId).appendChild(submitButton);
}