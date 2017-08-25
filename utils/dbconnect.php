<?php
$mysqli = new mysqli('localhost', 'root', '', 'browserextension');

//mysqli_real_escape_string makes it save for sql injection attacks
//need to pass the connection as first argument
$dbHandle = mysqli_real_escape_string($mysqli, $_POST['data']);

if (mysqli_connect_errno()) {
  die('Please start mysql server, its not responding');
    // echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
//can you hear me?
//ok
//I understand what you are doing. that is great and very helpful to see you doing this
// i have chinese lesson now. can we continue this in about 2.5 hours?
//great. i will write you when i fann_set_activation_steepness_hidde
// thanks a lot. see you soon :)
function runQuery($query, $handle){
     $mysqli->query($query)
}

//this function will get data and filter all the sql injection hacks
function filterSqlHacks($data, $handle){
  mysqli_real_escape_string($handle, $_POST['data']);
}


function sendJsonTOJavascript($data){
  header('Content-Type: application/json');
  echo json_encode($data);
  die();
}



 // "Connected successfully to mySQL Server" . '<br>,<br>';
 ?>
