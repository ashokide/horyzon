<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
include_once "connection.php";
if (isset($_POST['username']) && $_POST['username'] && isset($_POST['password']) && $_POST['password']) {
    if ($stmt = $mysqli->prepare("SELECT * FROM admin WHERE username = ?;")) {
        $stmt->bind_param("s", $username);
        $username = $_POST['username'];
        $stmt->execute();
        $stmt = $stmt->get_result();
        if ($stmt->num_rows == 0) {
            $stmt->close();
            echo json_encode(["status" => 0, "msg" => "User Not Found / Invalid Username"]);
        } else {
            if ($_POST['password'] === $stmt->fetch_assoc()['password']) {
                session_start();
                $_SESSION["adminname"] = $username;
                echo json_encode(["status" => 1, "msg" => "Logged In Successfully"]);
            } else {
                echo json_encode(["status" => 0, "msg" => "Invalid Password"]);
            }
        }
    } else {
        echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
    }
}
?>