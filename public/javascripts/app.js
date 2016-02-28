angular.module('linkhouse', ['ngRoute', 'linkhouse.services', 'linkhouse.controllers'])

.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: 'partials/index',
		controller: 'IndexCtrl'
	})
	.when('/areas', {
		templateUrl: 'partials/areas',
		controller: 'AreaCtrl'
	})
	.when('/devices', {
		templateUrl: 'partials/devices',
		controller: 'DeviceCtrl'
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
		$rootScope.$apply();
	});
	socket.on('connect_timeout', function(){
		console.log('connect_timeout');
		$rootScope.status = 'Disconnected';
		$rootScope.$apply();
	});
	socket.on('reconnect', function(number){
		console.log('reconnect');
		$rootScope.status = 'Connected';
		$rootScope.$apply();
	});
	socket.on('reconnecting', function(number){
		console.log('reconnecting');
		$rootScope.status = 'Connecting...';
		$rootScope.$apply();
	});
	socket.on('reconnect_error', function(obj){
		console.log('reconnect_error');
		$rootScope.status = 'Disconnected';
		$rootScope.$apply();
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

	$rootScope.sendio = function(msg, callback, event){
		var event = event || 'req';
		var id = Math.floor((Math.random() * 9999) + 1);
		$rootScope.callbacks[id] = callback;
		$rootScope.socket.emit(event, {id: id, data: msg});	
	};

	$rootScope.socket = socket;
});
