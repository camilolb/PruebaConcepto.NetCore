
// Metodos jquery

(function ($) {

    var app = angular.module('pruebaTecnica');

    $.fn.datepicker.dates['es'] = {
        days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: "Hoy",
        monthsTitle: "Meses",
        clear: "Borrar",
        weekStart: 1,
        format: "mm/dd/yyyy"
    };
}(jQuery));


var NOTIFY_TYPE_SUCCESS = 'success';
var NOTIFY_TYPE_INFO = 'info';
var NOTIFY_TYPE_WARNING = 'warning';
var NOTIFY_TYPE_ERROR = 'error';


function MostrarAlerta($scope, meessage, type) {

    var title = "";
    switch (type) {
        case NOTIFY_TYPE_SUCCESS:
            title = "Solicitud exitosa !";
            break;
        case NOTIFY_TYPE_INFO:
            title = "Esta información puede ser de tu ayuda.";
            break;
        case NOTIFY_TYPE_WARNING:
            title = "Tienes una alerta.";
            break;
        case NOTIFY_TYPE_ERROR:
            title = "Opss se ha presentado un error !";
            break;
    }

    var notify = {
        type: type,
        title: title,
        content: meessage,
        timeout: 3200 //timeout default is 3200 ms you can change as you need
    };

    $scope.$emit('notify', notify);

};