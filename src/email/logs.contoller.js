(function(){
    'use strict';

    angular.module('motech-email')
        .controller('EmailLogsController', emailLogsController);

    emailLogsController.$inject = ['$scope', 'EmailLogsService'];
    function emailLogsController ($scope, EmailAuditService) {
        $scope.availableRange = ['all','table', 'month'];
        $scope.loggingRange = $scope.availableRange[0];

        $scope.change = function(selectedRange) {
            $scope.loggingRange = selectedRange;

            if($scope.loggingRange === 'month') {
                $('#exportDate').removeClass('hidden');
                $scope.month = $('#monthPicker').val();
            } else {
                $('#exportDate').addClass('hidden');
            }
        };

        $("#monthPicker").focus(function () {
            $(".ui-datepicker-current").hide();
        });

        $scope.exportEmailLog = function () {
            $('#exportEmailLogModal').modal('hide');
            $('#exportEmailLogForm').ajaxSubmit({
                type: 'GET',
                data: {
                    range: $scope.loggingRange,
                    month: $('#monthPicker').val()
                },
                success: function () {
                    window.location.replace("../email/emails/export?range="+$scope.loggingRange+"&month="+$('#monthPicker').val());
                    $('#exportEmailLogForm').resetForm();
                    $('#exportEmailLogModal').modal('hide');
                    $scope.change('all');
                }
            });
        };

        $scope.closeExportEmailLogModal = function () {
            $('#exportEmailLogForm').resetForm();
            $('#exportEmailLogModal').modal('hide');
            $scope.change('all');
        };
    }

})();