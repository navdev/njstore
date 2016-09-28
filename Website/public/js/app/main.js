(function(){
    var apiUrl = "/api/";
    var app = angular.module("app", ["ngRoute"]);
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "templates/home",
                controller : "homeController"
            })
            .when("/single/:id", {
                templateUrl : "templates/single",
                controller : "singleController"
            })
            .when("/catalog/:id", {
                templateUrl : "templates/catalog",
                controller : "catalogController"
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

    app.controller("chromeController", function ($scope, $http) {
        $http.get(apiUrl + "catalogs").then(function(result){
            console.log(result.data);
            $scope.menuItems = result.data;
        });
    });

    app.controller("homeController", function ($scope, $http) {
        $http.get(apiUrl + "products").then(function(result){
            console.log(result.data);
            $scope.products = result.data;
        });
    });

    app.controller("singleController", function ($scope, $http, $routeParams) {
        var productId = $routeParams.id;

        $http.get(apiUrl + "catalogs").then(function(result){
            console.log(result.data);
            $scope.catalogs = result.data;
        });

        $http.get(apiUrl + "product/" + productId).then(function(result){
            console.log(result.data);
            if(result.data.length > 0)
                $scope.product = result.data[0];
        });

    });

    app.controller("catalogController", function ($scope, $http, $routeParams) {
        var catalogId = $routeParams.id;

        $http.get(apiUrl + "catalogs").then(function(result){
            console.log(result.data);
            $scope.catalogs = result.data;
        });

        if(catalogId === "all"){
            $scope.catalog = { categoryName: "All Products" };
            $http.get(apiUrl + "products").then(function(result){
                console.log(result.data);
                $scope.products = result.data;
            });
        } else {
            $http.get(apiUrl + "catalog/" + catalogId).then(function(result){
                console.log(result.data);
                if(result.data.length > 0)
                    $scope.catalog = result.data[0];
            });

            $http.get(apiUrl + "productsbycategory/" + catalogId).then(function(result){
                console.log(result.data);
                $scope.products = result.data;
            });
        }

    });

})();