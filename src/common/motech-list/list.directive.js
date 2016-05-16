(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechList', list);

    list.$inject = [];
    function list(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: '/common/motech-list/list.html',
            scope: {
                loading: '=',
                sortIndex: '=',
                sortDesc: '=',
                changeSort: '&'
            },
            controller: 'MotechListController',
            controllerAs: 'MotechListCtrl',
            link: dataGridDirective
        };
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

            });
        }
    }

})();