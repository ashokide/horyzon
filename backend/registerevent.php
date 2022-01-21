<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
include_once "connection.php";
session_start();
if (isset($_POST['eventno']) && $_POST['eventno'] && isset($_SESSION['username'])) {
    if ($stmt = $mysqli->prepare("SELECT * FROM events WHERE sno = ?")) {
        $stmt->bind_param("i", $eventno);
        $eventno = $_POST['eventno'];
        $stmt->execute();
        $stmt = $stmt->get_result();
        if ($stmt->num_rows == 0) {
            $stmt->close();
            echo json_encode(["status" => 0, "msg" => "Event Not Found"]);
        } else {
            $result = $stmt->fetch_row();
            $eventname = $result[1];
            $count = $result[5];
            $stmt->close();
            if ($stmt = $mysqli->prepare("SELECT * FROM registeredevents WHERE username = ? AND eventno = ?")) {
                $stmt->bind_param("si", $username, $eventno);
                $username = $_SESSION['username'];
                $eventno = $_POST['eventno'];
                $stmt->execute();
                $stmt = $stmt->get_result();
                if ($stmt->num_rows == 0) {
                    $stmt->close();
                    if ($stmt = $mysqli->prepare("INSERT INTO registeredevents (username,eventno,datetime) VALUES(?,?,now())")) {
                        $stmt->bind_param("si", $username, $eventno);
                        $username = $_SESSION['username'];
                        $eventno = $_POST['eventno'];
                        $stmt->execute();
                        $stmt->close();
                        if ($stmt = $mysqli->prepare("UPDATE events SET count = ? WHERE sno = ?")) {
                            $stmt->bind_param("ii", $count, $eventno);
                            $eventno = $_POST['eventno'];
                            $count++;
                            $stmt->execute();
                            $stmt->close();

                            echo json_encode(["status" => 1, "msg" => "Event Registered.Thanks For Registering 😊"]);
                        } else {
                            echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
                        }
                    } else {
                        echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
                    }
                } else {
                    echo json_encode(["status" => 0, "msg" => "Event Already Registered"]);
                }
            } else {
                echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
            }
        }
    } else {
        echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
    }
}
else{
    echo json_encode(["status" => 0, "msg" => "Try to Login/Signup First"]);
}
