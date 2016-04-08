(function () {
	'use strict';

	angular.module('motech-dashboard')
		.config(dashboardRoutes);

	dashboardRoutes.$inject = ['$urlRouterProvider'];
	function dashboardRoutes($urlRouterProvider) {
		$urlRouterProvider.otherwise("/bundles");
	}

})();