$(document).ready(function() {
  $('#form-busqueda').submit(function(e) {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario
    var resultados = [];
    var titulo = $('#titulo').val();
    var genero = $('#genero').val();
    var autor = $('#autor').val();
    var dui = $('#dui').val();
    var mos = $('#mos').val();
    var chovo = $('#chovo').val();
    $.ajax({
      url: 'noticias/',
      success: function(data) {
        $(data).find('a').attr('href', function(i, val) {
          if (val.match(/\.html$/)) { // Solo buscamos archivos HTML
            $.ajax({
              url: 'noticias/' + val,
              success: function(htmlData) {
                var encontrado = true;
                $('meta[name="title"]', htmlData).each(function() {
                  if (titulo && $(this).attr('content').toLowerCase().indexOf(titulo.toLowerCase()) === -1) {
                    encontrado = false;
                    return false;
                  }
                });
                $('meta[name="genre"]', htmlData).each(function() {
                  if (genero && $(this).attr('content').toLowerCase() !== genero.toLowerCase()) {
                    encontrado = false;
                    return false;
                  }
                });
                $('meta[name="author"]', htmlData).each(function() {
                  if (autor && $(this).attr('content').toLowerCase().indexOf(autor.toLowerCase()) === -1) {
                    encontrado = false;
                    return false;
                  }
                });
                $('meta[name="lola"]', htmlData).each(function() {
                  if ((dui && $(this).attr('content') !== dui) || (mos && $(this).attr('content') !== mos) || (chovo && $(this).attr('content') !== chovo)) {
                    encontrado = false;
                    return false;
                  }
                });
                if (encontrado) {
                  resultados.push('<a href="' + val + '">' + val + '</a>');
                }
              },
              error: function() {
                $('#resultados').html('Error al cargar el archivo ' + val);
              }
            });
          }
        });
        setTimeout(function() {
          if (resultados.length > 0) {
            $('#resultados').html(resultados.join('<br>'));
          } else {
            $('#resultados').html('No se encontraron archivos');
          }
        }, 1000); // Espera 1 segundo para que se completen todas las búsquedas antes de mostrar los resultados
      },
      error: function() {
        $('#resultados').html('Error al cargar los archivos');
      }
    });
  });
});
