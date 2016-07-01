(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechList', list);

    /**
     * @memberOf motech-common
     * @ngdoc directive
     * @name  motechList
     *
     * @param {Boolean} Loading Indicates if data that will be displayed is loading.
     * @param {String} sortIndex Id of column that list is currently sorted by.
     * @param {Boolean} sortDesc Indicates if the list is sorted in descending order.
     *
     * @description 
     * Creates the frame around a list of objects which are rendered inside a transclude block. This directive exposes scope variables that can be used to set or get the state of the list.
     *
     * The list has transcluded blocks for header and footer elements, along with the main list portion.
     * 
     */

    list.$inject = [];
    function list(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: {
                'header': '?motechListHeader',
                'footer': '?motechListFooter'
            },
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

    /**
     * The link function for motech-list is responsible for rendering the column headings in the motech-list.
     * 
     * @memberOf motechList
     *
     * @param  {object} scope Scope of directive
     * @param  {DOMElement} element DOM element of directive
     * @param  {object} attrs Attributes from directive's DOM element
     * @param  {ngController} ctrl Reference to MotechListController
     *
     */
    function dataGridDirective(scope, element, attrs, ctrl){
        var totalColumnSpace;
        jQuery(window).resize(resizeGrid);
        scope.$on('motech-list.ready', resizeGrid);
        function resizeGrid(){
            if(ctrl.hasCollapsibleColumn){
                element.addClass('has-collapsible-content');
            } else {
                element.removeClass('has-collapsible-content');
            }

            element.width(element.parent().width());
            ctrl.columns.forEach(setColumnWidth);
            jQuery('.motech-list-rows li', element).each(function(){
                var row = jQuery(this);
                var totalWidth = row.width();
                var columnsSpace = 0;
                var hasMainItem = false;
                row.children().each(function(){
                    var cell = jQuery(this);
                    if(cell.hasClass('list-item-main')){
                        hasMainItem = true;
                    }
                    if(!cell.hasClass('list-item-main') && !cell.hasClass('motech-list-collapsible')){
                        columnsSpace += cell.outerWidth();
                    }
                });
                var extraSpace = totalWidth - columnsSpace; // 17px off?
                if(hasMainItem){
                    row.children('.list-item-main').width(extraSpace);
                } else {
                    
                }
            });

            var widest = 0;
            jQuery('.list-item-main', element).each(function(){
                var cell = jQuery(this);
                if(cell.outerWidth() > widest){
                    widest = cell.outerWidth();
                }
            });
            jQuery('.list-item-main', element).outerWidth(widest);

            jQuery('.motech-list-column-headers', element).children().each(function(){
                var col = jQuery(this);
                var widest = 0;
                jQuery('.motech-list-rows [motech-list-column-id="'+col.attr('motech-list-column-id')+'"]').each(function(){
                    var cell = jQuery(this);
                    if(cell.outerWidth() > widest){
                        widest = cell.outerWidth();
                    }
                });
                col.width(widest);
            });
        }

        function setColumnWidth(col){
            var widest = 0;
            if(jQuery('.motech-list-rows [motech-list-column-id="'+col.id+'"]', element).parent().hasClass('list-item-main')){
                return false;
            }
            jQuery('.motech-list-rows [motech-list-column-id="'+col.id+'"]', element).each(function(){
                var cell = jQuery(this);
                if(cell.outerWidth() > widest){
                    widest = cell.outerWidth() + 1;
                }
            });
            jQuery('.motech-list-rows [motech-list-column-id="'+col.id+'"]', element)
            .width(widest);
        }
    }
    
})();