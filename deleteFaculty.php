<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$name = $_POST["Name"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$delete_possible = FALSE;
$table = "Faculty";
$id_column = "FACULTY_ID";
$name_column = "FACULTY_NAME";

if (empty($name)) {
    echo "Delete is not possible. Killing the request. Please provide the correct name.";
} else {
    $delete_possible = TRUE;
}

if ($delete_possible === TRUE) {
	$id_sql = "(SELECT $id_column WHERE $name_column LIKE \"" . $name . "\")";
    $sql = "DELETE FROM $table WHERE $id_column = $id_sql";

    if ($conn->query($sql) === TRUE) {
        echo "Delete request submitted. If the faculty member does not appear deleted, you may have provided the incorrect name.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>