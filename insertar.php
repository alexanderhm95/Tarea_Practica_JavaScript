<?php
    include('database.php');
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $last_name = $_POST['last_name'];
        $query = "INSERT INTO table_client(name,last_name) VALUES ('$name', '$last_name')";
        $resultado = mysqli_query($conexion, $query);
        
        if(!$resultado){
            die('sentencia ha fallado');
            echo "Leegue al donde no ahi anda";
        }
            echo "Se registró correctamente";   
    }
?> 