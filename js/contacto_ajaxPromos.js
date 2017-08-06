$(function () {
    $('#submit').click(peticion);

    function siRespuesta(r) {
        // Crear HTML con las respuestas del servidor que vienen en json
        if (r.type === 'message') {
            fbq('track', 'CompleteRegistration', {
                value: 25.00,
                currency: 'USD'
            });
            $.toaster({ message: r.text, title: 'OK', priority: 'success', settings: { 'timeout': 2500 } });
            $('form')[0].reset();
        }
        if (r.type === 'error')
        {
            $.toaster({ message: r.text, title: 'Error', priority: 'danger', settings: { 'timeout': 2500} });
        }
    }

    function siError(e) {
        $.toaster({ message: 'Ocurrió un error al realizar la petición: ' + e.statusText, title: 'Error', priority: 'danger' });
    }

    function peticion(e) {
        e.preventDefault();
        if (!estanTodosLosDatos()) {
            $.toaster({ message: 'Faltan datos obligatorios para enviar el mensaje', title: 'Error', priority: 'danger', settings: { 'timeout': 2500 } });
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
        return isDataCorrect($('#userName'))
            && isDataCorrect($('#userEmail'))
            && isDataCorrect($('#userMessage'))
            && isDataCorrect($('#tel'));
    }

    function isDataCorrect(input) {
        return input.val().trim().length > 0;
    }
});
