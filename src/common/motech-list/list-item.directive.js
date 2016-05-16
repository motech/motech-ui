(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechListItem', function(){
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                require: '^^motechList',
                templateUrl: '/common/motech-list/list-item.html',
                link: function(scope, element, attrs, MotechListCtrl){
                    scope.collapsible = MotechListCtrl.hasCollapsibleColumn;

                    jQuery('.list-item-main > [column-title]', element).each(function(index){
                        var element = jQuery(this);
                        element.attr('motech-list-column-id', index);
                        var sortable = false;
                        if(element.attr('sortable')){
                            sortable = true;
                        }
                        MotechListCtrl.addColumn(index, element.attr('column-title'), sortable);
                    });

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
            };
        });
})();