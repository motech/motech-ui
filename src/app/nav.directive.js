(function () {
	'use strict';

	angular.module('motech-common')
		.directive('appNav', directive);

	directive.$inject = ['$rootScope'];
	function directive($rootScope){
		return {
			restrict: 'EAC',
			link: function(scope, element, attrs){
				jQuery('.app-nav-button').on('click', function(event){
					event.preventDefault();
					show();
				});

				jQuery('body').on('click', '.app-nav-backdrop', function(event){
					event.preventDefault();
					hide();
				});
				$rootScope.$on('$stateChangeStart', function(){
					hide();
				});
				function show(){
					jQuery('.app-nav-button').addClass('active');
					element.addClass('is-open');
					jQuery('body').append('<div class="app-nav-backdrop"></div>');
				}
				function hide(){
					element.removeClass('is-open');
					jQuery('.app-nav-button.active').removeClass('active');
					jQuery('.app-nav-backdrop').remove();
				}
			}
		}
	}

})();