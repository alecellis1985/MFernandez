$(function () {
  $('#submit').click(peticion);

  function siRespuesta(r) {
    // Crear HTML con las respuestas del servidor que vienen en json

    if (r.type === 'message') {
      mostrarRespuesta(r.text, 'ok');
      $('form')[0].reset();
    }
    if (r.type === 'error')
    {
      mostrarRespuesta(r.text, 'err');
    }
  }

  function siError(e) {
    mostrarRespuesta('Ocurrió un error al realizar la petición: ' + e.statusText, 'err');
  }

  function peticion(e) {
    e.preventDefault();
    if (!estanTodosLosDatos()) {
      mostrarRespuesta('Faltan datos obligatorios para enviar el mensaje', 'err');
      return false;
    }
    // Realizar la petición
    var parametros = {
      userName: $('#userName').val(),
      userEmail: $('#userEmail').val(),
      tel: $('#tel').val(),
      userMessage: $('#userMessage').val()
    };

    var post = $.post("contacto_formulario.php", parametros, siRespuesta, 'json');
    /* Registrar evento de la petición (hay mas)       
     (no es obligatorio implementarlo, pero es muy recomendable para detectar errores) */
    post.error(siError); // Si ocurrió un error al ejecutar la petición se ejecuta "siError"

  }

  function estanTodosLosDatos() {
    return isDataCorrect($('#userName')) && isDataCorrect($('#userEmail')) && isDataCorrect($('#userMessage')) && isDataCorrect($('#tel'));
  }

  function isDataCorrect(input) {
    return input.val().trim().length > 0;
  }

  function mostrarRespuesta(texto_mostrar, tipo) {
    $('#resp').html(texto_mostrar);
    $('#resp').removeClass('animated bounceOut');
    $('#resp').addClass('animated bounceIn');
    setTimeout(function () {
      $('#resp').removeClass('animated bounceIn');
      $('#resp').addClass('animated bounceOut');
    }, 5000);
  }
});
