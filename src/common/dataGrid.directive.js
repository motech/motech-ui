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
			controllerAs: 'DataGridCtrl',
			link: dataGridDirective
		}
	}

	function dataGridDirective(scope, element, attrs, ctrl){
		jQuery(window).resize(resize);
		scope.$on('datagrid.ready', resize);

		function resize(){
			scope.columns.forEach(function(column){
				var widest = 0;
				jQuery('[motech-data-grid-column='+column.id+'], #data-grid-column-'+column.id, element).each(function(){
					if($(this).width() > widest){
						widest = $(this).width();
					}
				});
				jQuery('[motech-data-grid-column='+column.id+'], #data-grid-column-'+column.id, element).width(widest);

			})
		}
	}

})();