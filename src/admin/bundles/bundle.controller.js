(function(){
	'use strict';

	angular.module('motech-admin')
		.controller('BundleController', controller);

	controller.$inject = ['$scope', 'bundle'];
	function controller($scope, bundle){
		$scope.module = bundle;
	}

})();