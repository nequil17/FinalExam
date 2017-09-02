var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/home.html",
        controller: 'homeController'
    })
    .when("/single/:id", {
        templateUrl : "/views/single.html",
        controller: 'singleController'
    });
});

myApp.controller('homeController', function($http, $scope) {
    $http.get("http://localhost:3000/api/v1/movies")
        .then(function (response) {
        $scope.movies = response.data;
        console.log(response);
      }, function errorCallback(response) {
        
      });
    
});

myApp.controller('singleController', function($scope, $http) {
    $http.get('http://localhost:3000/api/v1/movies/:id')
    .then(function (response) {
        $rootScope.singlemovie = response.data;
      }, function errorCallback(response) {
        
      });
});