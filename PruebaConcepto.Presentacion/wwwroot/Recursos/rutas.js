(function () {

    var app = angular.module('pruebaTecnica', ["ngRoute", 'angularNotify']);

    app.config(function ($routeProvider, $httpProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "/Index.html"
                , controller: "LayoutController"
            })

            // Crear un documento
            .when("/Documentacion/Crear", {
                templateUrl: "./Paginas/Documentacion/Crear.html"
                , controller: "DocumentacionController"
            })

            .otherwise({
                redirectTo: "/"
            });

        $httpProvider.interceptors.push('AccessTokenHttpInterceptor');
    });

})();