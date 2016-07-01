(function () {
    'use strict';

    /**
     * @memberOf motech-common
     * @ngdoc directive
     * @name motechListItem
     *
     * @description
     * A row in a motech-list which parses any columns to the MotechListController, and reformats the item to be displayed properly.
     */

    angular.module('motech-common')
        .directive('motechListItem', directive);

    function directive(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^^motechList',
            templateUrl: '/common/motech-list/list-item.html',
            link: linkFunction
        };
    }

    function linkFunction(scope, element, attrs, MotechListCtrl){
        readColumns(element, MotechListCtrl);
        formatItem(element);
    }

    /**
     * Looks through child elements in the motechListItem element, and passes any elements with column-title to motech-list
     *
     * @memberOf motechListItem
     * @param  {DOMElement} element motechListItem DOM Element
     * @param  {MotechListController} MotechListCtrl Reference to MotechListController
     *
     */
    function readColumns(element, MotechListCtrl){
        jQuery('.list-item-main > [column-title]', element).each(function(index){
            var element = jQuery(this);
            element.attr('motech-list-column-id', index);
            var sortable = false;
            if(element.attr('sortable')){
                sortable = true;
            }
            MotechListCtrl.addColumn(index, element.attr('column-title'), sortable);
        });
    }

    /**
     * Rearranges child elements in motechListElement
     *
     * @memberOf motechListItem
     * @param  {DOMElement} element motechListItem DOM Element
     * 
     */
    function formatItem(element){
        formatColumns(element);
        jQuery('.list-item-collapsible-toggle', element).appendTo(element);
        jQuery('.motech-list-collapsible', element).appendTo(element);
        jQuery('.list-item-main > nav', element).appendTo(element);

        var remainingContent = jQuery.trim(jQuery('.list-item-main', element).html());
        if(remainingContent === ""){
            jQuery('.list-item-main', element).remove();
        } else {
            element.parents('.motech-list:first').addClass('has-main-content');
        }
    }
    
    /**
     * Formats all columns in a motech-list item as a definition-list\
     *
     * @memberOf motechListItem
     * @param  {DOMElement} element motechListItem DOM element
     * 
     */
    function formatColumns(element){
        var columns = jQuery('motech-list-column, [motech-list-column]', element);
        if(columns.length > 0){
            var colList = jQuery('<dl></dl>').appendTo(element);
            columns.each(function(){
                var col = jQuery(this);
                colList.append('<dt>'+col.attr('column-title')+'</dt>');
                var def = jQuery('<dd>').appendTo(colList);
                def.append(col);
            });
        }
    }

})();