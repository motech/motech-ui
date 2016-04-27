(function(){
	'use strict';

	angular.module('motech-common')
		.controller('NavSectionController', controller);

	controller.$inject = ['$scope', 'NavSectionService'];
	function controller($scope, NavSectionService){
		this.sections = NavSectionService.sections;
		this.isActive = NavSectionService.isActive;
		this.activate = NavSectionService.activate;
	}

})();