var savings_Serv = (function () {
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
    kmRecorridoXdia: 30,
    rendimientoNaftaXlt: 12,
    costoCombustible: 44,
    servAnuales: 1,
    costoPromedioService: 10000,
    diasAno: 365,
    diasMes: 30,
    anosSeleccionados: 5,
    usdBill: 28
  };

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
    ahorroTotalServyNaft: ahorroTotalServyNaft,
    cantBatACambiar: cantBatACambiar,
    kmAnuales: kmAnuales,
    toFixed0Nr: toFixed0Nr,
    getValorUsd: getValorUsd,
    ahorroTotalUsd: ahorroTotalUsd
  };

  return serv;

  function toFixed0Nr(nr) {
    return parseInt(nr.toFixed(2));
  }

  function ahorroTotalServyNaft() {
    return ahorroAnual() * datos.anosSeleccionados + ahorroService();
  }

  function ahorroDiario() {
    return costoDiarioNafta() - costosDiarios();
  }

  function ahorroMensual() {
    return ahorroDiario() * datos.diasMes;
  }

  function ahorroAnual() {
    return ahorroDiario() * datos.diasAno;
  }

  function ahorroService() {
    return costoNaftaAnualService() * datos.anosSeleccionados - costoTotalServicio() * datos.anosSeleccionados;
  }

  function costoNaftaAnualService() {
    return datos.servAnuales * datos.costoPromedioService;
  }

  function costoDiarioNafta() {
    return datos.costoCombustible * datos.kmRecorridoXdia / datos.rendimientoNaftaXlt;
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
    return datos.kmRecorridoXdia * datos.diasAno / emin.serviceAnualesDur;
  }

  function cantBatACambiar() {
    return cantidadKmsRecorridosAnual() / emin.recambioBatDur;
  }

  function costoTotalServicio() {
    return serviceAnuales() * emin.costoServicio + cantBatACambiar() * emin.recambioBatPrecio;
  }

  function kmAnuales() {
    return datos.kmRecorridoXdia * datos.diasAno;
  }

  function ahorroTotalUsd() {
    return ahorroTotalServyNaft() / datos.usdBill;
  }

  function getValorUsd() {
    return $.get("https://www.google.com/finance/converter?a=1&from=USD&to=UYU", function (data) {
      var startStr = '<span class=bld>';
      var startIndx = data.indexOf(startStr);
      var endIndx = data.indexOf('UYU</span>');
      datos.usdBill = parseFloat(data.substring(startIndx + startStr.length, endIndx));
    });
  }
})();