<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    include('conexion.php');

    try{

        $Json_info = [];

        $sql = 'SELECT * FROM clase';

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result_class = $stmt->fetchAll();

        $i=0;

        for($i=0;$i<sizeof($result_class);$i++){
            
            $sql = 'SELECT NombreT,ApellidosT,PerfilT FROM tutor WHERE RutT="'.$result_class[$i]['RutT'].'"';

            $stmt = $db->prepare($sql);
            $stmt->execute();
            $result_tutor = $stmt->fetch();

            $Json_info[$i] = array(
                'idClase' => $result_class[$i]['idClase'],
                'Materia' => $result_class[$i]['Materia'],
                'Titulo' => $result_class[$i]['Titulo'],
                'Descripcion' => $result_class[$i]['Descripcion'],
                'fecha' => $result_class[$i]['fecha'],
                'NombreT' => $result_tutor['NombreT'],
                'ApellidosT' => $result_tutor['ApellidosT'],
                'PerfilT' => $result_tutor['PerfilT']
            );
        }

        $Json_info = array_reverse($Json_info);
        echo json_encode($Json_info, JSON_PRETTY_PRINT);
        
    }catch(Exception $e){
        echo $e;
    }
    
?>