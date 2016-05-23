(function(){
	'use strict';

	angular.module('motech-common')
		.controller('InputMapController', inputMapController);

	inputMapController.$inject = ['$scope', 'MotechAlert'];
	function inputMapController($scope, MotechAlert){
		var ctrl = this;

		this.properties = {};
		this.add = addProperty;
		this.remove = removeProperty;

		function addProperty (name, value) {
		    if (ctrl.properties[name] === undefined) {
		        ctrl.properties[name] = value;
		        $scope.$broadcast('input-map.added');
		    } else {
		        MotechAlert('email.header.error', 'email.settings.alreadyExist');
		    }
		}
		function removeProperty (name) {
		    delete ctrl.properties[name];
		}

	}

})();