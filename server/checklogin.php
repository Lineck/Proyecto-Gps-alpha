<?php
include 'conexion2.php';

try{
 
    $sql="SELECT * FROM estudiante 
        WHERE EmailE =:email";
        
    $resultado=$db->prepare($sql);
    $email =$_POST['email'];
    $contraseña =$_POST['contrasenia'];
    $resultado->bindValue(":email", $email,PDO::PARAM_STR);
    $resultado->execute();
    $numero_registro=$resultado->rowCount();

    if($numero_registro!=0){
        
        $sql2="SELECT * FROM estudiante 
        WHERE EmailE =:email AND contraseniaE=:contrasenia";
        $resultado=$db->prepare($sql2);
        $resultado->bindValue(":email", $email,PDO::PARAM_STR);
        $resultado->bindValue(":contrasenia", $contraseña,PDO::PARAM_STR);
        $resultado->execute();
        $numero_registro2=$resultado->rowCount();

        if($numero_registro2!=0){

            $sql3="SELECT * FROM estudiante 
            WHERE (isEmailConfirmed =:isEmailConfirmed)AND(EmailE=:email)";
            $resultado=$db->prepare($sql3);
            $resultado->bindValue(":isEmailConfirmed",0,PDO::PARAM_STR);
            $resultado->bindValue(":email", $email,PDO::PARAM_STR);
            $resultado->execute();
            $numero_registro3=$resultado->rowCount();

            if ($numero_registro3!=0) {
                echo "4";
            }else {
                echo "1";
            }
            
        }else{
        
            echo "2";
        }

    }else{
       
        echo "3";
    }

   
}catch(Exception $e){
    echo $e;
}







 


?>