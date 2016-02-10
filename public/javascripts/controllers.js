angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope, $rootScope, $http){
	$scope.devices = [];

	$scope.refresh = function(){
		$scope.sendio('*', function(msg){
			if(msg.success){
				for(var i = 0; i < $scope.devices.length; i++){
					var device = $scope.devices[i];
					device.state = msg.data[device.port] == '1';
				}
				$scope.retorno = msg.data;
				$scope.$apply();
			} else {
				console.log('bufu: ' + msg.message);
				$scope.retorno = 'erro: ' + msg.message;
			}			
		});		
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

	$scope.refresh();	

	$scope.change = function(device){
		var command = '$#########';
		command[device.port] = device.state ? '1' : '0';		
        $scope.sendio(command, function(msg){        
			if(msg.success){
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
			$('#create').closeModal();
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
