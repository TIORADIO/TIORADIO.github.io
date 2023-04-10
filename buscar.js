function buscarNoticias() {
  // Recopilar información del formulario
  var titulo = $('#titulo').val();
  var genero = $('#genero').val();
  var autor = $('#autor').val();
  var dui = $('#dui').val();
  var mos = $('#mos').val();
  var chovo = $('#chovo').val();

  // Crear array de resultados
  var resultados = [];

  // Buscar en cada archivo HTML de la carpeta "noticias"
  $.ajax({
    url: 'noticias/',
    success: function(data) {
      $(data).find('a:contains(".html")').each(function() {
        var url = $(this).attr('href');
        $.ajax({
          url: 'noticias/' + url,
          dataType: 'html',
          success: function(data) {
            var encontrado = true;
            var metatags = $(data).filter('meta');
            metatags.each(function() {
              var name = $(this).attr('name');
              var content = $(this).attr('content');
              if (name == 'title' && contenidoNoCoincide(content, titulo)) {
                encontrado = false;
              }
              if (name == 'genre' && contenidoNoCoincide(content, genero)) {
                encontrado = false;
              }
              if (name == 'author' && contenidoNoCoincide(content, autor)) {
                encontrado = false;
              }
              if (name == 'lola' && contenidoNoCoincide(content, dui)) {
                encontrado = false;
              }
              if (name == 'lola' && contenidoNoCoincide(content, mos)) {
                encontrado = false;
              }
              if (name == 'lola' && contenidoNoCoincide(content, chovo)) {
                encontrado = false;
              }
            });
            if (encontrado) {
              resultados.push('<a href= noticias/' + url + '>' + url + '</a>');
            }
            // Mostrar resultados
            if (resultados.length > 0) {
              $('#resultados').html('<ul>' + resultados.join('') + '</ul>');
            } else {
              $('#resultados').html('No se encontraron archivos');
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            $('#resultados').html('Error: ' + errorThrown);
          }
        });
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('#resultados').html('Error: ' + errorThrown);
    }
  });
}

function contenidoNoCoincide(contenido, filtro) {
  return filtro !== '' && contenido.toLowerCase().indexOf(filtro.toLowerCase()) === -1;
}
