// obtener los datos del formulario
var titulo = document.getElementById('titulo').value;
var autor = document.getElementById('autor').value;
var dia = document.getElementById('dia').value;
var mes = document.getElementById('mes').value;
var anio = document.getElementById('anio').value;
var genero = document.getElementById('genero').value;

// definir la ruta de la carpeta con las noticias
var carpeta = 'noticias/';

// obtener una lista de los archivos HTML en la carpeta
var archivos = [  'noticias/noticia1.html',  'noticias/noticia2.html',  'noticias/noticia3.html'];

// crear una tabla para mostrar los resultados
var resultados_encontrados = false;
var tabla_resultados = document.createElement('table');
var fila_encabezado = document.createElement('tr');
var encabezados = ['Título', 'Autor', 'Fecha', 'Género'];
for (var i = 0; i < encabezados.length; i++) {
  var celda_encabezado = document.createElement('th');
  celda_encabezado.textContent = encabezados[i];
  fila_encabezado.appendChild(celda_encabezado);
}
tabla_resultados.appendChild(fila_encabezado);

for (var i = 0; i < archivos.length; i++) {
  // leer los metatags del archivo HTML
  var xhr = new XMLHttpRequest();
  xhr.open('GET', archivos[i], false);
  xhr.send();
  var metatags = parsear_meta_tags(xhr.responseText);

  // obtener el día, mes y año del metatag
  var fecha_metatag = new Date(metatags['date']);
  var dia_metatag = fecha_metatag.getDate();
  var mes_metatag = fecha_metatag.getMonth() + 1;
  var anio_metatag = fecha_metatag.getFullYear();

  // verificar si el archivo coincide con los criterios de búsqueda
  if (
    (titulo == '' || metatags['title'].toLowerCase().indexOf(titulo.toLowerCase()) != -1) &&
    (autor == '' || metatags['author'].toLowerCase().indexOf(autor.toLowerCase()) != -1) &&
    (dia == '' || dia_metatag == dia) &&
    (mes == '' || mes_metatag == mes) &&
    (anio == '' || anio_metatag == anio) &&
    (genero == '' || metatags['genre'].toLowerCase() == genero.toLowerCase())
  ) {
    // mostrar los datos en la tabla
    var fila = document.createElement('tr');
    var celda_titulo = document.createElement('td');
    var enlace = document.createElement('a');
    enlace.href = archivos[i];
    enlace.textContent = metatags['title'];
    celda_titulo.appendChild(enlace);
    fila.appendChild(celda_titulo);
    var celda_autor = document.createElement('td');
    celda_autor.textContent = metatags['author'];
    fila.appendChild(celda_autor);
    var celda_fecha = document.createElement('td');
    celda_fecha.textContent = metatags['date'];
    fila.appendChild(celda_fecha);
    var celda_genero = document.createElement('td');
    celda_genero.textContent = metatags['genre'];
    fila.appendChild(celda_genero);
    tabla_resultados.appendChild(fila);
    resultados_encontrados = true;
  }
}

if (!resultados_encontrados) {
  window.location.href = 'https://www.volveralahemeroteca.com';
} else {
  document.body.appendChild(tabla_resultados);
}

