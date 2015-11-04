angular.module('linkhouse.services', [])

.factory('LinkHouseService', function($http){
	return {
		test: function(){
			return 'test';
		}
	};
});