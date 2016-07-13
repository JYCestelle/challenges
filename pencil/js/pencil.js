'use strict';

var myApp = angular.module('PencilApp', ['ngSanitize', 'ui.router', 'ui.bootstrap']);

//configure routes
myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'partials/home.html',
			controller: 'MainCtrl'
		})
		.state('orders', {
			url: '/orders',
			templateUrl: 'partials/order.html',
            controller: 'orderCtrl'
		})
		.state('cart', {
			url: '/orders/cart',
			templateUrl: 'partials/cart.html',
			controller: 'cartCtrl'
		})
        .state('pencil-id', {
			url: '/orders/pencil-id/:pencil1',
			templateUrl: 'partials/pencil-id.html',
            controller: 'DetailsCtrl'
		})

		$urlRouterProvider.otherwise('/home');
}]);

//For movie list
myApp.controller('orderCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/products.json').then(function (response) {
		var data = response.data;
		$scope.pencils = data;
  });
  


}]);

myApp.controller('cartCtrl', ['$scope', '$http', '$window', 'ShoppingCartService', function ($scope, $http, ShoppingCartService, $window) {
    $scope.items = JSON.parse(localStorage.shoppingCart);
	console.log($scope.items);

	$scope.kill = function (index){
		//localStorage.shoppingCart.splice(localStorage.shoppingCart.indexOf(index), 1)
		
		var key = $scope.items.splice(index, 1);
		console.log($scope.items.splice(index, 1));
		localStorage.removeItem('shoppingCart' + key);


	}
	$scope.killall = function(){
		localStorage.clear();
		$scope.greeting = 'Thank You Order has been placed!';
        window.alert('Thank You Order has been placed! Please refresh page!');
	  
	}


}]);

myApp.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/products.json').then(function (response) {
		var pencils = response.data;
		$scope.pencils = pencils;
  });


}]);

myApp.controller('DetailsCtrl', ['$scope', '$stateParams', '$filter', '$http', 'ShoppingCartService', function($scope, $stateParams, $filter, $http, ShoppingCartService){
	console.log($stateParams.pencil1);

  $http.get('data/products.json').then(function(response){
      var pencils = response.data;

			var targetObj = $filter('filter')(pencils, { //filter the array
      	id: $stateParams.pencil1 //for items whose id property is targetId
   		}, true)[0]; //save the 0th result

			$scope.pencil = targetObj;

	});

	$scope.saveCart = function(){
		var id = $scope.pencil.id
		var amount = $scope.amountSelect;
		var color = $scope.singleSelect;
		var price = $scope.pencil.price;
		var cartItem = {'id': id, 'amount': amount, 'color': color, 'price': price};
		ShoppingCartService.addItem(cartItem);
		//console.log(cartItem);
		$scope.cartItem = undefined;
	};


	//find the movie with the `$stateParmas.movie` id
	//show that one

	// $scope.movie = { 
  //    title: "An Example Movie",
  //    released: "7/6/16",
  //    distributor: "INFO 343",
  //    genre: "Educational",
  //    rating: "PG",
  //    gross: 1000000,
  //    tickets: 30
	// };
}])


myApp.factory('ShoppingCartService',function() {
	var service = {};

	if(localStorage.shoppingCart !== undefined){
		service.shoppingCart = JSON.parse(localStorage.shoppingCart);
		//console.log(service.watchlist);
	}
	else {
		service.shoppingCart = [];
	}

	service.message = "Hello, I'm a service";
	service.addItem = function(item){
		service.shoppingCart.push(item);
		localStorage.shoppingCart = JSON.stringify(service.shoppingCart);
		//console.log("saved ",localStorage.watchlist)
	};
	console.log(service);

	return service;
});

