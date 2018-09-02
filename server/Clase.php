<?php
    require 'conexion.php';

    class Clase extends Conexion{

        public function Clase(){
            parent::__construct();
        }

        public function Buscar($clase){

            try{
                $idclase = $clase;

                $sql = 'SELECT * FROM clase WHERE idClase="'.$idclase.'"';

                $stmt = $this->conexion_db->prepare($sql);
                $stmt->execute();
                $result_class = $stmt->fetch();
                    
                $sql = 'SELECT NombreT,ApellidosT,PerfilT FROM tutor WHERE RutT="'.$result_class['RutT'].'"';

                $stmt = $this->conexion_db->prepare($sql);
                $stmt->execute();
                $result_tutor = $stmt->fetch();

                $Json_info = array(
                    'idClase' => $result_class['idClase'],
                    'Materia' => $result_class['Materia'],
                    'Titulo' => $result_class['Titulo'],
                    'Descripcion' => $result_class['Descripcion'],
                    'Fecha' => $result_class['fecha'],
                    'NombreT' => $result_tutor['NombreT'],
                    'ApellidosT' => $result_tutor['ApellidosT'],
                    'PerfilT' => $result_tutor['PerfilT']
                );

                return $Json_info;

            }catch(Exception $e){
                $error = array (
                    "Error" => $e
                );
                return $error;
            }
        }

        public function MostrarTabla(){
            try{

                $Json_info = [];
        
                $sql = 'SELECT * FROM clase';
        
                $stmt = $this->conexion_db->prepare($sql);
                $stmt->execute();
                $result_class = $stmt->fetchAll();
        
                $i=0;
        
                for($i=0;$i<sizeof($result_class);$i++){
                    
                    $sql = 'SELECT NombreT,ApellidosT,PerfilT FROM tutor WHERE RutT="'.$result_class[$i]['RutT'].'"';
        
                    $stmt = $this->conexion_db->prepare($sql);
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
                return $Json_info;
                
            }catch(Exception $e){
                return $e;
            }
        }
    }
?>