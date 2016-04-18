(function (){
	'use strict';

	angular.module('motech-server')
		.config(i18nSetLoader);

	i18nSetLoader.$inject = ['$translateProvider'];
	function i18nSetLoader ($translateProvider){
		$translateProvider.useSanitizeValueStrategy('sanitize');
		$translateProvider.preferredLanguage('en');
		$translateProvider.useLoader('i18nLoader');
	}

})();