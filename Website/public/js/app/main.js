(function(){
    var app = angular.module("app", ["ngRoute"]);
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "templates/home",
                controller : "homeController"
            })
            .when("/single", {
                templateUrl : "templates/single",
                controller : "singleController"
            })
            .when("/userprofile", {
                templateUrl : "templates/userprofile",
                controller : "singleController"
            })
            .otherwise("/");
/*
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            */
    });

    app.controller("homeController", function ($scope) {
        $scope.msg = "I love white";
    });
    app.controller("singleController", function ($scope) {
        $scope.msg = "I love red";
    });
})();