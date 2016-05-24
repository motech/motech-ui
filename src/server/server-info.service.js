(function(){
    'use strict';

    angular.module('motech-server')
        .service('ServerInfoService', service);

    service.$inject = ['$q', '$rootScope', '$http', 'ServerService'];
    function service($q, $rootScope, $http, ServerService){
        var service = this;

        service.information = {};
        service.running = false;

        ServerService.whenReady()
        .then(function(){
            service.running = true;
            updateInformation();
        });

        function updateInformation(){
            $q.all({
                time: $http.get(ServerService.formatURL('module/server/gettime'), {}),
                uptime: $http.get(ServerService.formatURL('module/server/getUptime'), {}),
                node: $http.get(ServerService.formatURL('module/server/getNodeName'), {}),
                eventChannel: $http.get(ServerService.formatURL('module/server/isInboundChannelActive'), {})
            }).then(function(responses){
                var information = {};

                information.currentStamp = responses.time.data;
                information.currentTime = formatDate(information.currentStamp);

                information.uptimeStamp = responses.uptime.data;
                information.uptime = formatTimeSince(information.uptimeStamp);

                information.node = responses.node.data;
                information.eventChannel = responses.eventChannel.data;

                service.information = information;
            });
        }

        function formatDate(timestamp){
            var formatPattern = 'YYYY-MM-DD HH:mm';
            var localTime = new Date();
            var serverTime = new Date(moment(parseInt(timestamp, 10)));

            var diff = parseInt((localTime.getTime() / 1000) - (serverTime.getTime() / 1000), 10);
            var calculatedDate = new Date(localTime.getTime() + diff);
            return moment(calculatedDate).format(formatPattern);
        }
        function formatTimeSince(timestamp){
            return moment(timestamp).fromNow();
        }
    }

})();