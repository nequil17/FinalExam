var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/views/home.html",
        
    })
    .when("/:id", {
        templateUrl : "/views/single.html",
        
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

myApp.controller('singleController', function($scope, $http, $routeParams, $sce) {
    var id = $routeParams.id;
    $http.get('http://localhost:3000/api/v1/movies/' + id)
    .then(function (response) {
        var data = response.data;
        data.trailer = $sce.trustAsResourceUrl(data.trailer);
        $scope.movie = data;

      }, function errorCallback(response) {
        
      });
});