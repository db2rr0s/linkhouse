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
})
.run(function($rootScope){
	$rootScope.callbacks = {};
	$rootScope.socket = new io();	

	$rootScope.socket.on('res', function(msg){
		var callback = $rootScope.callbacks[msg.id];
		delete $rootScope.callbacks[msg.id]
		delete msg.id;

		if(callback){			
			callback(msg);			
		} else {
			console.log('no callback for id ' + msg.id);
		}
	});

	$rootScope.sendio = function(msg, callback){
		var id = Math.floor((Math.random() * 9999) + 1);
		$rootScope.callbacks[id] = callback;
		$rootScope.socket.emit('req', {id: id, data: msg});
	};	
});