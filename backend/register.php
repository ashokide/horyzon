<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
include_once "connection.php";
if (isset($_POST['username']) && $_POST['username'] && isset($_POST['password']) && $_POST['password'] && isset($_POST['email']) && $_POST['email']) {
    if ($stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ?")) {
        $stmt->bind_param("s", $username);
        $username = $_POST['username'];
        $stmt->execute();
        $stmt = $stmt->get_result();
        if ($stmt->num_rows == 0) {
            $stmt->close();
            if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                if ($stmt = $mysqli->prepare("INSERT INTO users (username,password,email) VALUES(?,?,?)")) {
                    $stmt->bind_param("sss", $username, $password, $email);
                    $username = $_POST['username'];
                    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $email = $_POST['email'];
                    $stmt->execute();
                    session_start();
                    $_SESSION["username"] = $username;
                    echo json_encode(["status" => 1, "msg" => "User Registered"]);
                } else {
                    echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
                }
            } else {
                echo json_encode(["status" => 0, "msg" => "Invalid Email"]);
            }
        } else {
            echo json_encode(["status" => 0, "msg" => "Username already exists"]);
        }
    } else {
        echo json_encode(["status" => 0, "msg" => "Error in preparing statement"]);
    }
}
