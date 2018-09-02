<?php
include 'conexion2.php';
try{

    $sql="SELECT * FROM estudiante 
        WHERE token =:token";

    $resultado=$db->prepare($sql);

    $token =$_POST['token'];
   
    
 
    $resultado->bindValue(":token", $token,PDO::PARAM_STR);
    $resultado->execute();
    $resultado->closeCursor();

    $numero_registro=$resultado->rowCount();

    if($numero_registro!=0){

        $sql2="UPDATE estudiante SET isEmailConfirmedE = :isEmailConfirmedE";
        $resultado=$db->prepare($sql2);
        $resultado->bindValue(":isEmailConfirmedE",1,PDO::PARAM_STR);
        $resultado->execute();
        
        echo "true";

    }else{
       
        echo "false";
    }

}catch(Exception $e){
    echo $e;
}

?>