angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope, $rootScope){
	$scope.test = 'Settings';
	$scope.message = 'nothing';
	console.log('index ctrl');

	$scope.status = function(){
		$scope.sendio('&', function(msg){
			console.log(msg);
			if(msg.success){
				console.log('ok')
			} else {
				console.log('bufu: ' + msg.message)
			}
		});
	}

	$scope.send = function(){		
		$scope.sendio('bufu', function(msg){
			console.log(msg)
			if(msg.success){
				console.log('ok')				
			} else {
				console.log('bufu: ' + msg.message)
			}
			$scope.message = msg.message;
		});		
	}

	$scope.status();	
})

.controller('StartCtrl', function($scope){
	$scope.test = 'just a test';
	console.log('start ctrl');
})

.controller('MenuCtrl', function($scope, $location){
	$scope.active = function(path){
		return path === $location.path();
	}
});
