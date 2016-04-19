(function(){
	'use strict';

	angular.module('motech-email')
		.directive('emailExport', emailExport);

	function emailExport () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var elem = angular.element(element),
                    endDateTextBox = angular.element('#monthPicker'),
                    datepickerParent = angular.element('#ui-datepicker-div').parent();


                elem.datepicker({
                    dateFormat: "mm-yy",
                    changeMonth: true,
                    changeYear: true,
                    showButtonPanel: true,
                    maxDate: +0,
                    onClose: function(dateText, inst) {
                        var month, year;
                        month = $(".ui-datepicker-month :selected").val();
                        year = $(".ui-datepicker-year :selected").val();
                        $(this).datepicker('setDate', new Date(year, month, 1));
                        $('#ui-datepicker-div').removeClass('nodays');
                        datepickerParent.append(angular.element('#ui-datepicker-div'));
                    },
                    beforeShow: function(input, inst) {
                        var dateString, options;
                        dateString = $(this).val();
                        options = {};
                        if (dateString.length > 0) {
                            options.defaultDate = $.datepicker.parseDate("dd-" + $(this).datepicker("option", "dateFormat"), "01-" + dateString);
                        }
                        if ($.contains(angular.element('#exportEmailLogModal'), angular.element('#ui-datepicker-div'))) {
                            datepickerParent.append(angular.element('#ui-datepicker-div'));
                        } else {
                            angular.element('#exportEmailLogModal').append(angular.element('#ui-datepicker-div'));
                        }
                        if ($(input).hasClass('nodays')) {
                                $('#ui-datepicker-div').addClass('nodays');
                            } else {
                                $('#ui-datepicker-div').removeClass('nodays');
                                $(this).datepicker('option', 'dateFormat', 'yy-mm');
                            }
                        return options;
                    }
                });
            }
        };
    }

})();