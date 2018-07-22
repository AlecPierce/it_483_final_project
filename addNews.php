<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$title = $_POST["Title"];
$text = $_POST["Text"];
$link = $_POST["Link"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO News (\n"

    . "    NEWS_ID,\n"

    . "    NEWS_TITLE,\n"

    . "    NEWS_TEXT,\n"

    . "    NEWS_LINK"

    . ")\n"

    . "VALUES (\n"

    . "    0,\n"

    . "    \"".$title."\",\n"

    . "    \"".$text."\",\n"

    . "    \"".$link."\")";

if ($conn->query($sql) === TRUE) {
    echo "New news record created.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>