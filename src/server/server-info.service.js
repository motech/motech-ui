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
                status: $http.get(ServerService.formatURL('module/server/getStatus'), {}),
            }).then(function(response){
                var information = {};

                information.currentStamp = response.status.data[0].time;
                information.currentTime = formatDate(information.currentStamp);

                information.uptimeStamp = response.status.data[0].uptime;
                information.uptime = formatTimeSince(information.uptimeStamp);

                information.node = response.status.data[0].nodeName;
                information.eventChannel = response.status.data[0].inboundChannelActive;

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