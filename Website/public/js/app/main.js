(function(){
    var app = angular.module("app", ["ngRoute"]);
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "partials/main",
                controller : "defaultController"
            })
            .when("/red", {
                templateUrl : "partials/red",
                controller : "redController"
            })
            .when("/green", {
                templateUrl : "partials/green",
                controller : "greenController"
            })
            .otherwise("/");

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
    });

    app.controller("defaultController", function ($scope) {
        $scope.msg = "I love white";
    });
    app.controller("redController", function ($scope) {
        alert("dddd");
        $scope.msg = "I love red";
    });
    app.controller("greenController", function ($scope) {
        $scope.msg = "I love green";
    });
})();