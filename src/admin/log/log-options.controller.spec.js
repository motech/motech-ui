describe('Log options controller', function() {
    var modalFactory, loadingModal, logOptionsFactory;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($controller, ModalFactory, LoadingModal, LogOptionsFactory) {
        modalFactory = ModalFactory;
        loadingModal = LoadingModal;
        logOptionsFactory = LogOptionsFactory;

        this.controller = $controller('LogOptionsController', {
            ModalFactory: modalFactory,
            LoadingModal: loadingModal,
            LogOptionsFactory: logOptionsFactory
        });
    }));

    beforeEach(function(){
        this.controller.config.loggers = [{
            logName: 'example', logLevel: 7
        }];
        this.controller.config.root = {
            logName: 'root', logLevel: 1
        };
    });


    it('should have log level` names', function(){
        expect(this.controller.availableLevels).toContain('off');
        expect(this.controller.availableLevels).toContain('trace');
        expect(this.controller.availableLevels).toContain('debug');
        expect(this.controller.availableLevels).toContain('info');
        expect(this.controller.availableLevels).toContain('warn');
        expect(this.controller.availableLevels).toContain('error');
        expect(this.controller.availableLevels).toContain('fatal');
        expect(this.controller.availableLevels).toContain('all');
    });

    it('should have working name validation pattern', function(){

        expect(this.controller.logNameValidPattern).toBeDefined();

        expect('root').not.toMatch(this.controller.logNameValidPattern);
        expect('RoOt').not.toMatch(this.controller.logNameValidPattern);
        expect('rootdf').toMatch(this.controller.logNameValidPattern);
        expect('RoOtdf').toMatch(this.controller.logNameValidPattern);
        expect('okroot').toMatch(this.controller.logNameValidPattern);
        expect('OkRoOt').toMatch(this.controller.logNameValidPattern);
        expect('rootko').toMatch(this.controller.logNameValidPattern);
        expect('RoOtKo').toMatch(this.controller.logNameValidPattern);
        expect('okrootko').toMatch(this.controller.logNameValidPattern);
        expect('oKrOoTkO').toMatch(this.controller.logNameValidPattern);

    });

    it('should not save logs with invalid data', function(){
        this.controller.logs = [{name: 'root', level:'off'}];
        this.controller.logs.push({name: '', level: 1});
        this.controller.logs.push({level: 1});
        this.controller.logs.push({name: 'example', level:''});
        this.controller.logs.push({name: 'example'});

        spyOn(this.controller.config.loggers, 'push');

        this.controller.save();

        expect(this.controller.config.loggers.push).not.toHaveBeenCalled();
    });

    it('should increase size of array', function(){
        var len = this.controller.logs.length;

        this.controller.add();

        expect(this.controller.logs.length).toEqual(len + 1);
    });

    it('should even out loggers and logs levels', function(){
        for(i = 0; i < 10; i += 1) {
            this.controller.config.loggers.push({
                logName: "example",
                logLevel: Math.floor((Math.random() * 10) + 1)
            });

            this.controller.logs.push({
                name: "example",
                level: Math.floor((Math.random() * 10) + 1)
            });
        }

        this.controller.forAll(5);

        expect(this.controller.config.root.logLevel).toEqual(5);

        for(i=0;i<this.controller.logs.length; i+=1){
            expect(this.controller.logs[i].level).toEqual(5);
        }
        for(i=0;i<this.controller.config.loggers.length; i+=1){
            expect(this.controller.config.loggers[i].logLevel).toEqual(5);
        }
    });

    it('should change root level', function(){
        this.controller.changeRoot(20);

        expect(this.controller.config.root.logLevel).toEqual(20);
    });

    it('should remove logger to trash', function(){
        var logger = this.controller.config.loggers[0];
        this.controller.remove(this.controller.config.loggers[0]);

        expect(this.controller.config.loggers.length).toEqual(0);
        expect(this.controller.config.trash).toBeDefined();
        expect(this.controller.config.trash.length).toEqual(1);
        expect(this.controller.config.trash[0]).toEqual(logger);
    });

    it('should remove log', function(){
        this.controller.logs = [
        {name: 'example', level: 1},
        {name: 'other example', level: 2 },
        {name: 'some example', level: 3 },
        {name: 'some other example', level: 4 },
        {name: 'another example', level: 5 }];

        var log = this.controller.logs[2];

        this.controller.removeNew(this.controller.logs[2]);

        expect(this.controller.logs.length).toEqual(4);
        expect(this.controller.logs.indexOf(log)).toEqual(-1);
    });

    it('should return proper css class',function(){
        expect(this.controller.levelsCss('trace')).toEqual('btn-primary');
        expect(this.controller.levelsCss('debug')).toEqual('btn-success');
        expect(this.controller.levelsCss('info')).toEqual('btn-info');
        expect(this.controller.levelsCss('warn')).toEqual('btn-warning');
        expect(this.controller.levelsCss('error')).toEqual('btn-danger');
        expect(this.controller.levelsCss('fatal')).toEqual('btn-inverse');
        expect(this.controller.levelsCss('invalid')).toEqual(' btn-default');
    });

    it('should change logger level', function(){
        this.controller.config.loggers=[{logName: 'example', logLevel: 5},{logName: 'other example', logLevel: 4}];

        this.controller.change(this.controller.config.loggers[1], 8);

        expect(this.controller.config.loggers[1].logLevel).toEqual(8);
    });

    it('should change log level', function(){
        this.controller.logs=[{name: 'example', level: 5},{name: 'other example', level: 4}];

        this.controller.changeNew(this.controller.logs[1],8);

        expect(this.controller.logs[1].level).toEqual(8);
    });
});