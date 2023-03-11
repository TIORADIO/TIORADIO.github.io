<?php
if(isset($_POST['submit'])){
    $to = "porlavidabolivia@gmail.com"; // Cambiar por tu correo electrónico
    $subject = "Nuevo mensaje desde el formulario de contacto";
    $message = "Nombre completo: " . $_POST['name'] . "\r\n";
    $message .= "Correo electrónico: " . $_POST['email'] . "\r\n";
    $message .= "Mensaje: " . $_POST['message'];
    $headers = "From: webmaster@tusitio.com" . "\r\n";
    $headers .= "Reply-To: " . $_POST['email'] . "\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

    if(mail($to, $subject, $message, $headers)){
        echo "enviado correctamente";
    }
    else{
        echo "error al enviar";
    }
}
?>
