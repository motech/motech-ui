(function () {
	'use strict'

	angular.module('motech-admin')
		.config(adminRoutes);

	getAllBundles.$inject = ['$q', 'BundlesFactory'];
	function getAllBundles ($q, BundlesFactory) {
		var deferred = $q.defer();
		BundlesFactory.query({}, function (data) {
			deferred.resolve(data);
		}, function(){
			deferred.reject([]);
		});
		return deferred.promise;
	}

	adminRoutes.$inject = ['$stateProvider'];
	function adminRoutes ($stateProvider) {
		$stateProvider
		.state('bundles', {
			url: '/bundles',
			resolve: {
				bundles: getAllBundles
			},
			views: {
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

})();