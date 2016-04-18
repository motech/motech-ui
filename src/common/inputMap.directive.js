(function(){

	'use strict';

	angular.module('motech-common')
		.directive('inputMap', mapInputDirective);

	mapInputDirective.$inject = ['motechAlert'];
	function mapInputDirective (motechAlert) {
		return {
			element: 'EA',
			replace: true,
			require: '?ngModel',
			templateUrl: '/common/inputMap.html',
			link: function (scope, element, attrs, ngModel) {
				console.log("Map Input");

				scope.title = "Map Input";
				if(attrs.title){
					scope.title = attrs.title;
				}

				ngModel.$render = function(){
					if(ngModel.$viewValue){
						scope.properties = ngModel.$viewValue;
					} else {
						scope.properties = {};
					}
				}

				scope.$watch('properties', function(value){
					ngModel.$setViewValue(value);
				}, true);

				scope.add = function (property) {
				    if (scope.properties[property.name] === undefined) {
				        scope.properties[property.name] = property.value;
				        scope.property = {};
				    } else {
				        motechAlert('email.header.error', 'email.settings.alreadyExist');
				    }
				};
				scope.remove = function (name) {
				    delete scope.properties[name];
				};

				scope.emptyFields = function (property) {
				    if (property === undefined) {
				        return true;
				    } else if (property.name === undefined || property.name === null || property.value === undefined || property.value === null) {
				        return true;
				    }
				    return false;
				};

			}
		};
	}
})();