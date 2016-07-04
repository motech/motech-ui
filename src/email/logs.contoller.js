(function(){
    'use strict';

    angular.module('motech-email')
        .controller('EmailLogsController', emailLogsController);

    emailLogsController.$inject = ['$compile', '$scope', 'EmailLogsService', 'ModalWindow', 'LoadingModal'];
    function emailLogsController ($compile, $scope, EmailLogsService, ModalWindow, LoadingModal) {
        
        EmailLogsService.get().then(updateRows);

        $scope.search = {};
        $scope.$watch('search', updateSearch, true);

        $scope.changePageTo = changePageTo;
        
        $scope.showExportModal = showExportModal;
        $scope.hideExportModal = hideExportModal;
        
        LoadingModal.open();

        function changePageTo(page){
            LoadingModal.open();
            EmailLogsService.getPage(page)
            .then(updateRows);
        }

        function updateRows(rows){
            $scope.logs = rows;
            $scope.totalItems = EmailLogsService.totalRecords;
            $scope.currentPage = EmailLogsService.currentPage;
            LoadingModal.close();
        }

        var searchUpdateTimeout;
        function updateSearch(searchData){
            if(searchUpdateTimeout){
                clearTimeout(searchUpdateTimeout);
                searchUpdateTimeout=null;
            }
            searchUpdateTimeout = setTimeout(function() {
                EmailLogsService.get(searchData)
                .then(updateRows);
            }, 1000);
        }

        var exporModal = ModalWindow(
            $compile('<email-export close="hideExportModal()"></email-export>')($scope),
            'Export (Translate ME)');
        function showExportModal(){
            exporModal.open();
        }
        function hideExportModal(){
            exporModal.close();
        }
    }

})();