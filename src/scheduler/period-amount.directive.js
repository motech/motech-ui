(function(){
    'use strict';

    /**
     * @memberOf motech-scheduler
     * @ngdoc directive
     * @name  PeriodAmount
     * @scope true
     *
     * @param { } ng-model Takes variable that contains a string
     *
     * @description
     * Creates repeat period string which is set by adjusting sliders for year, month, day, hour, minute and seconds.
     * This directive is used in jobs form in Scheduler module when creating repeating period job.
     *
     * Period string is representing time which separates two events, for example firing a job. It is made up with ordered values standing for number of years, months, weeks, days, hours, minutes and seconds. These values must appear in such order for a period string to be a valid one. If a certain value is equal to 0 (zero) then it is not included in a period string.
     *
     * Period string starts with a letter 'P'. Then there can appear values for years (Y), months (M), weeks (W) and days (D). Afterwords there is a letter 'T' and values for hours (H), minutes (M) or seconds (S). If all three values for hours, minutes and seconds are equal to 0 (zero) then letter 'T' is not included in a period string.
     * For a better understanding here are some examples of different period strings:
     *
     * 'P2Y3M5W10DT1H45M30S' stands for a period: 2 years, 3 months, 5 weeks, 10 days, 1 hour, 45 minutes and 30 seconds.
     *
     * 'P5WT1H45M30S'        stands for a period: 5 weeks, 1 hour, 45 minutes and 30 seconds. Values for years, months and days do not appear as they are equal to 0 (zero).
     *
     * 'PT1H45M'             stands for a period: 1 hour and 45 minutes.
     *
     * 'P1M10D'              stands for a period: 1 months and 10 days. There is no letter 'T' in this example as all values for hours, minutes and seconds are equal to 0 (zero).
     *
     * This directive expects ng-model to be either a period string or undefined.
     *
     */

    angular.module('motech-scheduler')
        .directive('periodAmount', periodAmountDirective);

    function periodAmountDirective () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var elem = angular.element(element),
                periodSliders = $("#period-slider > div"),
                periodSlider = $("#period-slider"),
                parent = elem.parent(),
                started = false,
                openPeriodModal,
                closePeriodModal,
                year = '0',
                month = '0',
                week = '0',
                day = '0',
                hour = '0',
                minute = '0',
                second = '0',
                sliderMax = {
                    year: 10,
                    month: 24,
                    week: 55,
                    day: 365,
                    hour: 125,
                    minute: 360,
                    second: 360
                },

                /**
                 * Creates a period string based on passed parameters
                 *
                 * @memberOf PeriodAmount
                 * @param {number} year Value for years
                 * @param {number} month Value for months
                 * @param {number} week Value for weeks
                 * @param {number} day Value for days
                 * @param {number} hour Value for hours
                 * @param {number} minute Value for minutes
                 * @param {number} second Value for seconds
                 *
                 * @returns {string} Period string
                 *
                 */

                compileValueInputs = function (year, month, week, day, hour, minute, second) {
                    var valueInputs = [
                        year.toString( 10 ),
                        month.toString( 10 ),
                        week.toString( 10 ),
                        day.toString( 10 ),
                        hour.toString( 10 ),
                        minute.toString( 10 ),
                        second.toString( 10 )
                    ],
                    valueInputsName = ['Y', 'M', 'W', 'D', 'H', 'M', 'S'];

                    $.each( valueInputs, function( nr, val ) {
                        if (nr < 4 && val !== '0') {
                            valueInputs[ nr ] = val + valueInputsName[ nr ];
                        }
                        if ( (valueInputsName[ nr ] === 'H' || valueInputsName[ nr ] === 'M' || valueInputsName[ nr ] === 'S' ) &&  val !== '0' && nr > 3 ) {
                            valueInputs[ nr ] = val + valueInputsName[ nr ];
                            if (valueInputs[ 4 ].indexOf('T') === -1 && valueInputs[ 5 ].indexOf('T') === -1 && valueInputs[ 6 ].indexOf('T') === -1) {
                                valueInputs[ nr ] = 'T' + val + valueInputsName[ nr ];
                            }
                        }
                        if ( val === '0' ) {
                            valueInputs[ nr ] = '';
                        }
                    });
                    return 'P' + valueInputs.join( "" ).toUpperCase();
                },

                /**
                 * Updates the value of the ng-model containing a period string. It is invoked on change of any of the sliders.
                 *
                 * @memberOf PeriodAmount
                 *
                 */

                refreshPeriod = function () {
                    var fieldId = elem.attr('mds-field-id'),
                    year = periodSlider.children( "#period-year" ).slider( "value" ),
                    month = periodSlider.children( "#period-month" ).slider( "value" ),
                    week = periodSlider.children( "#period-week" ).slider( "value" ),
                    day = periodSlider.children( "#period-day" ).slider( "value" ),
                    hour = periodSlider.children( "#period-hour" ).slider( "value" ),
                    minute = periodSlider.children( "#period-minute" ).slider( "value" ),
                    second = periodSlider.children( "#period-second" ).slider( "value" ),

                    valueFromInputs = compileValueInputs(year, month, week, day, hour, minute, second);

                    periodSlider.children( "#amount-period-year" ).val( year );
                    periodSlider.children( "#amount-period-month" ).val( month );
                    periodSlider.children( "#amount-period-week" ).val( week );
                    periodSlider.children( "#amount-period-day" ).val( day );
                    periodSlider.children( "#amount-period-hour" ).val( hour );
                    periodSlider.children( "#amount-period-minute" ).val( minute );
                    periodSlider.children( "#amount-period-second" ).val( second );
                    scope.$apply(function () {
                        elem.val( valueFromInputs );
                    });
                    scope.$apply(function() {
                        ctrl.$setViewValue(valueFromInputs);
                    });
                    element.focus();
                    element.focusout();
                },

                /**
                 * Updates both value and position of each slider based on the value of the ng-model containing a period string. If period string is invalid it sets all sliders to zero.
                 *
                 * @memberOf PeriodAmount
                 *
                 */

                setParsingPeriod = function () {
                    if (!started) {
                        periodSliders = $("#period-slider > div");
                        periodSlider = $("#period-slider");
                        periodSliders.each(function(index) {
                            var getValueSettings, valueName = (this.id);
                            valueName = valueName.substring(valueName.lastIndexOf('-') + 1);
                            getValueSettings = function (param1, param2) {
                                var result, resultVal = '';
                                $.each( param1, function( key, value) {
                                    if (key === param2){
                                        result = true;
                                        resultVal = value;
                                    } else {
                                        result = false;
                                    }
                                return (!result);
                                });
                            return resultVal;
                            };

                            $( this ).empty().slider({
                                value: getValueSettings([year, month, week, day, hour, minute, second], valueName),
                                range: "min",
                                min: 0,
                                max: getValueSettings(sliderMax, valueName),
                                animate: true,
                                orientation: "horizontal",
                                slide: refreshPeriod,
                                change: refreshPeriod
                            });
                            periodSlider.children( "#amount-period-" + valueName ).val( $( this ).slider( "value" ) );
                        });
                        started = true;
                    }
                    var valueElement = elem.val(), valueDate, valueTime, fieldId = elem.attr('mds-field-id'),
                    checkValue = function (param) {
                        if(isNaN(param) || param === null || param === '' || param === undefined) {
                            param = '0';
                            return param;
                        } else {
                            return param;
                        }
                    },
                    parseDate = function (valueDate) {
                        if (valueDate.indexOf('Y') !== -1) {
                            year = checkValue(valueDate.slice(0, valueDate.indexOf('Y')).toString( 10 ));
                            valueDate = valueDate.substring(valueDate.indexOf('Y') + 1, valueDate.length);
                        } else {
                            year = '0';
                        }
                        if (valueDate.indexOf('M') !== -1) {
                            month = checkValue(valueDate.slice(0, valueDate.indexOf('M')).toString( 10 ));
                            valueDate = valueDate.substring(valueDate.indexOf('M') + 1, valueDate.length);
                        } else {
                            month = '0';
                        }
                        if (valueDate.indexOf('W') !== -1) {
                            week = checkValue(valueDate.slice(0, valueDate.indexOf('W')).toString( 10 ));
                            valueDate = valueDate.substring(valueDate.indexOf('W') + 1, valueDate.length);
                        } else {
                            week = '0';
                        }
                        if (valueDate.indexOf('D') !== -1) {
                            day = checkValue(valueDate.slice(0, valueDate.indexOf('D')).toString( 10 ));
                        } else {
                            day = '0';
                        }
                    },
                    parseTime = function (valueTime) {
                        if (valueTime.indexOf('H') !== -1) {
                            hour = checkValue(valueTime.slice(0, valueTime.indexOf('H')));
                            valueTime = valueTime.substring(valueTime.indexOf('H') + 1, valueTime.length);
                        } else {
                            hour = '0';
                        }
                        if (valueTime.indexOf('M') !== -1) {
                            minute = checkValue(valueTime.slice(0, valueTime.indexOf('M')));
                            valueTime = valueTime.substring(valueTime.indexOf('M') + 1, valueTime.length);
                        } else {
                            minute = '0';
                        }
                        if (valueTime.indexOf('S') !== -1) {
                            second = checkValue(valueTime.slice(0, valueTime.indexOf('S')));
                            valueTime = valueTime.substring(valueTime.indexOf('S') + 1, valueTime.length);
                        } else {
                            second = '0';
                        }
                    };

                    if (valueElement.indexOf('T') > 0) {
                        valueTime = valueElement.slice(valueElement.indexOf('T') + 1, valueElement.length);
                        parseTime(valueTime);
                        valueDate = valueElement.slice(1, valueElement.indexOf('T'));
                        parseDate(valueDate);
                    } else {
                        valueDate = valueElement.slice(1, valueElement.length);
                        parseDate(valueDate);
                        hour = '0'; minute = '0'; second = '0';
                    }

                    periodSlider.children( "#amount-period-year" ).val( year );
                    periodSlider.children( "#amount-period-month" ).val( month );
                    periodSlider.children( "#amount-period-week" ).val( week );
                    periodSlider.children( "#amount-period-day" ).val( day );
                    periodSlider.children( "#amount-period-hour" ).val( hour );
                    periodSlider.children( "#amount-period-minute" ).val( minute );
                    periodSlider.children( "#amount-period-second" ).val( second );

                    periodSlider.children( "#period-year" ).slider("value", year);
                    periodSlider.children( "#period-month" ).slider( "value", month);
                    periodSlider.children( "#period-week" ).slider( "value", week);
                    periodSlider.children( "#period-day" ).slider( "value", day);
                    periodSlider.children( "#period-hour" ).slider( "value", hour);
                    periodSlider.children( "#period-minute" ).slider( "value", minute);
                    periodSlider.children( "#period-second" ).slider( "value", second );
                };

                elem.parent().find('.period-modal-opener').on('click', function() {
                    setParsingPeriod();
                    $("#periodModal").modal('show');
                });

            }
        };
    }
}());