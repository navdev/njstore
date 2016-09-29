(function(){
    var apiUrl = "/api/";
    var app = angular.module("app", ["ngRoute"]);

    var Cart = function(){
        this.items = [];
        
        this.add = function(value){
            this.items.push(value);
        }
        
        this.remove = function(value){
            var i = array.indexOf(value);
            if(i != -1) {
                array.splice(i, 1);
            }
        }
        
        this.save = function(){

        }

        this.empty = function(){
            this.items = [];
        }

        this.getCount = function(){
            return this.items.length;
        }

        this.getTotalPrice = function(){
            var totalPrice = 0;
            angular.forEach(this.items, function(value, key){
                totalPrice += value.price
            });
            return totalPrice;
        }
    };

    var cart = new Cart();

    app.config(function($routeProvider, $locationProvider, $httpProvider) {
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
            .when("/checkout", {
                templateUrl : "templates/checkout",
                controller : "checkoutController"
            })
            .when("/userprofile", {
                templateUrl : "templates/userprofile",
                controller : "singleController"
            })
            .when("/register", {
                templateUrl : "templates/register",
                controller : "signupController"
            })
            .when("/success-signup", {
                templateUrl : "templates/success-signup",
            })
            .when("/login-failed", {
                templateUrl : "templates/login-failed",
            })
            .when("/login", {
                templateUrl : "templates/login",
                controller : "loginController"
            })
            .when("/account", {
                templateUrl : "templates/account",
                controller : "accountController"
            })
            .when("/aboutus", {
                templateUrl : "templates/aboutus"
            })
            .otherwise({ redirectTo: '/' });
            /*
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            */

            $httpProvider.interceptors.push(function($q, $location) { 
                return { 
                    response: function(response) { return response }, 
                    responseError: function(response) { 

                        if (response.status === 401) {
                            $location.url('/login-failed'); 
                        }
                        return $q.reject(response); 
                }}; 
            });
    });

    app.controller("chromeController", function ($scope, $http) {
        $http.get(apiUrl + "catalogs").then(function(result){
            console.log(result.data);
            $scope.menuItems = result.data;
        });
    });

    app.controller("headerController", function ($scope, $http) {
        $scope.getItemsinCart = function(){
            return cart.getCount();
        }
        $scope.getTotalPrice = function(){
            return cart.getTotalPrice();
        }
        
        $scope.emptyCart = function(){
            cart.empty();
        }
    });

    app.controller("homeController", function ($scope, $http) {
        $http.get(apiUrl + "products").then(function(result){
            console.log(result.data);
            $scope.products = result.data;
        });

        $scope.addToCart = function(product){
            console.log(product);
            cart.add(product);
        }
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

        $scope.addToCart = function(product){
            console.log(product);
            cart.add(product);
        }
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

        $scope.addToCart = function(product){
            console.log(product);
            cart.add(product);
        }

    });

    app.controller("checkoutController", function ($scope, $http) {
        $scope.items = cart.items;

        $scope.getItemsinCart = function(){
            return cart.getCount();
        }
        $scope.getTotalPrice = function(){
            return cart.getTotalPrice();
        }
        $scope.removeItem = function(item){

        }
    });

    app.controller("signupController", function ($scope, $http, $location) {
        $scope.submitForm = function(){
            console.log($scope.model);
            var signupData = { firstName: $scope.model.firstName, 
                lastName: $scope.model.lastName, 
                email: $scope.model.email,
                password: $scope.model.password,
                phone: $scope.model.phone };
            $http.post(apiUrl + "register", signupData).then(function(result){
                console.log(result.data);
            });
            $location.path("success-signup");
        }
    });

    app.controller("loginController", function ($scope, $http, $location) {
        $scope.submitForm = function(){
            
            var loginData = { email: $scope.email, 
                password: $scope.password
            };
            console.log(loginData);
            $http.post("/login", loginData).then(function(result){
                console.log(result.data);
                $location.url("/account");
            });
        }
    });

    app.controller("accountController", function ($scope, $http, $location) {
       
    });

})();