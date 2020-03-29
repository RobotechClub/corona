<?php
require_once 'DBConnection.php';

$sql = "SELECT * FROM QUESTIONS";
$sqlMessages = "SELECT * FROM MESSAGES";

$resultArray = array();
$messagesArr = array();

if($resultMsg = mysqli_query($con, $sqlMessages)){
    if(mysqli_num_rows($resultMsg) > 0){
    while($row = mysqli_fetch_array($resultMsg)){
    $obj = new \stdClass();
    $obj->message = $row["MESSAGE"];
    $obj->lang = $row["LANGUAGE"];
    array_push($messagesArr, $obj);
        }
    }
}

if($result = mysqli_query($con, $sql)){
    if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_array($result)){
    $obj = new \stdClass();
    $obj->question = $row["QUESTION"];
    $obj->score = $row["QUESTION_NUMBER"];
    $obj->lang = $row["LANGUAGE"];

    array_push($resultArray, $obj);
        }
    }
}

$objContainer = new \stdClass();
$objContainer->questionArr = $resultArray;
$objContainer->messagesArr = $messagesArr;


echo json_encode($objContainer)."\n";

?>