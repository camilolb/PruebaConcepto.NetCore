(function () {

    var app = angular.module('pruebaTecnica');

    app.controller("LayoutController", function ($scope, $rootScope, $route, $routeParams, $window, AutenticacionService) {
        $scope.esAnonima;

        $scope.layout = {};

        $scope.layout.url = './Paginas/Login/Index.html';


        var respuesta = AutenticacionService.getCurrentUser();

        $scope.$on('$routeChangeStart', function (event, newValue, oldValue) {

            $scope.esAnonima = false;

            if (newValue !== undefined
                && 'allowAnonymous' in newValue) {

                    // Acá puedo validar si una página no necesita login de usuario
            }
            else {

                respuesta.then(function (response) {

                    $scope.layout.url = "";
                    $scope.currentUser = angular.fromJson(response.data);
                    setTimeout(function () { window.location.href = './#/Documentacion/Crear';}, 0);    
                   
                }, function (response) {

                    // No está logueado
                    if ($route.current.loadedTemplateUrl.indexOf("Index.html") <= 0)
                    {
                        setTimeout(function () { window.location.href = './';}, 0);
                    }
                    
                    $scope.currentUser = null;
                });
            }
        });


        $scope.logout = function ()
        {
            AutenticacionService.logout();
            window.location.href = "./";

        };
    });

})();
