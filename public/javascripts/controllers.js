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

.controller('DeviceCtrl', function($scope, $http){	
	$scope.device = {
		name: '',
		public_ip: '',
		public_port: '',
		internal_ip: '',
		internal_port: ''
	};

	$http.get('/api/devices')
	.success(function(data){
		if(data.status == 0){
			$scope.devices = data.devices;
		} else {
			console.log(data);
		}
	})
	.error(function(data){
		console.log(data);
	});
	
	$scope.save = function(){
		$http.post('/api/devices', $scope.device)
		.success(function(data){
			console.log(data);
		})
		.error(function(data){
			console.log(data);
		});
	};
	$scope.showCreateModal = function(){
		console.log('vai criar')
		$('#create').openModal();
	};
})

.controller('MenuCtrl', function($scope, $location){
	$scope.active = function(path){
		return path === $location.path();
	};
});
