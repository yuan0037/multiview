(function () {
    var app = angular.module('todolist', ['ngRoute']);
    
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'products.html',
                controller: 'ListController as list',
                activetab: 'products'
            })
            .when('/ListProducts', {
                templateUrl: 'products.html',
                controller: 'ListController as list',
                activetab: 'products'
            })
            .when('/ListServices', {
                templateUrl: 'services.html',
                controller: 'ListController as list',
                activetab: 'services'
            })
            .when('/ListMiscs', {
                templateUrl: 'miscs.html',
                controller: 'ListController as list',
                activetab: 'miscs'
            });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });

    app.controller('MainController', function ($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    app.controller('ListController', function () {

        this.productItems = {};
        this.serviceItems = {};
        this.miscItems = {};
        this.tab = 1;


        this.addItem = function (itemKind) {
            if (itemKind === "product") {
                this.productItems.push(this.productItem);
                this.productItem = {};
            } else if (itemKind === "service") {
                this.serviceItems.push(this.serviceItem);
                this.serviceItem = {};
            } else {
                this.miscItems.push(this.miscItem);
                this.miscItem = {};
            }
            this.saveToStorage(itemKind);
        };

        this.removeItem = function (index, itemKind) {
            if (itemKind === "product") {
                this.productItems.splice(index, 1);
            } else if (itemKind === "service") {
                this.serviceItems.splice(index, 1);
            } else {
                this.miscItems.splice(index, 1);
            }

            this.saveToStorage(itemKind);

        };

        this.reloadItems = function (itemKind) {

            var preDefinedItems = [{
                name: "Test 1"
            }, {
                name: "Test 2"
            }, {
                name: "Test 3"
            }];

            if ((itemKind === "") || (itemKind === "product")) {
                var productList = localStorage.getItem("yuan0037-productItems");
                if (productList != null) {
                    if (JSON.parse(productList).length > 0) {
                        this.productItems = JSON.parse(productList);
                    } else {
                        this.productItems = preDefinedItems;
                    }
                } else {
                    this.productItems = preDefinedItems;
                }
            }

            if ((itemKind === "") || (itemKind === "service")) {
                var serviceList = localStorage.getItem("yuan0037-serviceItems");
                if (serviceList != null) {
                    if (JSON.parse(serviceList).length > 0) {
                        this.serviceItems = JSON.parse(serviceList);
                    } else {
                        this.serviceItems = preDefinedItems;
                    }
                } else {
                    this.serviceItems = preDefinedItems;
                }
            }

            if ((itemKind === "") || (itemKind === "misc")) {
                var miscList = localStorage.getItem("yuan0037-miscItems");
                if (miscList != null) {
                    if (JSON.parse(miscList).length > 0) {
                        this.miscItems = JSON.parse(miscList);
                    } else {
                        this.miscItems = preDefinedItems;
                    }
                } else {
                    this.miscItems = preDefinedItems;
                }
            }
        };

        this.saveToStorage = function (itemKind) {
            if (itemKind === "product") {
                localStorage.setItem("yuan0037-productItems", JSON.stringify(this.productItems));
            } else if (itemKind === "service") {
                localStorage.setItem("yuan0037-serviceItems", JSON.stringify(this.serviceItems));
            } else {
                localStorage.setItem("yuan0037-miscItems", JSON.stringify(this.miscItems));
            }
        }

        this.openTab = function (tabID, itemKind) {
            this.tab = tabID;
            this.reloadItems(itemKind);
        }

        this.reloadItems("");


    });


})();