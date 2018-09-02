<?php
    session_start();

    $_SESSION["nombre"] = $_POST["email"];
    $_SESSION["tipo"] = $_POST["tipo"]; ;

    $Json_info = array(
        "nombre" => $_SESSION['nombre'],
        "tipo" => $_SESSION['tipo']
    );

    echo json_encode($Json_info, JSON_PRETTY_PRINT);
?>