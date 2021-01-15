<?php

include('database.php');

if(isset($_POST['search'])) {
    
$search = $_POST['search'];
  $query = "SELECT * FROM table_client WHERE name LIKE '$search%'";
  $result = mysqli_query($conexion, $query);
  
  if(!$result) {
    die('Query Error' . mysqli_error($conexion));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'last_name' => $row['last_name'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

?>