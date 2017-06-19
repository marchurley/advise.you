<pre><?php

  //server, user, password & database
  $mysqli = new mysqli('localhost', 'root', '', 'browserextension');

  //mysqli_real_escape_string makes it save for sql injection attacks
  //need to pass the connection as first argument
  $advice = mysqli_real_escape_string($mysqli, $_POST['advice']);

  //If attackers don't submit a submitSend value (check by !isset), then it will appear everything is right with the echo message, but afterwards die
  if (!isset($_POST['submitSend'])) {
      echo "Thank you for your submission";
      die();
  };

  if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  echo "Connected successfully to mySQL Server" . '<br>,<br>';


  // Perform queries
  $sql = "INSERT INTO advice (advice) VALUES ('$advice')";

  if ($mysqli->query($sql) === true) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $mysqli->error;
  }

  $mysqli->close();


 ?>
 </pre>



 <!--
I can test form submission with this
//<pre><?php

  //var_dump($_POST);

 ?>
 </pre>
https://www.youtube.com/watch?v=tt3rB8tocP8&index=39&list=PLYxzS__5yYQlWil-vQ-y7NR902ovyq1Xi

-->
