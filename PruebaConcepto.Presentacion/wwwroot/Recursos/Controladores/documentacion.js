(function () {

    var app = angular.module('pruebaTecnica');

    app.controller("DocumentacionController", function ($scope, DocumentacionService, ClasificacionService) {

        $scope.documentacion = {};
        $scope.listaDocumentaciones = [];
        $scope.listaClasificaciones = [];

        // Metodos de carga
        CargarDocumentaciones();
        CargarClasificaciones();

        $scope.crear = function (documentacion)
        {
            documentacion.IdClasificacion = documentacion.Clasificacion.Id;

            var resultado = DocumentacionService.guardar(documentacion);
            resultado.then(success, error);

            function success(e) {

                var resultado = angular.fromJson(e.data);

                if (resultado
                    && resultado != null)
                {
                    alert("Documentacion guardada exitosamente");
                    location.reload();
                }
            }

            function error(e) {
                alert("Error al guardar la documentacion");
            }
        };

        $scope.eliminar = function (actividad) {

            if (actividad != null
                && actividad != undefined)
            {
                var resultado = DocumentacionService.eliminar(actividad);
                resultado.then(success, error);

                function success(e) {
                    alert("documentacion eliminada exitosamente");
                    location.reload();
                };

                function error(e) {
                    alert("Error al eliminar la documentacion");
                }
            }

        };



        function CargarClasificaciones()
        {
            ClasificacionService.ObtenerTodo().then(function (e)
            {
                var listaClasificaciones = angular.fromJson(e.data);

                if (listaClasificaciones != null
                    && listaClasificaciones.length > 0)
                {
                    $scope.listaClasificaciones = listaClasificaciones;
                } else {
                    $scope.listaClasificaciones = "No hay ninguna clasificación creada recientemente.";
                }
            });
        }


        function CargarDocumentaciones()
        {
            DocumentacionService.obtenerDocumentaciones().then(function (e)
            {
                var listaDocumentaciones = angular.fromJson(e.data);

                if (listaDocumentaciones != null
                    && listaDocumentaciones.length > 0)
                {
                    $scope.listaDocumentaciones = listaDocumentaciones;
                } else {
                    $scope.listaDocumentaciones = "No hay ninguna documentacion creada recientemente.";
                }
            });
        }
    });


    app.service("DocumentacionService", function ($http, $q) {

        this.obtenerDocumentaciones = function () {

            var response = $q.defer();

            var data = {};
            var config = {};

            $http.get('./api/Documentacion', data, config).then(successCallback, errorCallback);

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

        this.guardar = function (actividad) {

            var response = $q.defer();

            var data = actividad;
            var config = {};

            $http.post('./api/Documentacion', data, config).then(successCallback, errorCallback);

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
        };

        this.eliminar = function (actividad) {

            var response = $q.defer();

            var data = {};
            var config = {};

            $http.delete('./api/Documentacion/' + actividad.Id, data, config).then(successCallback, errorCallback);

            function successCallback(e) {

                var resultado = e.data;
                response.resolve(resultado);
            };

            function errorCallback(e) {

                var resultado = e.data;
                response.reject(resultado);
            };

            return response.promise;

        };

    });



})();

