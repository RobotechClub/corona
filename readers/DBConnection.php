<?php
   $username="202953";
   $password="Dtp@123456";
   $database="robotechclub_corona";
   $servername="mysql-robotechclub.alwaysdata.net";
 
   $con= mysqli_connect($servername, $username, $password, $database);
  if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);

       
   }

?>
