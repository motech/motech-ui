(function () {
	'use strict';

	angular.module('motech-auth')
		.factory('LoginModal', LoginModal);

	LoginModal.$inject = ['$q', '$compile', '$rootScope', 'BootstrapDialog'];
	function LoginModal ($q, $compile, $rootScope, BootstrapDialog) {
		return {
			show: function () {
				var deferred = $q.defer();

				BootstrapDialog.show({
					title: 'Login',
					message: $compile('<motech-login />')($rootScope),
					buttons: [],
					closable: false
				});

				return deferred.promise;
			}
		}
	}

})();