angular.module('linkhouse.controllers', [])

.controller('IndexCtrl', function($scope, $rootScope, $http){
	$scope.areas = undefined;

	$scope.refresh = function(){
		$http.get('/api/dashboard')
		.success(function(data){
			if(data.status == 0){
				$scope.areas = data.areas;
			} else {
				console.log(data);
			}
		})	
		.error(function(data){
			console.log(data);
		});
	};

	$scope.debug = function(){
		$scope.sendio('*', function(msg){
			$scope.retorno = msg;
			$scope.$apply();
		}, 'debug');
	}

	$scope.refresh();	

	$scope.change = function(pin){
        $scope.sendio(pin, function(msg){        
        	$scope.retorno = msg;
        	$scope.$apply();			
		}, 'change');
	};
})

.controller('AreaCtrl', function($scope, $http){	
	$scope.area = {
		name: ''
	};

	function refreshAreas(){
		$http.get('/api/areas')
		.success(function(data){
			if(data.status == 0){
				$scope.areas = data.areas;
			} else {
				console.log(data);
			}
		})
		.error(function(data){
			console.log(data);
		});
	}	
	
	$scope.save = function(){
		$http.post('/api/areas', $scope.area)
		.success(function(data){			
			$('#create').closeModal();
			refreshAreas();
		})
		.error(function(data){
			console.log(data);
		});
	};

	$scope.showCreateModal = function(){		
		$('#create').openModal();
	};

	$scope.delete = function(area){
		$http.delete('/api/areas/' + area._id)
		.success(function(data){
			refreshAreas();
		})
		.error(function(data){
			console.log(data)
		});
	}

	refreshAreas();
})

.controller('DeviceCtrl', function($scope, $http){	
	$scope.device = {		
		area: undefined,
		name: '',
		mac: '',
		type: 'S',
		public_ip: '',
		public_port: '',
		internal_ip: '',
		internal_port: ''
	};

	$scope.pin = {
		device: undefined,
		name: ''
	}	

	// POG: temp
	$http.get('/api/areas')
	.success(function(data){
		if(data.status == 0){
			$scope.areas = data.areas;
		} else {
			console.log(data);
		}
	})
	.error(function(data){
		console.log(data);
	});

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

	function refreshPins(){
		$http.get('/api/pins?device=' + $scope.pin.device._id)
		.success(function(data){
			if(data.status == 0){
				$scope.pins = data.pins;
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
			$('#create').closeModal();
			refreshDevices();
		})
		.error(function(data){
			console.log(data);
		});
	};

	$scope.showCreateModal = function(){
		$(document).ready(function() {
		    $('select').material_select();
		});
		$('#create').openModal();
	};

	$scope.showEditPins = function(device){
		$scope.pin.device = device;
		refreshPins();
		$('#editpins').openModal();
	}

	$scope.delete = function(device){
		$http.delete('/api/devices/' + device._id)
		.success(function(data){		
			refreshDevices();
		})
		.error(function(data){
			console.log(data)
		});
	}

	$scope.showCreatePinModal = function(){
		$('#createpin').openModal();
	}

	$scope.savePin = function(){
		$http.post('/api/pins', $scope.pin)
		.success(function(data){
			$('#createpin').closeModal();
			refreshPins();
		})
		.error(function(data){
			console.log(data);
		});
	};

	$scope.deletePin = function(pin){
		$http.delete('/api/pins/' + pin._id)
		.success(function(data){
			refreshPins();
		})
		.error(function(data){
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
