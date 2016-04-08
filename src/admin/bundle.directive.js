(function(){
	'use strict';

	angular.module('motech-admin')
		.directive('motechBundle', motechBundleDirective);

	motechBundleDirective.$inject = ['$rootScope', 'ServerService'];
	function motechBundleDirective($rootScope, ServerService){
		
		function isActive(bundle){
			return bundle.state === "ACTIVE";
		}
		function getImgSrc(bundle){
			return ServerService.formatURL("module/server/module/icon?bundleId=" + bundle.bundleId);
		}

		return {
			restrict: 'EA',
			templateUrl: '/admin/bundle.html',
			scope:{
				bundle: '='
			},
			controller: 'BundleController',
			controllerAs: 'BundleCtrl',
			link: function (scope, element, attrs){
				scope.$watch('bundle', updatedBundle, true);
				updatedBundle();

				function updatedBundle(){
					if(!scope.bundle){
						element.remove();
					}else{
						scope.active = isActive(scope.bundle);
						scope.imgSrc = getImgSrc(scope.bundle);
					}
				}
			}
		}
	}

})();