(function () {

    var app = angular.module('pruebaTecnica');

    app.service("ClasificacionService", function ($http, $q) {

        this.ObtenerTodo = function () {

            var response = $q.defer();

            var data = {};
            var config = {};

            $http.get('./api/Clasificacion/', data, config).then(successCallback, errorCallback);

            function successCallback(e) {

                var resultado = {
                    error: false
                    , mensaje: ""
                    , data: e.data
                }

                response.resolve(resultado);
            };

            function errorCallback(e) {

                var resultado = {
                    error: true
                    , mensaje: ""
                    , data: e.data
                }

                response.reject(resultado);
            };

            return response.promise;
        }


    });



})();

