<?php
    include_once "connection.php";
    $users = array();
    if ($result = mysqli_query($mysqli,'SELECT events.eventname,registeredevents.username,registeredevents.datetime FROM events INNER JOIN registeredevents ON events.sno=registeredevents.eventno')) {
        if($result->num_rows > 0){
            while($data = mysqli_fetch_assoc($result)){
                array_push($users,$data);
            }
            echo json_encode(["data"=>$users]);
        }
        else{
            echo json_encode(["data"=>"No Users Available"]);
        }
    }
    else{
        echo json_encode(["data"=>"No Users Available"]);
    }
