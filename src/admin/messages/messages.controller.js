(function(){
    'use strict';

    angular.module('motech-admin')
        .controller('MessagesController', messagesController);

    messagesController.$inject = ['$scope', '$rootScope', '$timeout', '$location', 'MessagesFactory', 'i18nService',
                                    '$cookieStore', '$filter', 'ModalFactory', 'LoadingModal'];
    function messagesController ($scope, $rootScope, $timeout, $location, MessagesFactory, i18nService,
                                    $cookieStore, $filter, ModalFactory, LoadingModal) {

         var UPDATE_INTERVAL = 1000 * 30, searchQuery = '',
         IGNORED_MSGS = 'ignoredMsgs',
         checkLevel = function (messageLevel, filterLevel) {
             var result;
             jQuery.each(filterLevel, function (i, val) {
                 result = (val === messageLevel);
                 return (!result);
             });
             return result;
         },
         checkDateTime = function (mDateTime, fDateTimeFrom, fDateTimeTo) {
             var messageDateTime = parseInt(mDateTime, 10);
             var filterDateTimeFrom = parseInt(fDateTimeFrom, 10);
             var filterDateTimeTo = parseInt(fDateTimeTo, 10);

             if (!(filterDateTimeFrom && filterDateTimeTo) ||
                (messageDateTime && ((messageDateTime < filterDateTimeTo) || (!filterDateTimeTo && filterDateTimeFrom)))) {
                 return true;
             }

             return false;
         },
         searchMatch = function (message, searchQuery) {
             var result;
             if ((!searchQuery) && (checkDateTime(message.date, $rootScope.filterDateTimeFrom, $rootScope.filterDateTimeTo))) {
                 if (($rootScope.filterModule === '') || (message.moduleName === $rootScope.filterModule)) {
                     result = (($scope.filterSearch.filterLevel && $scope.filterSearch.filterLevel.length === 0) || (checkLevel(message.level, $scope.filterSearch.filterLevel)));
                     return result;
                 }
             } else if ((searchQuery && message.text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) &&
                       (checkDateTime(message.date, $rootScope.filterDateTimeFrom, $rootScope.filterDateTimeTo))) {
                 if ($rootScope.filterModule === '') {
                     result = (($scope.filterSearch.filterLevel && $scope.filterSearch.filterLevel.length === 0) ||
                              (checkLevel(message.level, $scope.filterSearch.filterLevel)));
                     return result;
                 } else if (message.moduleName === $rootScope.filterModule) {
                     result = (($scope.filterSearch.filterLevel && $scope.filterSearch.filterLevel.length === 0) ||
                              (checkLevel(message.level, $scope.filterSearch.filterLevel)));
                     return result;
                 }
             }

             return false;
         },
         messageFilter = function (data) {
             var msgs = jQuery.grep(data, function (message, index) {
                 return jQuery.inArray(message.id, $scope.ignoredMessages) === -1; // not in ignored list
             });
             $scope.getModuleName = function(messages) {
                 var moduleNames = ["all"];
                 jQuery.each(messages, function(i, messages){
                     moduleNames.push(messages.moduleName);
                 });
             return  $.grep(moduleNames, function(el, index) {
                 return index === $.inArray(el, moduleNames);
             });
             };
             $scope.messages = msgs;
             $scope.modules = $scope.getModuleName($scope.messages);
             $rootScope.search();
         },
         update = function () {
             var i;
             MessagesFactory.query(function (newMessages) {
                 function messagesEqual(arg1, arg2) {
                     if (arg1.length !== arg2.length) {
                         return false;
                     }
                     for (i = arg1.length - 1; i >= 0; i-=1) {
                         if (arg1[i].id !== arg2[i].id) {
                             return false;
                         }
                     }
                     return true;
                 }
                 if (!messagesEqual(newMessages, $scope.messages)) {
                     messageFilter(newMessages);
                 }
             });
         };

         $scope.resetItemsPagination = function () {
             $scope.pagedItems = [];
             $scope.currentPage = 0;
         };

         $scope.groupToPages = function (filteredItems, itemsPerPage) {
             var i;
             $scope.pagedItems = [];

             for (i = 0; i < filteredItems.length; i += 1) {
                 if (i % itemsPerPage === 0) {
                     $scope.pagedItems[Math.floor(i / itemsPerPage)] = [ filteredItems[i] ];
                 } else {
                     $scope.pagedItems[Math.floor(i / itemsPerPage)].push(filteredItems[i]);
                 }
             }
         };

         $rootScope.filterModule = '';
         $rootScope.filterDateTimeFrom = '';
         $rootScope.filterDateTimeTo = '';

         $scope.resetItemsPagination();
         $scope.filteredItems = [];
         $scope.limitPages = [10, 20, 50];
         $scope.itemsPerPage = $scope.limitPages[0];

         $scope.filterSearch = {};
         $scope.ignoredMessages = $cookieStore.get(IGNORED_MSGS);
         $scope.messages = [];
         $scope.levelCheckboxes = [
             {label: "admin.messages.critical", value: "CRITICAL"},
             {label: "admin.messages.error", value: "ERROR"},
             {label: "admin.messages.debug", value: "DEBUG"},
             {label: "admin.messages.info", value: "INFO"},
             {label: "admin.messages.warn", value: "WARN"}
         ];
         $scope.filterSearch.query = '';

         MessagesFactory.query(function (data) {
             messageFilter(data);
         });

         $scope.getCssClass = function (msg) {
             var cssClass = 'msg';
             switch (msg.level) {
             case 'ERROR':
                 cssClass += ' badge-important';
                 break;
             case 'OK':
                 cssClass += ' badge-info';
                 break;
             case 'CRITICAL':
                 cssClass += ' badge-important';
                 break;
             case 'WARN':
                 cssClass += ' badge-warning';
                 break;
             case 'DEBUG':
                 cssClass += ' badge-success';
                 break;
             case 'INFO':
                 cssClass += ' badge-info';
                 break;
             }
             return cssClass;
         };

         $scope.printText = function (text) {
             var result = text;
             if (text.match(/^\{[\w\W]*\}$/)) {
                 result = i18nService.getMessage(text.replace(/[\{\}]/g, ""));
             }
             return result;
         };

         $scope.refresh = function () {
             LoadingModal.open();
             $location.path('/messages');
             MessagesFactory.query(function (data) {
                 messageFilter(data);
             });
         };

         MessagesFactory.prototype.getDate = function () {
             return new Date(this.date);
         };

         $scope.remove = function (message) {
             var i = $scope.messages.indexOf(message);
             if (i !== -1) {
                 $scope.messages.splice(i, 1);
             }
             if ($scope.ignoredMessages === undefined) {
                 $scope.ignoredMessages = [];
             }
             $scope.ignoredMessages.push(message.id);
             $cookieStore.put(IGNORED_MSGS, $scope.ignoredMessages);
             $scope.refresh();
         };

         $scope.setCurrentPage = function (currentPage) {
             $scope.currentPage = currentPage;
         };

         $rootScope.changeItemsPerPage = function (itemsPerPage) {
             $scope.itemsPerPage = itemsPerPage;
             $scope.setCurrentPage(0);
             $scope.groupToPages($scope.filteredItems, $scope.itemsPerPage);
         };

         $scope.search = function() {
             LoadingModal.open();
             $rootScope.query = $scope.filterSearch.query;
             $rootScope.search();
         };

         $rootScope.search = function () {
             LoadingModal.close();
             $scope.filteredItems = $filter('filter')($scope.messages, function (item) {
                 return item && searchMatch(item, $rootScope.query);
             });
             $scope.setCurrentPage(0);
             $scope.groupToPages($scope.filteredItems, $scope.itemsPerPage);
         };

         $scope.printDate = function (milis) {
             var date = "";
             if (milis) {
                 date = new Date(milis);
             }
             return date;
         };

         $scope.setFilterModule = function(filterModule) {
             LoadingModal.open();
             if (filterModule.toLowerCase() === 'all') {
                 $scope.filterModule = filterModule;
                 $rootScope.filterModule = '';
             } else {
                 $scope.filterModule = filterModule;
                 $rootScope.filterModule = $scope.filterModule;
             }
             $scope.search();
         };

         $scope.setDateFrom = function(dateFrom) {
             $scope.setDateTimeFilter(dateFrom, $rootScope.filterDateTimeTo);
         };

         $scope.setDateTo = function(dateTo) {
             $scope.setDateTimeFilter($rootScope.filterDateTimeFrom, dateTo);
         };

         $scope.setDateTimeFilter = function(messageDateTimeFrom, messageDateTimeTo) {
             if (messageDateTimeFrom !== null) {
                 $rootScope.filterDateTimeFrom = moment(messageDateTimeFrom).toDate().getTime();
             }
             else {
                 messageDateTimeFrom = '';
             }

             if (messageDateTimeTo !== null) {
                 $rootScope.filterDateTimeTo = moment(messageDateTimeTo).toDate().getTime();
             }
             else {
                 messageDateTimeTo = '';
             }

             $scope.search();
         };

         $timeout(update, UPDATE_INTERVAL);
    }

})();
