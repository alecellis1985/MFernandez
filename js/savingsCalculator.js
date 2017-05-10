(function () {
  $("#slider").slider({
    min: 1,
    max: 6,
    range: "min",
    value: 1,
    slide: function (event, ui) {
      console.log(ui.value - 1);
    }
  });

  var serv = {
    auto: emin,
    datos: datos,
    cantidadDeCargasDiarias: cantidadDeCargasDiarias,
    costoDeCarga: costoDeCarga,
    costosDiarios: costosDiarios,
    serviceAnuales: serviceAnuales,
    costoTotalServicio: costoTotalServicio,
    costoNaftaAnualService: costoNaftaAnualService,
    costoDiarioNafta: costoDiarioNafta,
    ahorroService: ahorroService,
    ahorroMensual: ahorroMensual,
    ahorroAnual: ahorroAnual,
    ahorroTotalServyNaft: ahorroTotalServyNaft
  };

  return serv;

  var emin = {
    rendXCarga: 100,
    cantCargasDiarias: 0.41,
    kwXhrXcarga: 10.80,
    precioKw: 4.5,
    serviceAnualesDur: 5000,
    costoServicio: 1800,
    recambioBatDur: 15000,
    recambioBatPrecio: 23200
  };

  var datos = {
    kmRecorridoXdia: 5,
    rendimientoNaftaXlt: 10,
    costoCombustible: 44,
    serviceAnuales: 1,
    costoPromedioService: 10000,
    diasAno: 365,
    diasMes: 30
  };

  function ahorroTotalServyNaft() {
    return ahorroAnual() + ahorroService();
  }

  function ahorroDiario() {
    return costosDiarios() - costoDiarioNafta();
  }

  function ahorroMensual() {
    ahorroDiario() * datos.diasMes;
  }

  function ahorroAnual() {
    return ahorroDiario() * datos.diasAno;
  }

  function ahorroService() {
    return costoTotalServicio() - costoNaftaAnualService();
  }

  function costoNaftaAnualService() {
    return datos.serviceAnuales * datos.costoPromedioService;
  }

  function costoDiarioNafta() {
    return datos.costoCombustible * datos.kmRecorridoXdia;
  }

  function cantidadDeCargasDiarias() {
    return datos.kmRecorridoXdia / emin.rendXCarga;
  }

  function cantidadKmsRecorridosAnual() {
    return datos.kmRecorridoXdia * datos.diasAno;
  }

  function costoDeCarga() {
    return emin.precioKw * emin.kwXhrXcarga;
  }

  function costosDiarios() {
    return costoDeCarga() * cantidadDeCargasDiarias();
  }
  function serviceAnuales() {
    datos.kmRecorridoXdia * datos.diasAno / emin.serviceAnualesDur;
  }

  function cantBatACambiar() {
    cantidadKmsRecorridosAnual() / emin.recambioBatDur;
  }

  function costoTotalServicio() {
    return serviciosAnuales() * emin.costoServicio + cantBatACambiar() * emin.recambioBatPrecio;
  }
})();