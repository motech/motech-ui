(function () {
	'use strict'

	angular.module('motech-admin')
		.config(adminRoutes);

	adminRoutes.$inject = ['$stateProvider'];
	function adminRoutes ($stateProvider) {
		$stateProvider
		.state('bundles', {
			url: '/bundles',
			resolve: {
				bundles: getBundlesList
			},
			views: {
				mainNav: {
					templateUrl: '/common/nav-main.html'
				},
				secondaryNav: {
					templateUrl: '/admin/nav-secondary.admin.html',
				},
				appArea: {
					templateUrl: '/admin/bundlesList.html',
					controller: 'BundlesListController'
				}
			}
		});
	}

	getBundlesList.$inject = ['$q', 'BundlesFactory'];
	function getBundlesList ($q, BundlesFactory) {
		var deferred = $q.defer();
		BundlesFactory.query(function (data) {
			deferred.resolve(data);
		}, function(){
			deferred.reject([]);
		});
		return deferred.promise;
	}
})();