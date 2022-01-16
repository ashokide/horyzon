<?php
    session_start();
    if(isset($_SESSION['username'])){
        echo json_encode(["status"=>1,"username"=>$_SESSION['username']]);
    }
    else if(isset($_SESSION['adminname'])){
        echo json_encode(["status"=>2,"adminname"=>$_SESSION['adminname']]);
    }
    else{
        echo json_encode(["status"=>0]);
    }
?>