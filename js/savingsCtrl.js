/* global savings_Serv */

(function (savings_Serv) {
  $("#kmsNafta").slider({
    min: 1,
    max: 500,
    range: "min",
    value: savings_Serv.datos.kmRecorridoXdia,
    slide: function (event, ui) {
      savings_Serv.datos.kmRecorridoXdia = ui.value - 1;
      $('#kmsxdia').text(savings_Serv.datos.kmRecorridoXdia);
      actualizarDatos();
    }
  });

  $("#tiempoUso").slider({
    min: 1,
    max: 100,
    range: "min",
    value: savings_Serv.datos.anosSeleccionados,
    slide: function (event, ui) {
      savings_Serv.datos.anosSeleccionados = ui.value - 1;
      $('#tiempoUsoNr').text(savings_Serv.datos.anosSeleccionados);
      $('#tiempoUsoNr2').text(savings_Serv.datos.anosSeleccionados);
      actualizarDatos();
    }
  });

  $('#costoCombustible,#rendimientoNaftaXlt,#servAnuales,#costoPromedioService').on('change', function () {
    savings_Serv.datos[this.id] = this.value;
    actualizarDatos();
  });

  init();

  function init() {
    //get val of usd bill from google
    savings_Serv.getValorUsd().then(function () {
      $('#ahorroTotalServyNaftUsd').val(savings_Serv.toFixed0Nr(savings_Serv.ahorroTotalUsd()));
    });

    //set data
    setupEminData();
    setupNaftaData();
    actualizarDatos();
  }

  function setupEminData() {
    $('#rendXCarga').val(savings_Serv.auto.rendXCarga);
    $('#precioKw').val(savings_Serv.auto.precioKw);
    $('#costoServicio').val(savings_Serv.auto.costoServicio);
    $('#recambioBatPrecio').val(savings_Serv.auto.recambioBatPrecio);
  }

  function setupNaftaData() {
    $('#kmsxdia').text(savings_Serv.datos.kmRecorridoXdia);
    $('#costoCombustible').val(savings_Serv.datos.costoCombustible);
    $('#rendimientoNaftaXlt').val(savings_Serv.datos.rendimientoNaftaXlt);
    $('#servAnuales').val(savings_Serv.datos.servAnuales);
    $('#tiempoUsoNr').text(savings_Serv.datos.anosSeleccionados);
    $('#tiempoUsoNr2').text(savings_Serv.datos.anosSeleccionados);
    $('#costoPromedioService').val(savings_Serv.datos.costoPromedioService);
  }

  function actualizarDatos() {
    $('#costoDeCarga').val(savings_Serv.toFixed0Nr(savings_Serv.costoDeCarga()));
    $('#serviceAnuales').val(savings_Serv.toFixed0Nr(savings_Serv.serviceAnuales()));
    $('#cantBatACambiar').val(savings_Serv.toFixed0Nr(savings_Serv.cantBatACambiar()));
    $('#costoTotalServicio').val(savings_Serv.toFixed0Nr(savings_Serv.costoTotalServicio()));
    $('#ahorroMensual').val(savings_Serv.toFixed0Nr(savings_Serv.ahorroMensual()));
    $('#ahorroAnual').val(savings_Serv.toFixed0Nr(savings_Serv.ahorroAnual()));
    $('#ahorroTotalServyNaft').val(savings_Serv.toFixed0Nr(savings_Serv.ahorroTotalServyNaft()));
    $('#ahorroService').val(savings_Serv.toFixed0Nr(savings_Serv.ahorroService()));
    $('#kmAnualesnf').text(savings_Serv.toFixed0Nr(savings_Serv.kmAnuales()));
    $('#kmAnualesem').text(savings_Serv.toFixed0Nr(savings_Serv.kmAnuales()));
    $('#ahorroTotalServyNaftUsd').val(savings_Serv.toFixed0Nr(savings_Serv.ahorroTotalUsd()));
  }

})(savings_Serv);
