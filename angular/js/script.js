'use strict';



//http://www.google.com/finance/info?q=NSE:AAPL,RIG,AMZN,MSFT,ACM,AES,AOSL,BWXT,CPN,CIVI,XOM,HLF,NDEV,OXY,QCOM,VLO

var myApp = angular.module('bridge', []);
myApp.controller('bridgeCtrl',['$scope', '$http', function($scope, $http){
  //have controller create models here
    //$scope.message = 'Hello World'; //for testing

  $http.get('https://data.seattle.gov/resource/4xy5-26gy.json').then(function(response) {
    var theData = response.data; //data we downloaded in here    

    //$scope.movies = theData;
    //do something with the data from the response...
    //like put it on the $scope to show it in the view!
    $scope.times = theData;
  });
  $scope.ordering = 'date';
  $scope.sortBy = function(order){
      $scope.ordering = order;
  }
  $scope.Math = window.Math;
  $scope.width = 600;
  $scope.height = 400;
  $scope.yAxis = "date";
  $scope.xAxis = "fremont_bridge_nb"
  $scope.max = 0;


  /*
  $scope.ordering = '-gross';
  $scope.sortBy = function(order){
      $scope.ordering = order;
  }*/
  //sample movie data to work with


}]);

myApp.directive("linearChart", function($window) {
  return{
    restrict: "EA",
    template: "<svg width='850' height='200'></svg>",
    link: function(scope, elem, attrs){
    }
  };
});