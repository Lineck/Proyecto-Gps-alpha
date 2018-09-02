<?php
    require 'Clase.php';

    try{
        $clase = new Clase();

        $Json_info = $clase->MostrarTabla();

        echo json_encode($Json_info, JSON_PRETTY_PRINT);

    }catch(Exception $e){

        $error = array (
            "Error" => $e
        );

        echo json_encode($error, JSON_PRETTY_PRINT);
    }
    
?>