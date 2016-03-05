(function () {
	'use strict';

	angular.module('motech-server')
		.directive('motechServerStatus', statusDirective);

	statusDirective.$inject = ['ServerStatusService'];
	function statusDirective(ServerStatusService) {
		return {
			restrict: 'EA',
			replace: true,
			scope:{},
			templateUrl: '/server/status.html',
			link: function (scope, element, attrs) {
				scope.$watchCollection(function(){
					return ServerStatusService.errors;
				}, function (errors) {
					if(errors.length > 0){
						scope.hasErrors = true;
						scope.errors = errors;
					} else {
						scope.hasErrors = false;
						scope.errors = [];
					}
				});
				scope.$watch(function(){
					return ServerStatusService.running;
				}, function (value) {
					scope.running = value;
				})
			}
		}
	}

})();