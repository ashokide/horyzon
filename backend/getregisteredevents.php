<?php
include_once "connection.php";
session_start();
$eventnos = [];
$events = [];
if ($stmt = $mysqli->prepare("SELECT * FROM registeredevents WHERE username = ?;")) {
    $stmt->bind_param("s", $username);
    $username = $_SESSION["username"];
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows){
        while ($data = $result->fetch_row()) {
            array_push($eventnos, $data[2]);
        }
        $stmt->close();
        $nos = join(",", $eventnos);
        if($stmt = $mysqli->query("SELECT * FROM events WHERE sno IN ($nos)")){
            while ($data = $stmt->fetch_assoc()) {
                array_push($events, $data);
            }
            echo json_encode(["status" => 1, "data" => $events]);
        }
        else{
            echo json_encode(["status" => 0, "data" => "Error in Preparing Statements"]);
        }
        $stmt->close();
    }
    else{
        echo json_encode(["status" => 0, "data" => "No Events Registered<br>Register Some Event"]);
    }
} else {
    echo json_encode(["status" => 0, "data" => "Error in Preparing Statements"]);
}
?>