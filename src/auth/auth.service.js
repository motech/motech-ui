(function () {
	'use strict';

	angular.module('motech-auth')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$q', '$http', '$rootScope', 'authService', 'ServerService', 'LoadingModal'];
	function AuthService ($q, $http, $rootScope, authService, ServerService, LoadingModal) {
		var service = this;

		this.user = false;
		this.login = login;
		this.logout = logout;
		this.getCurrentUser = getCurrentUser;

		function login (username, password) {
			var deferred = $q.defer();

			var promise = $http({
				url: ServerService.formatURL('module/server/motech/j_spring_security_check'),
				method: 'POST',
				data: {
					j_username: username,
					j_password: password
				},
				ignoreAuthModule: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			});
			
			promise.then(function () {
				authService.loginConfirmed();
				deferred.resolve();
				$rootScope.$emit('motech.authenticated');
			});
			promise.catch(function(response){
				if(response.data && response.data.message){
					deferred.reject(response.data.message);
				} else {
					deferred.reject();
				}
			})

			return deferred.promise;
		}

		function getCurrentUser(){
			if(service.user){
				return $q.when(service.user);
			}
			var deferred = $q.defer();
			$http.post(ServerService.formatURL('/module/server/getUser'),{})
			.then(function(response){
				service.user = response.data.userName;
				deferred.resolve(service.user);
			}).catch(function(){
				deferred.reject(false);
			});
			return deferred.promise;
		}

		function logout(){
			LoadingModal.open();
			return $http.get(ServerService.formatURL('module/server/j_spring_security_logout'))
			.finally(function(){
				LoadingModal.close();
				service.user = false;
				$rootScope.$broadcast('motech.refresh');
			});
		}

	}

})();