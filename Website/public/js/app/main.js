(function(){
    var storage = localStorage;
    var apiUrl = "/api/";
    var loggedinUser = null;
    var app = angular.module("app", ["ngRoute", "ngMessages"]);
    var loginLink = {loginText: "Login", loginUrl: "#/login"};
    var lastOrderId = "";
    var compareTo = function() {
        return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
            return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
            ngModel.$validate();
            });
        }
        };
    };

    var CartItem = function(id, categoryId, productName, description,  price, quantity, productType, imageSource){
        this._id = id;
        this.categoryId = categoryId;
        this.productName = productName;
        this.description = description;
        this.imageSource = imageSource;
        this.price = price;
        this.productType = productType;
        this.quantity = quantity;
    }

    var Cart = function(){
        var that = this;
        var storage_name = "estore_cart";
        this.items = JSON.parse(storage.getItem(storage_name)) || [];
        
        this.add = function(value){
            var qtyChanged = false;
            angular.forEach(this.items, function(item, key){
                if(item._id === value._id){
                    item.quantity += 1;
                    qtyChanged = true;
                    that.save();
                    return;
                }
            });

            if(qtyChanged) { return; }
            var item = new CartItem(value._id, value.categoryId, value.productName, value.description, value.price, 1, value.productType, value.imageSource)
            this.items.push(item);
            that.save();
        }
        
        this.remove = function(value){
            var iKey = -1;
            angular.forEach(this.items, function(item, key){
                if(item._id === value._id){
                    iKey = key; 
                    return;
                }
            });
            if(iKey != -1) {
                this.items.splice(iKey, 1);
                this.save();
            }
        }
        
        this.save = function(){
            storage.setItem(storage_name, JSON.stringify(this.items));
        }

        this.empty = function(){
            this.items = [];
            storage.removeItem(storage_name);
        }

        this.getCount = function(){
            return this.items.length;
        }

        this.getTotalPrice = function(){
            var totalPrice = 0;
            angular.forEach(this.items, function(value, key){
                totalPrice += (value.price * value.quantity)
            });
            return totalPrice;
        }
    };

    var cart = new Cart();

        app.factory('logoutService', function($http, $location) {
            return function(){
                $http.get("/logout").then(function(result){
                        console.log(result.data);
                        loggedinUser = null;
                        loginLink.loginText = "Login";
                        loginLink.loginUrl ="#/login";
                        $location.url("/");
                });
            }
    });

    app.directive("compareTo", compareTo);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){  
        var deferred = $q.defer(); 
        $http.get('/loggedin').success(function(status){ 
            console.log(status)
            // Authenticated 
            if (status) 
                deferred.resolve(); 
            // Not Authenticated 
            else { 
                $rootScope.message = 'You need to log in.'; 
                deferred.reject(); 
                $location.url('/login'); 
            } }); 
            return deferred.promise; 
        };

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
            .when("/logout", { 
                resolve: ['logoutService', function (logoutService) {
                    logoutService();
                }]
            })
            .when("/account", {
                templateUrl : "templates/account",
                controller : "accountController",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/profile", {
                templateUrl : "templates/profile",
                controller : "accountController",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/vieworders", {
                templateUrl : "templates/vieworders",
                controller : "accountController",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/order-success", {
                templateUrl : "templates/order-success",
                controller : "checkoutController"
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

 
            
    }).run(['$rootScope', '$http', function($rootScope, $http){

        $http.get('/loggedin').success(function(loggedin){ 
        if (loggedin) 
                loginLink = {loginText: "Logout", loginUrl: "#/logout"};
        // Not Authenticated 
        else { 
            loginLink = {loginText: "Login", loginUrl: "#/login"};
        } });

    }]);
    

    app.controller("chromeController", function ($scope, $http) {
        $http.get(apiUrl + "catalogs").then(function(result){
            console.log(result.data);
            $scope.menuItems = result.data;
        });
    });

    app.controller("headerController", function ($scope, $http) {

        $scope.getLoginLinkText = function(){
            return loginLink.loginText;
        }
        $scope.getLoginUrl = function(){
            return loginLink.loginUrl;
        }
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

    app.controller("checkoutController", function ($scope, $http, $location) {
        $scope.items = cart.items;

        $scope.getItemsinCart = function(){
            return cart.getCount();
        }
        $scope.getTotalPrice = function(){
            return cart.getTotalPrice();
        }
        $scope.removeItem = function(item){
            cart.remove(item);
        }
        $scope.placeOrder = function(){
            var order = { items: cart.items };
            $http.post("/submitorder", order).then(function(result){
                console.log(result.data);
                lastOrderId = result.data.orderId;
                cart.empty();
                $location.path("order-success");
            }); 
        }
        $scope.hasItems = function(){
            return cart.getCount() == 0;
        }
        $scope.getOrderId = function(){
            return lastOrderId;
        }

    });

    app.controller("signupController", function ($scope, $http, $location) {
        $scope.submitForm = function(){
            console.log($scope.model);
            //if(!isValid) { return; }
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
        $scope.loginText
        $scope.submitForm = function(){
            
            var loginData = { email: $scope.email, 
                password: $scope.password
            };
            console.log(loginData);
            $http.post("/login", loginData).then(function(result){
                console.log(result.data);
                loggedinUser = result.data.user;
                $location.url("/account");
                loginLink.loginText = "Logout";
                loginLink.loginUrl ="#/logout";
            });
        }
    });

     app.controller("logoutController", function ($scope, $http, $location) {
         $http.get("/logout").then(function(result){
                console.log(result.data);
                loggedinUser = null;
                loginLink.loginText = "Login";
                loginLink.loginUrl ="#/login";
                $location.url("/");
        });
     });

    app.controller("accountController", function ($scope, $http, $location) {
         
        $http.get("/userinfo").then(function(result){
            $scope.user = result.data;
        });

        $http.get("/ordersforcurrentuser").then(function(result){
            $scope.orders = result.data;
        });
    });

})();