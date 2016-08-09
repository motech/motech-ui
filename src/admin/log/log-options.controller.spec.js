describe('Log options controller', function() {
    var modalFactory, loadingModal, logOptionsFactory, controller;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($controller, ModalFactory, LoadingModal, LogOptionsFactory) {
        modalFactory = ModalFactory;
        loadingModal = LoadingModal;
        logOptionsFactory = LogOptionsFactory;

        controller = $controller('LogOptionsController', {
            ModalFactory: modalFactory,
            LoadingModal: loadingModal,
            LogOptionsFactory: logOptionsFactory
        });
    }));

    beforeEach(function(){
        controller.config.loggers = [{
            logName: 'example', logLevel: 7
        }];
        controller.config.root = {
            logName: 'root', logLevel: 1
        };
    });


    it('should have log level` names', function(){
        expect(controller.availableLevels).toContain('off');
        expect(controller.availableLevels).toContain('trace');
        expect(controller.availableLevels).toContain('debug');
        expect(controller.availableLevels).toContain('info');
        expect(controller.availableLevels).toContain('warn');
        expect(controller.availableLevels).toContain('error');
        expect(controller.availableLevels).toContain('fatal');
        expect(controller.availableLevels).toContain('all');
    });

    it('should have working name validation pattern', function(){

        expect(controller.logNameValidPattern).toBeDefined();

        expect('root').not.toMatch(controller.logNameValidPattern);
        expect('RoOt').not.toMatch(controller.logNameValidPattern);
        expect('rootdf').toMatch(controller.logNameValidPattern);
        expect('RoOtdf').toMatch(controller.logNameValidPattern);
        expect('okroot').toMatch(controller.logNameValidPattern);
        expect('OkRoOt').toMatch(controller.logNameValidPattern);
        expect('rootko').toMatch(controller.logNameValidPattern);
        expect('RoOtKo').toMatch(controller.logNameValidPattern);
        expect('okrootko').toMatch(controller.logNameValidPattern);
        expect('oKrOoTkO').toMatch(controller.logNameValidPattern);

    });

    it('should not save logs with invalid data', function(){
        controller.logs = [{name: 'root', level:'off'}];
        controller.logs.push({name: '', level: 1});
        controller.logs.push({level: 1});
        controller.logs.push({name: 'example', level:''});
        controller.logs.push({name: 'example'});

        spyOn(controller.config.loggers, 'push');

        controller.save();

        expect(controller.config.loggers.push).not.toHaveBeenCalled();
    });

    it('should increase size of array', function(){
        var len = controller.logs.length;

        controller.add();

        expect(controller.logs.length).toEqual(len + 1);
    });

    it('should even out loggers and logs levels', function(){
        for(i = 0; i < 10; i += 1) {
            controller.config.loggers.push({
                logName: "example",
                logLevel: Math.floor((Math.random() * 10) + 1)
            });

            controller.logs.push({
                name: "example",
                level: Math.floor((Math.random() * 10) + 1)
            });
        }

        controller.forAll(5);

        expect(controller.config.root.logLevel).toEqual(5);
        jQuery.each(controller.logs, function (index) {
            expect(controller.logs[index].level).toEqual(5);
        });
        jQuery.each(controller.config.loggers, function (index) {
            expect(controller.config.loggers[index].logLevel).toEqual(5);
        });
    });

    it('should change root level', function(){
        controller.changeRoot(20);

        expect(controller.config.root.logLevel).toEqual(20);
    });

    it('should remove logger to trash', function(){
        var logger = controller.config.loggers[0];
        controller.remove(controller.config.loggers[0]);

        expect(controller.config.loggers.length).toEqual(0);
        expect(controller.config.trash).toBeDefined();
        expect(controller.config.trash.length).toEqual(1);
        expect(controller.config.trash[0]).toEqual(logger);
    });

    it('should remove log', function(){
        controller.logs = [
        {name: 'example', level: 1},
        {name: 'other example', level: 2 },
        {name: 'some example', level: 3 },
        {name: 'some other example', level: 4 },
        {name: 'another example', level: 5 }];

        var log = controller.logs[2];

        controller.removeNew(controller.logs[2]);

        expect(controller.logs.length).toEqual(4);
        expect(controller.logs.indexOf(log)).toEqual(-1);
    });

    it('should return proper css class',function(){
        expect(controller.levelsCss('trace')).toEqual('btn-primary');
        expect(controller.levelsCss('debug')).toEqual('btn-success');
        expect(controller.levelsCss('info')).toEqual('btn-info');
        expect(controller.levelsCss('warn')).toEqual('btn-warning');
        expect(controller.levelsCss('error')).toEqual('btn-danger');
        expect(controller.levelsCss('fatal')).toEqual('btn-inverse');
        expect(controller.levelsCss('invalid')).toEqual(' btn-default');
    });

    it('should change logger level', function(){
        controller.config.loggers=[{logName: 'example', logLevel: 5},{logName: 'other example', logLevel: 4}];

        controller.change(controller.config.loggers[1],8);

        expect(controller.config.loggers[1].logLevel).toEqual(8);
    });

    it('should change log level', function(){
        controller.logs=[{name: 'example', level: 5},{name: 'other example', level: 4}];

        controller.changeNew(controller.logs[1],8);

        expect(controller.logs[1].level).toEqual(8);
    });
});