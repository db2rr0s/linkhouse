angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope, $rootScope){
	$scope.luzquarto = false;
	$scope.luzsala = false;

	$scope.refresh = function(){		
		$scope.sendio('*', function(msg){
			if(msg.success){				
				$scope.luzquarto = (msg.data[1] == 1);
				$scope.luzsala = (msg.data[2] == 1);
				$scope.retorno = msg.data;
				$scope.$apply();
			} else {
				console.log('bufu: ' + msg.message);
				$scope.retorno = 'erro: ' + msg.message;
			}			
		});		
	};

	$scope.refresh();	

	$scope.change = function(){
        $scope.sendio('$' + ($scope.luzquarto ? '1' : '0') + ($scope.luzsala ? '1' : '0') + '#######', function(msg){        
			if(msg.success){				
				$scope.luzquarto = (msg.data[1] == 1);
				$scope.luzsala = (msg.data[2] == 1);
				$scope.retorno = msg.data;
				$scope.$apply();
			} else {
				console.log('bufu: ' + msg.message);
				$scope.retorno = 'erro: ' + msg.message;
			}
		});
	};
})

.controller('StartCtrl', function($scope){	
	$scope.settings = {
		url: ''
	};
	
	$scope.save = function(){
		$scope.sendio('save', $scope.settings, function(msg){
			$scope.retorno = msg;
		});
	};
})

.controller('MenuCtrl', function($scope, $location){
	$scope.active = function(path){
		return path === $location.path();
	};
});
