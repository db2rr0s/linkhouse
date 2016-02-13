angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope, $rootScope, $http){
	$scope.devices = [];

	$scope.refresh = function(){
		$scope.sendio('*', function(msg){
			if(msg.success){
				if(msg.data.substr(0, 1) == '*'){
					var aux = $scope.devices.filter(function(d){ return d.returns == 'ST'; });
					for(var i = 0; i < aux.length; i++){
						var device = $aux[i];
						device.state = msg.data[device.port] == '1';
					}
				} else {
					var aux = $scope.devices.filter(function(d){ return d.returns == 'TE' });
					for(var i = 0; i < aux; i++){
						var device = aux[i];
						device.state = msg.data.substr(1,2);
					}
					aux = $scope.devices.filter(function(d){ return d.returns == 'UM'; });
					for(var i = 0; i < aux; i++){
						var device = aux[i];
						device.state = msg.data.substr(3,2);
					}
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
		command = command.substr(0, device.port) + (device.state ? '1' : '0') + command.substr(device.port + 1)
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
		internal_port: '',
		returns: 'ST'
	};

	function refreshDevices(){
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
	}	
	
	$scope.save = function(){
		$http.post('/api/devices', $scope.device)
		.success(function(data){
			console.log(data);
			$('#create').closeModal();
			refreshDevices();
		})
		.error(function(data){
			console.log(data);
		});
	};

	$scope.showCreateModal = function(){
		console.log('vai criar')
		$('#create').openModal();
	};

	$scope.delete = function(device){
		console.log(device)
		$http.delete('/api/devices/' + device._id)
		.success(function(data){
			console.log('success')
			console.log(data);
			refreshDevices();
		})
		.error(function(data){
			console.log('error')
			console.log(data)
		});
	}

	refreshDevices();
})

.controller('MenuCtrl', function($scope, $location){
	$scope.active = function(path){
		return path === $location.path();
	};
});
