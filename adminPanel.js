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
	form.setAttribute("action", selectedForm + ".php");
	form.setAttribute("method", "post");
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
	fName: "Name",
	fEmail: "Email",
	fDeg: "Degree",
	fInt: "Interest",
	fOffLoc: "Office",
	fNum: "Phone",
	fTitle: "Title",
	fDesc: "Description",
	fLink: "Link"
};

var FacultyUpdate = {
	fName: "Name",
	fID: "ID",
	fEmail: "Email",
	fDeg: "Degree",
	fInt: "Interest",
	fOffLoc: "Office",
	fNum: "Phone",
	fTitle: "Title",
	fDesc: "Description",
	fLink: "Link"
};

var FacultyDelete = {
	fNameDel: "Name"
};

var Course = {
	cId: "ID",
	cTitle: "Title",
	cDesc: "Description",
	cPre: "Prerequisite",
	cCred: "Credits",
	cOffer: "Offerings"
};

var CourseDelete = {
	cDelId: "ID"
};

var News = {
	nTitle: "Title",
	nText: "Text",
	nLink: "Link"
};

var NewsDelete = {
	nDelTitle: "Title"
};

var image = "Image";

function createFacultyForm(form, selectedForm) {
	if (selectedForm == FormOps.deleteFaculty) {
		appendChildDivs(FacultyDelete, form);
		appendSubmitButton(form);
	} else {
		appendChildDivs(Faculty, form);
		var childDiv = document.createElement('div');
		childDiv.setAttribute("id", image+"Div");
		childDiv.innerHTML += "<br/>Image Related to Faculty<br/><br/>";
		document.getElementById(form.id).appendChild(childDiv);
		var imageInputElem = document.createElement('input');
		imageInputElem.setAttribute("type", "file");
		imageInputElem.setAttribute("name", image);
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
		inputElem.setAttribute("name", inputField);
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
	submitButton.innerHTML += "Submit";
	document.getElementById(submitDivId).appendChild(document.createElement('br'));
	document.getElementById(submitDivId).appendChild(submitButton);
}