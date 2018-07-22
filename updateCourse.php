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

$field_array = array();
$column_array = array();
$type_array = array();
$update_possible = FALSE;
$update_sql_value = "Courses";
$where_sql_value = "COURSE_ID";

if (empty($id)) {
    echo "Update is not possible. Killing the request.";
} else {
    if (empty($title) != TRUE) {
        array_push($field_array, $title);
        array_push($column_array, "COURSE_TITLE");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }
    if (empty($desc) != TRUE) {
        array_push($field_array, $desc);
        array_push($column_array, "COURSE_DESC");
        array_push($type_array, "STRING");
        $update_possible = true;
    }
    if (empty($prereq) != TRUE) {
        array_push($field_array, $prereq);
        array_push($column_array, "COURSE_PREREQ");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }
    if (empty($credits) != TRUE) {
        array_push($field_array, $credits);
        array_push($column_array, "COURSE_CREDITS");
        array_push($type_array, "INTEGER");
        $update_possible = TRUE;
    }
    if (empty($offerings) != TRUE) {
        array_push($field_array, $offerings);
        array_push($column_array, "COURSE_OFFER");
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
            } else if ($type_array[$i] == "INTEGER") {
                $setSql .= $column_array[$i] . "=" . 
                    $field_array[$i];
            } else {
                echo "Error: No type given for column " . $column_array[i];
            }
        } else {
            if ($type_array[$i] == "STRING") {
                $setSql .= "," . $column_array[$i] . "=" . "\"" . 
                    $field_array[$i] . "\"";
            } else if ($type_array[$i] == "INTEGER") {
                $setSql .= "," . $column_array[$i] . "=" . 
                    $field_array[$i];
            } else {
                echo "Error: No type given for column " . $column_array[i];
            }
        }
    } 
    $sql = "UPDATE $update_sql_value SET $setSql WHERE $where_sql_value LIKE \"" . $id . "\"";

    if ($conn->query($sql) === TRUE) {
        echo "Courses record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>