$(function(){

    function siRespuesta(r)
    {
        // Crear HTML con las respuestas del servidor que vienen en json
        if(r.type === 'message')
        {
            mostrarRespuesta(r.text, 'ok');
            $('form')[0].reset();
        }
        if(r.type === 'error')
        {
            mostrarRespuesta(r.text, 'err');
        }
    }

    function siError(e)
    {
        mostrarRespuesta('Ocurrió un error al realizar la petición: ' + e.statusText, 'err');
    }

    function peticion(e)
    {
        e.preventDefault();

        if(estanTodosLosDatos())
        {
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
        else
        {
            mostrarRespuesta('Faltan datos obligatorios para enviar el mensaje', 'err');
        }
    }

    $('#submit').click(peticion);

    //funciones auxiliares
    function estanTodosLosDatos()
    {
        if($('#userName').val().trim().length > 0 && $('#userEmail').val().trim().length > 0 && $('#userMessage').val().trim().length > 0 && $('#tel').val().trim().length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    function mostrarRespuesta(texto_mostrar, tipo)
    {
        if(tipo === 'err')
        {
            $('#resp').html( texto_mostrar);
        }
        else
        {
            $('#resp').html( texto_mostrar );
        }

        $('#resp').removeClass('animated bounceOut');
        $('#resp').addClass('animated bounceIn');
        setTimeout(function(){
            $('#resp').removeClass('animated bounceIn');
            $('#resp').addClass('animated bounceOut');
        }, 5000);
    }

});
