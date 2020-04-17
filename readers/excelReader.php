<?php

require_once 'SimpleXLSX.php';

if ( $xlsx = SimpleXLSX::parse('assets/Questions.xlsx') ) {

	$resultArray = [];    
	$sheetNames = $xlsx->sheetNames();

	for($i=0; $i<= count($sheetNames) -1 ; $i++){
		$values = $xlsx->rows($i);
		$arr = array();
        $messagesArr = array();

        foreach ($values as $row) {
            $obj = new \stdClass();;
            $obj->question = $row[0];
            $obj->score = $row[1];
            if(!empty($row[2])){
                array_push($messagesArr, $row[2]);
            }
          
            array_push($arr, $obj);
			}
			
            $objContainer = new \stdClass();
            $objContainer->sheetName = $sheetNames[$i];
            $objContainer->questionArr = $arr;
            $objContainer->messagesArr = $messagesArr;

            array_push($resultArray, $objContainer);
        }
       
        echo json_encode($resultArray)."\n";
}


?>