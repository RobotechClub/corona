<?php
    require __DIR__ . '/vendor/autoload.php';

    $client = new Google_Client();
    $client->setApplicationName('COVID-19');
    $client->setScopes(Google_Service_Sheets::SPREADSHEETS);
    $client->setAuthConfig('credentials.json');
    $client->setAccessType('offline');

    $service = new Google_Service_Sheets($client);
    $spreadsheetId = "1KHio7aq2eEk_tpnaFebX2Mp2O4qaQ3QDx4e6DDSdjLs";
    $range = 'A:G';
    $spreadSheet = $service->spreadsheets->get($spreadsheetId);
    $sheets = $spreadSheet->getSheets();

    $resultArray = [];    
        
    foreach($sheets as $s) {
        $sheet_name = $s['properties']['title'];
        $values =  $service->spreadsheets_values->get($spreadsheetId, $sheet_name)->getValues();
        $arr = array();
        $messagesArr = array();

        foreach ($values as $row) {
            $obj = new \stdClass();;
            $obj->question = $row[0];
            $obj->score = $row[1];
            if(!empty($row[2])){
                array_push($messagesArr, $row[2]);
            }
          
            if(!empty($row[4])){
                $obj->yes = $row[4];
            }

            if(!empty($row[5])){
                $obj->no = $row[5];
            }
            

            array_push($arr, $obj);

            }
            $objContainer = new \stdClass();
            $objContainer->sheetName = $sheet_name;
            $objContainer->questionArr = $arr;
            $objContainer->messagesArr = $messagesArr;

            array_push($resultArray, $objContainer);
        }
       
      /*   $result = new \stdClass();
        $result->data = $resultArray; */
        echo json_encode($resultArray)."\n";
    
    ?>