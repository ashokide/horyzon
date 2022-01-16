<?php
    session_start();
    if(isset($_SESSION['username']) || isset($_SESSION['adminname'])){
        session_unset();
        session_destroy();
        echo json_encode(["status"=>1,"msg"=>"Logged Out Successfully"]);
    }
?>