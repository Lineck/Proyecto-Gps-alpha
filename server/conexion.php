<?php

    class Conexion{


		public function Conexion(){

			$db_host = 'localhost';
			$db_user = 'root';//'C6';
			$db_password = '';
			$db_nombre = 'gps';

			try{
                $this->conexion_db = new PDO('mysql:host='.$db_host.';dbname='.$db_nombre, $db_user, $db_password);
                
			}catch(Exception $e){
				echo "Conexion fallida";
			}
        }
    }
?>