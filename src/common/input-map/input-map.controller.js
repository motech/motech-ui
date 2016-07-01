(function(){
	'use strict';

	/**
	 * @memberOf motech-common
	 * @ngdoc controller
	 * @name InputMapController
	 *
	 * @description
	 * Contains business logic used by the Input Map directive.
	 * 
	 * This controlls adding and removing properties from the local dictionary properites.  
	 * 
	 */

	angular.module('motech-common')
		.controller('InputMapController', inputMapController);

	inputMapController.$inject = ['$scope', 'MotechAlert'];
	function inputMapController($scope, MotechAlert){
		var ctrl = this;

		this.properties = {};
		this.add = addProperty;
		this.remove = removeProperty;
		
		/**
		 *
		 * This method sets variables on the properties object.
		 *
		 * The method will fail and show an alert if the name key is already in the local properties object.
		 * 
		 * @memberOf InputMapController
		 * 
		 * @param {String} name Name of key to set
		 * @param {String} value String value that key is mapped to
		 *
		 * @return {null}
		 * 
		 */
		function addProperty (name, value) {
		    if (ctrl.properties[name] === undefined) {
		        ctrl.properties[name] = value;
		        $scope.$broadcast('input-map.added');
		    } else {
		        MotechAlert('email.header.error', 'email.settings.alreadyExist');
		    }
		}
		/**
		 * Removes property from InputMap properties dictionary.
		 *
		 * @memberOf InputMapController 
		 * @param  {String} name Name of the key to remove
		 * 
		 * @return {null}
		 */
		function removeProperty (name) {
		    delete ctrl.properties[name];
		}

	}

})();