<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_project_db";

$name = $_POST["Name"];
$degree = $_POST["Degree"];
$email = $_POST["Email"];
$interest = $_POST["Interest"];
$phoneNum = $_POST["Phone"];
$title = $_POST["Title"];
$desc = $_POST["Description"];
$location = $_POST["Office"];
$link = $_POST["Link"];
$image = $_POST["Image"];

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
$table_name = "Faculty";
$name_col = "FACULTY_NAME";
$id_col = "FACULTY_ID";

if (empty($name)) {
    echo "Update is not possible. Killing the request.";
} else {
    if (empty($degree) != TRUE) {
        array_push($field_array, $degree);
        array_push($column_array, "FACULTY_DEGREE");
        array_push($type_array, "STRING");
    }

    if (empty($email) != TRUE) {
        array_push($field_array, $email);
        array_push($column_array, "FACULTY_EMAIL");
        array_push($type_array, "STRING");
        $update_possible = true;
    }

    if (empty($interest) != TRUE) {
        array_push($field_array, $interest);
        array_push($column_array, "FACULTY_INTEREST");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }

    if (empty($phoneNum) != TRUE) {
        array_push($field_array, $phoneNum);
        array_push($column_array, "FACULTY_PHONE_NUM");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }

        if (empty($title) != TRUE) {
        array_push($field_array, $title);
        array_push($column_array, "FACULTY_TITLE");
        array_push($type_array, "STRING");
    }

    if (empty($desc) != TRUE) {
        array_push($field_array, $desc);
        array_push($column_array, "FACULTY_DESC");
        array_push($type_array, "STRING");
        $update_possible = true;
    }

    if (empty($location) != TRUE) {
        array_push($field_array, $location);
        array_push($column_array, "FACULTY_OFFICE_LOC");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }

    if (empty($link) != TRUE) {
        array_push($field_array, $link);
        array_push($column_array, "FACULTY_LINK");
        array_push($type_array, "STRING");
        $update_possible = TRUE;
    }

    if (empty($image) != TRUE) {
        array_push($field_array, $image);
        array_push($column_array, "FACULTY_IMAGE");
        array_push($type_array, "IMAGE");
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
            } else if ($type_array[$i] == "IMAGE") {
                $setSql .= $column_array[$i] . "=" . 
                    "\"Pictures/" . $field_array[$i] . "\"";
            } else {
                echo "Error: No type given for column " . $column_array[i];
            }
        } else {
            if ($type_array[$i] == "STRING") {
                $setSql .= "," . $column_array[$i] . "=" . "\"" . 
                    $field_array[$i] . "\"";
            } else if ($type_array[$i] == "IMAGE") {
                $setSql .= "," . $column_array[$i] . "=" . 
                    "\"Pictures/" . $field_array[$i] . "\"";
            } else {
                echo "Error: No type given for column " . $column_array[i];
            }
        }
    }

    $id_sql = "(SELECT $id_col WHERE $name_col LIKE \"" . $name . "\")";

    $sql = "UPDATE $table_name SET $setSql WHERE $id_col  = $id_sql";

    if ($conn->query($sql) === TRUE) {
        echo "Update request submitted. If the update does not appear successful, it may be due to the name entered.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>