<?php

$resultArray = array();
$messagesArr = array();

$serverUrl = "https://robotech-corona.000webhostapp.com/";

if (($handle = fopen("../assets/MESSAGES.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $obj = new \stdClass();
        $obj->message = $data[1];
        $obj->lang = $data[2];
        array_push($messagesArr, $obj);
    }
    fclose($handle);
}

if (($handle = fopen("../assets/QUESTIONS.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $obj = new \stdClass();
        $obj->score = $data[0];
        $obj->question = $data[1];
        $obj->lang = $data[2];

        array_push($resultArray, $obj);
    }
    fclose($handle);
}

$objContainer = new \stdClass();
$objContainer->questionArr = $resultArray;
$objContainer->messagesArr = $messagesArr;


echo json_encode($objContainer)."\n";

?>