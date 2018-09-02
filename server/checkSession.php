<?php

    session_start();
    
   if(isset($_SESSION['nombre']) && isset($_SESSION['rut'])){
       $Json_info = array(
           "nombre" => $_SESSION['nombre'],
           "rut" => $_SESSION['rut']
       );

       echo json_encode($Json_info, JSON_PRETTY_PRINT);
   }else{
        $Json_info = array(
            "nombre" => "",
            "rut" => ""
        );

        echo json_encode($Json_info, JSON_PRETTY_PRINT);
   }

?>