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
	$rootScope.status = 'Disconnected';
	var socket = new io();	

	socket.on('connect', function(){
		console.log('connect');
		$rootScope.status = 'Connected';
		$rootScope.$apply();
	});
	socket.on('connect_error', function(obj){
		console.log('connect_error ' + obj);
		$rootScope.status = 'Disconnected';
	});
	socket.on('connect_timeout', function(){
		console.log('connect_timeout');
		$rootScope.status = 'Disconnected';
	});
	socket.on('reconnect', function(number){
		console.log('reconnect');
		$rootScope.status = 'Connected';
	});
	socket.on('reconnecting', function(number){
		console.log('reconnecting');
		$rootScope.status = 'Connecting...';
	});
	socket.on('reconnect_error', function(obj){
		console.log('reconnect_error');
		$rootScope.status = 'Disconnected';
	});

	socket.on('res', function(msg){
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

	$rootScope.socket = socket;
});
