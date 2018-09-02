<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
include 'conexion2.php';
require './vendor/autoload.php';
$str='qwertyuioasdfghjzxcvbnPOLIKUJYHTGVBNMCXQA1234567890!.@#$%&()=';
$str=str_shuffle($str);
$token=substr($str,0,10);
$mail = new PHPMailer(true);
try{

    $sql="INSERT INTO estudiante 
        VALUES (:rut,:nombre ,:email ,:contrasenia,:localidad,:apellido,:token,:isEmailConfirmed)";

    $resultado=$db->prepare($sql);
    $rut =$_POST['rut'];
    $nombre =$_POST['nombre'];
    $email =$_POST['email'];
    $contrasenia =$_POST['contrasenia'];
    $localidad =$_POST['localidad'];
    $apellido =$_POST['apellido'];
    
    $resultado->bindValue(":rut", $rut,PDO::PARAM_STR);
    $resultado->bindValue(":nombre", $nombre,PDO::PARAM_STR);
    $resultado->bindValue(":email", $email,PDO::PARAM_STR);
    $resultado->bindValue(":contrasenia", $contrasenia,PDO::PARAM_STR);
    $resultado->bindValue(":localidad", $localidad,PDO::PARAM_STR);
    $resultado->bindValue(":apellido", $apellido,PDO::PARAM_STR);
    $resultado->bindValue(":token", $token,PDO::PARAM_STR);
    $resultado->bindValue(":isEmailConfirmed", 0,PDO::PARAM_STR);

    $resultado->execute();

    $numero_registro=$resultado->rowCount();

    $mail->isSMTP();    
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'gps.grupocold@gmail.com';                 // SMTP username
    $mail->Password = 'grupocold123';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587 ;                                   // TCP port to connect to
    //Recipients
    $mail->setFrom('gps.grupocold@gmail.com', 'Gps-Mailer');
    $mail->addAddress($email,$nombre);     // Add a recipient

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = '
    
    <div style="font-family:verdana;font-size:0.9rem;color:#000000">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" id="m_6236698523000995862bodyTable" style="background-color:#ffffff" width="100%">
            <tbody>

		    <tr>

			<td align="center" valign="top">
            <table border="0" cellpadding="16" cellspacing="0" id="m_6236698523000995862emailContainer" style="width:640px;border:1px solid #111" width="640">

            <tbody>

            <tr style="background-color:#9c27b0">

            <td align="left" height="48" style="height:48px;padding:24px 0px 24px 16px" valign="middle">

            <p style="Margin:0rem!important;Margin-bottom:0rem!important;font-size:1.8rem;color:#ffffff;line-height:100%">Verificacion de Correo Tutorías Ubb</p>

            </td>

        </tr>

        <tr style="background-color:#fdfdfd">

            <td align="left" valign="top">

            <p>Hola!</p>

            <p>Alguien ha usado esta dirección de correo electrónico (<a href="'.$email.'" target="_blank">'.$email.'</a>) en <a href="https://www.TutoriasUbb.com" target="_blank" >TutoriasUbb</a> con Nombre , <b><i>'.$nombre.'</i></b>.</p>



            <p>&nbsp;</p>



            <center>Para finalizar el proceso de verificacion,<br>

            ingrese el siguiente codigo en la pagina:</center>

            &nbsp;



            <center style="font-size:1.7rem"><b>'.$token.'</b></center>



            <p>&nbsp;</p>

            </td>

        </tr>

    </tbody>

</table> 
</td>

		</tr>

	</tbody>

</table>
</div>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();

    if($numero_registro!=0){

        echo "true";

    }else{
       
        echo "false";
    }




    
}catch(Exception $e){
    echo $e;
}



?>