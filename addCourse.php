<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$id = $_POST["ID"];
$title = $_POST["Title"];
$desc = $_POST["Description"];
$prereq = $_POST["Prerequisite"];
$credits = $_POST["Credits"];
$offerings = $_POST["Offerings"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO Courses (\n"

    . "    COURSE_ID,\n"

    . "    COURSE_TITLE,\n"

    . "    COURSE_DESC,\n"

    . "    COURSE_PREREQ,\n"

    . "    COURSE_CREDITS,\n"

    . "    COURSE_OFFER"

    . ")\n"

    . "VALUES (\n"

    . "    \"".$id."\",\n"

    . "    \"".$title."\",\n"

    . "    \"".$desc."\",\n"

    . "    \"".$prereq."\",\n"

    . "    \"".$credits."\",\n"

    . "    \"".$offerings."\")";

if ($conn->query($sql) === TRUE) {
    echo "New courses record created.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>