(function(){
	'use strict';

	angular.module('motech-server')
		.constant('MessageFormat', MessageFormat)
		.factory('i18nInterpolator', interpolatorFactory);

	function interpolatorFactory(MessageFormat){
		var formatter;
		return {
			setLocale: function (locale) {
				formatter = new MessageFormat(locale);
			},
			getInterpolationIdentifier: function () {
				return 'i18nInterpolator';
			},
			interpolate: function (string, params) {
				if(!formatter){
					return string;
				}
				var message = formatter.compile(string);
				return message(params);
			}
		};
	}

})();