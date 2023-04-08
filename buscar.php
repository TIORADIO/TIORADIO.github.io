<?php
  // obtener los datos del formulario
  $titulo = $_GET['titulo'];
  $autor = $_GET['autor'];
  $dia = $_GET['dia'];
  $mes = $_GET['mes'];
  $anio = $_GET['anio'];
  $genero = $_GET['genero'];

  // definir la ruta de la carpeta con las noticias
  $carpeta = 'noticias/';

  // obtener una lista de los archivos HTML en la carpeta
  $archivos = glob($carpeta . '*.html');

  // crear una tabla para mostrar los resultados
  $resultados_encontrados = false;
  foreach ($archivos as $archivo) {
    // leer los metatags del archivo HTML
    $metatags = get_meta_tags($archivo);

    // obtener el día, mes y año del metatag
    $fecha_metatag = strtotime($metatags['date']);
    $dia_metatag = date('d', $fecha_metatag);
    $mes_metatag = date('m', $fecha_metatag);
    $anio_metatag = date('Y', $fecha_metatag);

    // verificar si el archivo coincide con los criterios de búsqueda
    if (
      (empty($titulo) || stripos($metatags['title'], $titulo) !== false) &&
      (empty($autor) || stripos($metatags['author'], $autor) !== false) &&
      (empty($dia) || stripos($metatags['date'], $dia) !== false) &&
      (empty($mes) || stripos($metatags['date'], $mes) !== false) &&
      (empty($anio) || stripos($metatags['date'], $anio) !== false) &&
      (empty($genero) || $metatags['genre'] == $genero)
    ) {
      // mostrar los datos en la tabla
      if (!$resultados_encontrados) {
        echo '<table>';
        echo '<tr><th>Título</th><th>Autor</th><th>Fecha</th><th>Género</th></tr>';
        $resultados_encontrados = true;
      }
      echo '<tr>';
      echo '<td><a href="' . $archivo . '">' . $metatags['title'] . '</a></td>';
      echo '<td>' . $metatags['author'] . '</td>';
      echo '<td>' . $metatags['date'] . '</td>';
      echo '<td>' . $metatags['genre'] . '</td>';
      echo '</tr>';
    }
  }

  if (!$resultados_encontrados) {
    header('Location: https://www.volveralahemeroteca.com');
    exit();
  } else {
    echo '</table>';
  }
?>
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet">
  <meta charset="utf-8">
  <title>Mi página web</title>
   <style>
   /* Estilos generales */
body {
  background-color: #171717;
  color: #FFF;
  font-family: 'Noto Sans', sans-serif;
}

a {
  color: #FFF;
}

/* Estilos de la tabla */
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #222;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #444;
  color: #FFF;
}

tr:hover {
  background-color: #333;
  cursor: pointer;
}

tr:hover a {
  color: #FF0101;
}

/* Estilos del botón */
.boton {
  background-color: #FF0101;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  text-decoration: none;
  display: inline-block;
}

.boton:hover {
  background-color: darkred;
}

  </style>
</head>
<body>

</body>
</html>
