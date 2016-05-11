(function(){
    'use strict';

    angular.module('motech-email')
        .controller('EmailLogsController', emailLogsController);

    emailLogsController.$inject = ['$compile', '$scope', 'ServerService', 'PagiableServiceFactory', 'BootstrapDialog'];
    function emailLogsController ($compile, $scope, ServerService, PagiableServiceFactory, BootstrapDialog) {
        var emailUrl = ServerService.formatURL('module/email/emails');
        var emailLogsService = PagiableServiceFactory(emailUrl);

        emailLogsService.get().then(updateRows);

        $scope.search = {};
        $scope.$watch('search', updateSearch, true);

        $scope.pageChanged = changePage;
        
        $scope.showExportModal = showExportModal;
        $scope.hideExportModal = hideExportModal;

        function changePage(){
            emailLogsService.getPage($scope.currentPage)
            .then(updateRows);
        }

        function updateRows(rows){
            $scope.logs = rows;
            $scope.totalItems = emailLogsService.totalRecords;
            $scope.currentPage = emailLogsService.currentPage;
        }

        var searchUpdateTimeout;
        function updateSearch(searchData){
            if(searchUpdateTimeout){
                clearTimeout(searchUpdateTimeout);
                searchUpdateTimeout=null;
            }
            searchUpdateTimeout = setTimeout(function() {
                emailLogsService.get(searchData)
                .then(updateRows);
            }, 1000);
        }

        var exporModal = new BootstrapDialog({
            title: 'Export (Translate ME)',
            message: $compile('<email-export close="hideExportModal()"></email-export>')($scope)
        });
        function showExportModal(){
            exporModal.open();
        }
        function hideExportModal(){
            exporModal.close();
        }
    }

})();