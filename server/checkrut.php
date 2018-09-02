<?php
include 'conexion2.php';
try{
    $sql="SELECT * FROM estudiante 
        WHERE RutE =:rut";

    $resultado=$db->prepare($sql);
    $rut =$_POST['rut'];
    $resultado->bindValue(":rut", $rut,PDO::PARAM_STR);
    $resultado->execute();
    $resultado->closeCursor();

    $numero_registro=$resultado->rowCount();

    if($numero_registro==0){
        echo "true";
    }else{       
        echo "false";  
    }

}catch(Exception $e){
    echo $e;
}