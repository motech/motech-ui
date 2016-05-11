(function () {
    'use strict';

       angular.module('motech-email')
           .directive('emailLoggingGrid', function($http) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                try {
                    if (typeof($('#emailLoggingTable')[0].grid) !== 'undefined') {
                        return;
                    }
                }
                catch (e) {
                    return;
                }

                var elem = angular.element(element), filters;

                elem.jqGrid({
                    url: '../email/emails?deliveryStatus=ERROR,RECEIVED,SENT',
                    datatype: 'json',
                    jsonReader:{
                        repeatitems:false,
                        root: 'rows'
                    },
                    colModel: [{
                        name: 'id',
                        index: 'id',
                        hidden: true,
                        key: true
                    }, {
                        name: 'direction',
                        index: 'direction',
                        hidden: true
                    }, {
                        name: 'deliveryStatus',
                        index: 'deliveryStatus',
                        align: 'center',
                        width: 155
                    }, {
                        name: 'toAddress',
                        index: 'toAddress',
                        width: 200
                    },{
                        name: 'fromAddress',
                        index: 'fromAddress',
                        width: 200
                    }, {
                        name: 'subject',
                        index: 'subject',
                        width: 250
                    }, {
                        name: 'deliveryTime',
                        index: 'deliveryTime',
                        align: 'center',
                        width: 200
                    }],
                    pager: '#' + attrs.emailLoggingGrid,
                    sortname: 'deliveryTime',
                    rownumbers: true,
                    viewrecords: true,
                    subGrid: true,
                    subGridOptions: {
                        "plusicon" : "ui-icon-triangle-1-e",
                        "minusicon" : "ui-icon-triangle-1-s",
                        "openicon" : "ui-icon-arrowreturn-1-e"
                    },
                    subGridRowExpanded: function(subgrid_id, row_id) {
                        var subgrid_table_id, pager_id;
                        subgrid_table_id = subgrid_id+"_t";
                        pager_id = "p_"+subgrid_table_id;
                        $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class=''></table>");

                        jQuery("#"+subgrid_table_id).jqGrid({
                            url:'../email/emails/' +row_id,
                            datatype:"json",
                            jsonReader:{
                                repeatitems: false,
                                root:  'rows'
                            },
                            viewrecords: true,
                            colNames: ['Message'],
                            colModel: [
                                {name:"message",index:"message", align:"left", sortable: false, classes: "text"}
                            ],
                            rowNum:1,
                            pager: pager_id,
                            sortname: 'message',
                            sortorder: "asc",
                            height: '100%'
                        });
                        jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:false,add:false,del:false});

                        $('div.ui-widget-content').width('100%');
                        $('div.ui-jqgrid-bdiv').width('100%');
                        $('div.ui-jqgrid-view').width('100%');
                        $('div.ui-jqgrid-hdiv').width('auto');
                        $('table.ui-jqgrid-htable').width('100%');
                        $('table.ui-jqgrid-btable').width('100%');
                        $('div.ui-jqgrid-hbox').css({'padding-right':'0'});

                    },
                    loadComplete : function(array) {
                        angular.forEach(['direction', 'deliveryStatus', 'toAddress', 'fromAddress', 'subject', 'deliveryTime','message'], function (value) {
                            elem.jqGrid('setLabel', value, scope.msg('email.logging.' + value));
                            if (array.rows[0] !== undefined && !array.rows[0].hasOwnProperty(value)) {
                                elem.jqGrid('hideCol', value);
                                if ('message' === value) {
                                    elem.hideCol('subgrid');
                                }
                            }
                        });

                        $('#outsideEmailLoggingTable').children('div').css('width','100%');
                        $('.ui-jqgrid-htable').addClass('table-lightblue');
                        $('.ui-jqgrid-btable').addClass("table-lightblue");
                        $('.ui-jqgrid-htable').addClass('table-lightblue');
                        $('.ui-jqgrid-bdiv').width('100%');
                        $('.ui-jqgrid-hdiv').width('auto');
                        $('.ui-jqgrid-hbox').width('100%');
                        $('.ui-jqgrid-view').width('100%');
                        $('#t_emailLoggingTable').width('auto');
                        $('.ui-jqgrid-pager').width('100%');
                        $('#outsideEmailLoggingTable').children('div').each(function() {
                            $('table', this).width('100%');
                            $(this).find('#emailLoggingTable').width('100%');
                            $(this).find('table').width('100%');
                       });
                    }
                });
            }
        };
    });
})();