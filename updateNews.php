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

$field_array = array();
$column_array = array();
$type_array = array();
$update_possible = FALSE;
$update_sql_value = "News";
$where_sql_value = "NEWS_TITLE";

if (empty($title)) {
    echo "Update is not possible. Killing the request.";
} else {
    if (empty($text) != TRUE) {
        array_push($field_array, $text);
        array_push($column_array, "NEWS_TEXT");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }
    if (empty($link) != TRUE) {
        array_push($field_array, $link);
        array_push($column_array, "NEWS_LINK");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }
}

if ($update_possible === TRUE) {
    $setSql = "";
    for ($i = 0; $i <= count($column_array)-1; $i++) {
        if ($i == 0) {
            if ($type_array[$i] == "STRING") {
                $setSql .= $column_array[$i] . "=" . "\"" . 
                    $field_array[$i] . "\"";
            } else {
                echo "Error: No type given for column " . $column_array[i];
            }
        } else {
            if ($type_array[$i] == "STRING") {
                $setSql .= "," . $column_array[$i] . "=" . "\"" . 
                    $field_array[$i] . "\"";
            } else {
                echo "Error: No type given for column " . $column_array[i];
            }
        }
    } 
    $sql = "UPDATE $update_sql_value SET $setSql WHERE $where_sql_value LIKE \"" . $title . "\"";

    if ($conn->query($sql) === TRUE) {
        echo "News record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>