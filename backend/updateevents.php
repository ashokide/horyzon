<?php
include_once "connection.php";
if (isset($_POST['sno']) && $_POST['sno']) {
    if (filter_var($_POST['postedby'], FILTER_VALIDATE_EMAIL)) {
        if ($stmt = $mysqli->prepare("UPDATE events SET eventname = ?,eventdesc = ?,postedby = ? ,eventcost = ?,iscompleted = ? WHERE sno = ?")) {
            $stmt->bind_param("sssiii", $eventname, $eventdesc, $postedby, $eventcost, $eventstatus, $sno);
            $eventname = $_POST['eventname'];
            $eventdesc = $_POST['eventdesc'];
            $eventcost = $_POST['eventcost'];
            $eventstatus = $_POST['eventstatus'];
            $postedby = $_POST['postedby'];
            $sno = $_POST['sno'];
            $stmt->execute();
            $stmt->close();
            echo json_encode(["status" => 1, "msg" => "Event Updated Successfully"]);
        } else {
            echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
        }
    } else {
        echo json_encode(["status" => 0, "msg" => "Invalid Email"]);
    }
} else {
    if (filter_var($_POST['postedby'], FILTER_VALIDATE_EMAIL)) {
        if ($stmt = $mysqli->prepare("INSERT INTO events (eventname,eventdesc,postedby,eventcost) VALUES(?,?,?,?)")) {
            $stmt->bind_param("sssi", $eventname, $eventdesc, $postedby, $eventcost);
            $eventname = $_POST['eventname'];
            $eventdesc = $_POST['eventdesc'];
            $eventcost = $_POST['eventcost'];
            $postedby = $_POST['postedby'];
            $stmt->execute();
            $stmt->close();
            echo json_encode(["status" => 1, "msg" => "Event Added Successfully"]);
        } else {
            echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
        }
    } else {
        echo json_encode(["status" => 0, "msg" => "Invalid Email"]);
    }
}
?>