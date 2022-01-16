<?php
    include_once "connection.php";
    $events = array();
    if ($result = mysqli_query($mysqli,"select * from events")) {
        if($result->num_rows > 0){
            while($data = mysqli_fetch_array($result)){
                array_push($events,$data);
            }
            echo json_encode(["data"=>$events]);
        }
        else{
            echo json_encode(["data"=>"No Events Available"]);
        }
    }
    else{
        echo json_encode(["data"=>"No Events Available"]);
    }
?>
