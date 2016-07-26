(function(){
   'use strict';

    angular.module('motech-admin')
        .directive('messagesDatePicker', messagesDatePicker);

    function messagesDatePicker() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var elem = angular.element(element),
                   otherDateTextBox = {},
                   curId = attrs.id,
                   curIdLength = curId.length,
                   otherId = '',
                   isStartDate = false;

                if(curId.substr(curIdLength-2,2) === 'To') {
                   otherId = curId.slice(0,curIdLength - 2) + 'From';
                }
                else {
                   otherId = curId.slice(0,curIdLength - 4) + 'To';
                   isStartDate = true;
                }
                otherDateTextBox = angular.element('#' + otherId);

                elem.datetimepicker({
                    dateFormat: "yy-mm-dd",
                    changeMonth: true,
                    changeYear: true,
                    timeFormat: "HH:mm:ss",
                    onSelect: function (selectedDateTime){
                        if(isStartDate) {
                            otherDateTextBox.datetimepicker('option', 'minDate', elem.datetimepicker('getDate') );
                        }
                        else {
                            otherDateTextBox.datetimepicker('option', 'maxDate', elem.datetimepicker('getDate') );
                        }
                        if(curId === "messagesDateTimeFrom") {
                            scope.setDateTimeFilter(selectedDateTime, null);
                        }
                        else if(curId === "messagesDateTimeTo") {
                            scope.setDateTimeFilter(null, selectedDateTime);
                        }
                    },
                    onChangeMonthYear: function (year, month, inst) {
                        var curDate = $(this).datepicker("getDate");
                        if (curDate === null) {
                            return;
                        }
                        if (curDate.getFullYear() !== year || curDate.getMonth() !== month - 1) {
                            curDate.setYear(year);
                            curDate.setMonth(month - 1);
                            $(this).datepicker("setDate", curDate);
                        }
                        if(curId === "messagesDateTimeFrom") {
                            scope.setDateTimeFilter(curDate, null);
                        }
                        else if(curId === "messagesDateTimeTo") {
                            scope.setDateTimeFilter(null, curDate);
                        }
                    },
                    onClose: function () {
                        var viewValue = $(this).val();
                        if (viewValue === '') {
                            if(isStartDate) {
                                otherDateTextBox.datetimepicker('option', 'minDate', null);
                            }
                            else {
                                otherDateTextBox.datetimepicker('option', 'maxDate', null);
                            }
                        } else {
                            if(isStartDate) {
                                otherDateTextBox.datetimepicker('option', 'minDate', elem.datetimepicker('getDate') );
                            }
                            else {
                                otherDateTextBox.datetimepicker('option', 'maxDate', elem.datetimepicker('getDate') );
                            }
                        }
                        if(curId === "messagesDateTimeFrom") {
                            scope.setDateTimeFilter(viewValue, null);
                        }
                        else if(curId === "messagesDateTimeTo") {
                            scope.setDateTimeFilter(null, viewValue);
                        }
                    }
                });
            }
        };
    }
})();