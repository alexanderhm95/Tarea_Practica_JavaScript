<?php
	include('database.php');
	if (isset($_POST['id'])) {
		$name = $_POST['name'];
		$last_name = $_POST['last_name'];
		$id = $_POST['id'];
		$query = "UPDATE table_client SET name = '$name',last_name = '$last_name' WHERE id = '$id'";
		$resultado = mysqli_query($conexion, $query);

		if(!$resultado){
			die('sentencia ha fallado');
		}
		echo "Se Actualizó correctamente";
	}
?>