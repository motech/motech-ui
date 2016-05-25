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
        jQuery(window).resize(resizeGrid);
        scope.$on('motech-list.ready', resizeGrid);
        function resizeGrid(){
            element.width(element.parent().width());
            ctrl.columns.forEach(setColumnWidth);
        }

        function setColumnWidth(col){
            var widest = 0;
            if(jQuery('.motech-list-rows [motech-list-column-id="'+col.id+'"]', element).parent().hasClass('list-item-main')){
                return false;
            }
            jQuery('.motech-list-rows [motech-list-column-id="'+col.id+'"]', element).each(function(){
                var cell = jQuery(this);
                if(cell.width() > widest){
                    widest = cell.width() + 1;
                }
            });
            jQuery('[motech-list-column-id="'+col.id+'"]', element)
            .width(widest)
            .css('display', 'inline-block');
        }
    }
    
})();