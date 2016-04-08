(function () {
	'use strict';

	angular.module('motech-admin')
		.controller('BundlesListController', bundlesListController);

	bundlesListController.$inject = ['$scope', 'bundles'];
	function bundlesListController ($scope, bundles) {
		console.log(bundles);
		$scope.bundles = bundles;
	}

})();