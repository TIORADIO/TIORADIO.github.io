<?php
if(isset($_POST['submit'])) {

    // Recuperar los datos del formulario
    $texto = $_POST['texto'];
    $fecha = $_POST['fecha'];

    // Recuperar la imagen subida y guardarla en la carpeta 'noticias/fecha/'
    $carpeta = 'noticias/' . $fecha . '/';
    if (!file_exists($carpeta)) {
        mkdir($carpeta, 0777, true);
    }
    $nombre_imagen = $_FILES['imagen']['name'];
    $ruta_imagen = $carpeta . $nombre_imagen;
    move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_imagen);

    // Copiar el archivo 'plantilla.html' en la carpeta 'noticias/fecha/'
    $ruta_plantilla = 'plantilla/plantilla.html';
    $contenido_plantilla = file_get_contents($ruta_plantilla);
    $contenido_plantilla = str_replace('hola', $texto, $contenido_plantilla);
    $contenido_plantilla = str_replace('img.jpg', $nombre_imagen, $contenido_plantilla);
    $ruta_destino = $carpeta . 'noticia.html';
    file_put_contents($ruta_destino, $contenido_plantilla);

    // Copiar el archivo 'plantillaestilos.css' en la carpeta 'noticias/fecha/'
    $ruta_plantilla_css = 'plantilla/plantillaestilos.css';
    $ruta_destino_css = $carpeta . 'plantillaestilos.css';
    copy($ruta_plantilla_css, $ruta_destino_css);

    // Redirigir a la página principal
    header('Location: index.html');
    exit();
}
?>
