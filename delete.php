<?php
include('database.php');

if(isset($_POST['id'])) {
  $id = $_POST['id'];
  $query = "DELETE FROM table_client WHERE id = $id";
  $resultado = mysqli_query($conexion, $query);

		if(!$resultado){
      die('Query Failed.');
		}
    echo "Eliminado correctamente";  
    $result = mysqli_query($connection, $query);

 

}
?>