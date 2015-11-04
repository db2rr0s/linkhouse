angular.module('linkhouse', ['ngRoute', 'linkhouse.services', 'linkhouse.controllers'])

.config(function($routeProvider){
	/*$urlRouterProvider.otherwise('/index');
	$stateProvider
	.state('linkhouse', {
		url: '',
		abstract: true,
		template: '<div ui-view/>',
		controller: 'LinkHouseCtrl'
	})
	.state('linkhouse.index', {
		url: '/index',
		templateUrl: 'partials/index',
		controller: 'IndexCtrl'
	});*/

	$routeProvider
	.when('/', {
		templateUrl: 'partials/index',
		controller: 'IndexCtrl'
	})
	.when('/start', {
		templateUrl: 'partials/start',
		controller: 'StartCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});