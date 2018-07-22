<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$title = $_POST["Title"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$delete_possible = FALSE;
$table = "News";
$id_column = "NEWS_ID";
$title_column = "NEWS_TITLE";

if (empty($title)) {
    echo "Delete is not possible. Killing the request. Please provide the correct title.";
} else {
    $delete_possible = TRUE;
}

if ($delete_possible === TRUE) {
	$id_sql = "(SELECT $id_column WHERE $title_column LIKE \"" . $title . "\")";
    $sql = "DELETE FROM $table WHERE $id_column = $id_sql";

    if ($conn->query($sql) === TRUE) {
        echo "Delete request submitted. If the news article does not appear deleted, you may have provided the incorrect title.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>