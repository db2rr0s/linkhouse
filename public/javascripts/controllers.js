angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope, $rootScope){
	$scope.test = 'Settings';
	$scope.message = 'nothing';
	$scope.luzquarto = false;
	$scope.luzsala = false;

	$scope.refresh = function(){		
		$scope.sendio('*', function(msg){
			if(msg.success){
				console.log('ok')				
				$scope.luzquarto = (msg.data[1] == 1);
				$scope.luzsala = (msg.data[2] == 1);
				$scope.retorno = msg.data;
				$scope.$apply();
			} else {
				console.log('bufu: ' + msg.message)
				$scope.retorno = 'erro: ' + msg.message;
			}
			$scope.message = msg.message;
		});		
	}

	$scope.refresh();	

	$scope.change = function(){
        $scope.sendio('$' + ($scope.luzquarto ? '1' : '0') + ($scope.luzsala ? '1' : '0') + '#######', function(msg){
        //$scope.sendio('$11#######', function(msg){
			if(msg.success){
				console.log('ok')				
				$scope.luzquarto = (msg.data[1] == 1);
				$scope.luzsala = (msg.data[2] == 1);
				$scope.retorno = msg.data;
				$scope.$apply();
			} else {
				console.log('bufu: ' + msg.message)
				$scope.retorno = 'erro: ' + msg.message;
			}
			$scope.message = msg.message;
		});
	}
})

.controller('StartCtrl', function($scope){
	$scope.test = 'just a test';
})

.controller('MenuCtrl', function($scope, $location){
	$scope.active = function(path){
		return path === $location.path();
	}
});
