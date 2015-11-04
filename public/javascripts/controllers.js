angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope){
	$scope.test = 'just a test';
	console.log('index ctrl');	
})

.controller('StartCtrl', function($scope){
	$scope.test = 'just a test';
	console.log('start ctrl');
});