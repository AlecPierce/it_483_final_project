<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$id = $_POST["ID"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$delete_possible = FALSE;
$table = "Courses";
$table_column = "COURSE_ID";

if (empty($id)) {
    echo "Delete is not possible. Killing the request. Please provide the correct course id.";
} else {
    $delete_possible = TRUE;
}

if ($delete_possible === TRUE) {
    $sql = "DELETE FROM $table WHERE $table_column LIKE \"" . $id . "\"";

    if ($conn->query($sql) === TRUE) {
        echo "Delete request submitted. If the course does not appear deleted, it may be due to the course id entered.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>