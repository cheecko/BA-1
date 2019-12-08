<?php
    header('Content-Type: application/json');
    require "../app/Data.php";

    $type = $_POST["type"];

    $album = new Data;
    $result = $album->getAlbum();
    if($type == "post") {
        $result.shuffle();
    }
    if($result) {
        $return["data"] = $result;
        $return["success"] = true;
    }else{
        $return["error_message"] = "No data is found!";
        $return["success"] = false;
    }
    
    echo json_encode($return);
?>