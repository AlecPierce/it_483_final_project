<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$name = $_POST["Name"];
$email = $_POST["Email"];
$degree = $_POST["Degree"];
$interest = $_POST["Interest"];
$phoneNum = $_POST["PhoneNumber"];
$title = $_POST["Title"];
$desc = $_POST["Description"];
$location = $_POST["Location"];
$image_field = $_POST["Image"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO Faculty(\n"

    . "    FACULTY_DEGREE,\n"

    . "    FACULTY_DESC,\n"

    . "    FACULTY_EMAIL,\n"

    . "    FACULTY_ID,\n"

    . "    FACULTY_INTEREST,\n"

    . "    FACULTY_NAME,\n"

    . "    FACULTY_OFFICE_LOC,\n"

    . "    FACULTY_PHONE_NUM,\n"

    . "    FACULTY_TITLE,\n"

    . "    IMAGE_PATH\n"

    . ")\n"

    . "VALUES(\n"

    . "    \"".$degree."\",\n"

    . "    \"".$desc."\",\n"

    . "    \"".$email."\",\n"

    . "    0,\n"

    . "    \"".$interest."\",\n"

    . "    \"".$name."\",\n"

    . "    \"".$location."\",\n"

    . "    \"".$phoneNum."\",\n"

    . "    \"".$title."\",\n"

    . "		\"Pictures/".$image_field."\")";

if ($conn->query($sql) === TRUE) {
    echo "New faculty record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>