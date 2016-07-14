(function(){
    'use strict';

    angular.module('motech-admin')
        .controller('MessagesController', messagesController);

    messagesController.$inject = ['$scope', '$rootScope', '$timeout', 'MessagesFactory', 'i18nService',
                                    '$cookieStore', '$filter', 'ModalFactory', 'LoadingModal'];
    function messagesController ($scope, $rootScope, $timeout, MessagesFactory, i18nService,
                                    $cookieStore, $filter, ModalFactory, LoadingModal) {
         var UPDATE_INTERVAL = 1000 * 30, searchQuery = '',
         IGNORED_MSGS = 'ignoredMsgs',
         checkLevel = function (messageLevel, filterLevel) {
             var result;
             jQuery.each(filterLevel, function (i, val) {
                 if (val === messageLevel.toLowerCase()){
                     result = true;
                 } else {
                     result = false;
                 }
                 return (!result);
             });
             return result;
         },
         checkDateTime = function (mDateTime, fDateTimeFrom, fDateTimeTo) {
             var result;
             var messageDateTime = parseInt(mDateTime, 10);
             var filterDateTimeFrom = parseInt(fDateTimeFrom, 10);
             var filterDateTimeTo = parseInt(fDateTimeTo, 10);
             if (!filterDateTimeFrom) {
                 if (!filterDateTimeTo) {
                     result = true;
                 } else {
                     if (messageDateTime && filterDateTimeTo > messageDateTime) {
                         result = true;
                     } else {
                         result = false;
                     }
                 }
             } else {
                 if (messageDateTime && messageDateTime > filterDateTimeFrom) {
                     if (!filterDateTimeTo) {
                         result = true;
                     } else {
                         if (messageDateTime < filterDateTimeTo) {
                             result = true;
                         } else {
                             result = false;
                         }
                     }
                 } else {
                     result = false;
                 }
             }
             return result;
         },
         searchMatch = function (message, searchQuery) {
             var result;
             if (!searchQuery) {
                 if (checkDateTime(message.date, $rootScope.filterDateTimeFrom, $rootScope.filterDateTimeTo)) {
                     if ($rootScope.filterModule === '') {
                         if($rootScope.filterLevel && $rootScope.filterLevel.length === 0) {
                             result = true;
                         } else if (checkLevel(message.level, $rootScope.filterLevel)) {
                             result = true;
                         } else {
                             result = false;
                             }
                     } else if (message.moduleName === $rootScope.filterModule) {
                         if($rootScope.filterLevel && $rootScope.filterLevel.length === 0) {
                             result = true;
                         } else if (checkLevel(message.level, $rootScope.filterLevel)) {
                             result = true;
                         } else {
                             result = false;
                         }
                     }
                 } else {
                     result = false;
                 }
             } else if (searchQuery && message.text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) {
                 if (checkDateTime(message.date, $rootScope.filterDateTimeFrom, $rootScope.filterDateTimeTo)) {
                     if ($rootScope.filterModule === '') {
                         if($rootScope.filterLevel && $rootScope.filterLevel.length === 0) {
                             result = true;
                         } else if (checkLevel(message.level, $rootScope.filterLevel)) {
                             result = true;
                         } else {
                             result = false;
                             }
                     } else if (message.moduleName === $rootScope.filterModule) {
                         if($rootScope.filterLevel && $rootScope.filterLevel.length === 0) {
                             result = true;
                         } else if (checkLevel(message.level, $rootScope.filterLevel)) {
                             result = true;
                         } else {
                             result = false;
                         }
                     }
                 } else {
                     result = false;
                 }
             } else {
                 result = false;
             }
             return result;
         },
         messageFilter = function (data) {
             var msgs = jQuery.grep(data, function (message, index) {
                 return jQuery.inArray(message.id, $scope.ignoredMessages) === -1; // not in ignored list
             });
             $scope.messages = msgs;
             $scope.search();
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

         $rootScope.filterLevel = [];
         $rootScope.filterModule = '';
         $rootScope.filterDateTimeFrom = '';
         $rootScope.filterDateTimeTo = '';
         $scope.resetItemsPagination();
         $scope.filteredItems = [];
         $scope.itemsPerPage = 10;
         $scope.ignoredMessages = $cookieStore.get(IGNORED_MSGS);
         $scope.messages = [];

         MessagesFactory.query(function (data) {
             messageFilter(data);
         });

         $scope.getCssClass = function (msg) {
             var cssClass = 'msg';
             if (msg.level === 'ERROR') {
                 cssClass += ' badge-important';
             } else if (msg.level === 'OK') {
                 cssClass += ' badge-info';
             } else if (msg.level === 'CRITICAL') {
                 cssClass += ' badge-important';
             } else if (msg.level === 'WARN') {
                 cssClass += ' badge-warning';
             } else if (msg.level === 'DEBUG') {
                 cssClass += ' badge-success';
             } else if (msg.level === 'INFO') {
                 cssClass += ' badge-info';
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
             MessagesFactory.query(function (data) {
                 messageFilter(data);
             });
         };

         MessagesFactory.prototype.getDate = function () {
             return new Date(this.date);
         };

         $scope.remove = function (message) {
             $scope.removeObject(message);
             if ($scope.ignoredMessages === undefined) {
                 $scope.ignoredMessages = [];
             }
             $scope.ignoredMessages.push(message.id);
             $cookieStore.put(IGNORED_MSGS, $scope.ignoredMessages);
         };

         $scope.setCurrentPage = function (currentPage) {
             $scope.currentPage = currentPage;
         };

         $rootScope.changeItemsPerPage = function (itemsPerPage) {
             $scope.itemsPerPage = itemsPerPage;
             $scope.setCurrentPage(0);
             $scope.groupToPages($scope.filteredItems, $scope.itemsPerPage);
         };

         $rootScope.search = function () {
             LoadingModal.close();
             $scope.filteredItems = $filter('filter')($scope.messages, function (item) {
                 return item && searchMatch(item, $rootScope.query);
             });
             $scope.setCurrentPage(0);
             $scope.groupToPages($scope.filteredItems, $scope.itemsPerPage);
         };

         $timeout(update, UPDATE_INTERVAL);
    }

})();