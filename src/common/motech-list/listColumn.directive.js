(function(){
    'use strict';

    angular.module('motech-common')
        .directive('motechListColumn', columnDirective);

    columnDirective.$inject = [];
    function columnDirective(){
        return {
            restrict: 'A',
            scope: true,
            require: '^^motechList',
            link: function(scope, element, attrs, MotechListCtrl){
                var sortable = false;
                if('sortable' in attrs){
                    sortable = true;
                }
                if('fitted' in attrs){
                    element.addClass('data-cell-fitted');
                }
                MotechListCtrl.addColumn(attrs.motechListColumn, attrs.title, sortable, element.attr('class'));
            }
        };
    }
})();