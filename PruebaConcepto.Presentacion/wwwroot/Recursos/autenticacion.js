(function () {

    var app = angular.module('pruebaTecnica');

    app.controller("AutenticacionController", function ($scope, $window, $location, AutenticacionService) {

        $scope.credenciales = {};
        $scope.enableLogin = true;
        $scope.getUsuarioLogeado = {};


        $scope.login = function (credenciales) {

            var respuesta = AutenticacionService.getAutenticacionPorCrendenciales(credenciales);

            respuesta.then(function (response) {

                //creo la cookie

                //Success
                $window.localStorage['access_token'] = response.data.access_token;
                $window.localStorage['token_type'] = response.data.token_type;
				
				alert("¡Bienvenido!");

                MostrarAlerta($scope, "Bienvenido estas siendo redirigido a la pagina de inicio.", NOTIFY_TYPE_SUCCESS);


                setTimeout(function () { window.location.href = './';}, 2000);   
                
            }, function (response) {
                alert("Usuario y/o contraseña incorrectos");
            });
        };

    });

    app.factory('AccessTokenHttpInterceptor', function ($window, $q) {

        return {
            //Para cada petición, se usa el encabezado token
            request: function ($config) {

                if ($window.localStorage['access_token'] != null
                    && $window.localStorage['token_type'] != null)
                {

                    //Obtengo el token de la cookie
                    var access_token = $window.localStorage['access_token'];
                    var token_type = $window.localStorage['token_type'];

                    // autorizo el token
                    $config.headers['Authorization'] = token_type + ' ' + access_token;
                }

                return $config;
            },
            response: function (response) {
                //if you get a token back in your response you can use 
                //the response interceptor to update the token in the 
                //stored in the cookie                
                //setTimeout(function () { OcultarLoading(); }, 3000);
                //OcultarLoading();
                return response;
            },
            responseError: function (response) {

                //console.log("AccessTokenHttpInterceptor");
                //console.log(response);

                //OcultarLoading();

                return $q.reject(response);
            }
        };
    });

    app.service('AutenticacionService', function ($http, $q, $window) {

        this.getAutenticacionPorCrendenciales = function (credenciales) {

            var response = $q.defer();
            
            var data = {
                username: credenciales.username
                , password: credenciales.password
                , grant_type: 'password'
            };

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            $http.post('./oauth/token', $.param(data), config).then(successCallback, errorCallback);

            function successCallback(e) {

                if (e == undefined) {

                    resultado = {
                        error: true
                        , mensaje: "Usuario o contraseña incorrectos."
                        , data: null
                    }

                    response.reject(resultado);
                }
                else {
                    var resultado = {
                        error: false
                        , mensaje: ""
                        , data: e.data
                    }

                    response.resolve(resultado);
                }

            };

            function errorCallback(e) {

                var resultado = {};

                if (e = !undefined) {

                    resultado = {
                        error: true
                        , mensaje: "Usuario o contraseña incorrectos."
                        , data: e.data
                    }

                }

                response.reject(resultado);

            };

            return response.promise;
        };

        this.getCurrentUser = function () {

            var response = $q.defer();

            var data = {};
            var config = {};

            $http.get('./oauth/check', data, config).then(successCallback, errorCallback);

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

        this.logout = function () {

            localStorage.clear();

        };

    });

})();