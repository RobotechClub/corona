<?php

$resultArray = array();
$messagesArr = array();


if (($handle = fopen("https://robotech-corona.000webhostapp.com/assets/MESSAGES.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $obj = new \stdClass();
        $obj->message = $data[1];
        $obj->lang = $data[2];
        array_push($messagesArr, $obj);
    }
    fclose($handle);
}

if (($handle = fopen("https://robotech-corona.000webhostapp.com/assets/QUESTIONS.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $obj = new \stdClass();
        $obj->question = $data[1];
        $obj->score = $data[2];
        $obj->lang = $data[3];

        array_push($resultArray, $obj);
    }
    fclose($handle);
}

$objContainer = new \stdClass();
$objContainer->questionArr = $resultArray;
$objContainer->messagesArr = $messagesArr;


echo json_encode($objContainer)."\n";

?>