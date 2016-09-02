(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('LogOptionsController', logOptionsController);

    logOptionsController.$inject = ['ModalFactory', 'LoadingModal', 'LogOptionsFactory'];
    function logOptionsController(ModalFactory, LoadingModal, LogOptionsFactory) {
        var logOptions = this;

        this.config = LogOptionsFactory.get();
        this.logs = [{name: "", level: "off"}];
        this.availableLevels = ['off', 'trace', 'debug', 'info', 'warn', 'error', 'fatal', 'all'];
        this.logNameValidPattern = /^((?!root).*)|^(root.+)/i;
        this.save = save;
        this.add = add;
        this.forAll = forAll;
        this.change = change;
        this.changeNew = changeNew;
        this.changeRoot = changeRoot;
        this.remove = remove;
        this.removeNew = removeNew;
        this.levelsCss = levelsCss;

        function save () {
            jQuery.each(logOptions.logs, function (index) {
                if (logOptions.logs[index].name !== '' && logOptions.logs[index].name !== undefined && logOptions.logs[index].level !== '') {
                    if (logOptions.logs[index].level !== undefined) {
                        if (logOptions.logs[index].name.toLowerCase() !== 'root') {
                            logOptions.config.loggers.push({
                                logName: logOptions.logs[index].name,
                                logLevel: logOptions.logs[index].level
                            });
                        }
                    }
                }
            });
            logOptions.logs = [];
            logOptions.logs = [{name: "", level: "off"}];
            logOptions.config.$save({},
                function () {
                    LoadingModal.close();
                    ModalFactory.showSuccessAlert('admin.log.changedLevel');
                },
                function () {
                    LoadingModal.close();
                    ModalFactory.showErrorAlert('admin.log.changedLevelError');
                }
            );
        }

        function add () {
            logOptions.logs.push({
                name:"",
                level:"off"
            });
        }

        function forAll (level) {
            var i;

            for (i = 0; i < logOptions.config.loggers.length; i += 1) {
                logOptions.config.loggers[i].logLevel = level;
            }

            logOptions.config.root.logLevel = level;

            jQuery.each(logOptions.logs, function (index) {
                logOptions.logs[index].level = level;
            });
        }

        function change (logger, level) {
            jQuery('#log-change-for-all').find('.active').removeClass('active');
            logger.logLevel = level;
        }

        function changeNew (log, level) {
            jQuery('#log-change-for-all').find('.active').removeClass('active');
            log.level = level;
        }

        function changeRoot (level) {
            jQuery('#log-change-for-all').find('.active').removeClass('active');
            logOptions.config.root.logLevel = level;
        }

        function remove (logger) {
            var i = logOptions.config.loggers.indexOf(logger);
            if (i !== -1) {
                logOptions.config.loggers.splice(i, 1);
            }

            if (logOptions.config.trash === undefined || logOptions.config.trash === null) {
                logOptions.config.trash = [];
            }

            logOptions.config.trash.push(logger);
        }

        function removeNew (log) {
            var i = logOptions.logs.indexOf(log);
            if (i !== -1) {
                logOptions.logs.splice(i, 1);
            }
        }

        function levelsCss (level) {
            var cssClass = ' btn-default';

            if (level !== undefined) {
                switch (level.toLowerCase()) {
                    case 'trace':
                        cssClass = 'btn-primary';
                        break;
                    case 'debug':
                        cssClass = 'btn-success';
                        break;
                    case 'info':
                        cssClass = 'btn-info';
                        break;
                    case 'warn':
                        cssClass = 'btn-warning';
                        break;
                    case 'error':
                        cssClass = 'btn-danger';
                        break;
                    case 'fatal':
                        cssClass = 'btn-inverse';
                        break;
                    default:
                        cssClass = ' btn-default';
                        break;
                }
            }

            return cssClass;
        }

    }
})();