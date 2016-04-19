(function () {
	'use strict';

	angular.module('motech-common')
		.directive('motechDataGrid', dataGrid);

	dataGrid.$inject = [];
	function dataGrid(){
		return {
			restrict: 'EA',
			transclude: true,
			templateUrl: '/common/dataGrid.html',
			scope: {
				loading: '=',
				sortIndex: '=',
				sortDesc: '=',
				changeSort: '&'
			},
			controller: 'MotechDataGridController',
			controllerAs: 'DataGridCtrl'
		}
	}

})();