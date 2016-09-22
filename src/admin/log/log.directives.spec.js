describe('Log directives: ', function() {
    var element, scope, compile;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
    }));

    describe('LogContent directive ', function() {

        beforeEach(inject(function() {
            element = angular.element('<pre id="log-content" class="log-content" log-content="log">MOTECH log text</pre>');
            compile(element)(scope);
        }));

        it('Should check that the compiled element contains the specified content', function () {
            expect(element.prop("tagName")).toEqual("PRE");
            expect(element.text()).toContain("MOTECH log text");
            expect(element[0].nodeType).toEqual(1);
            expect(element.attr('log-content')).toBeDefined();
        });
    });

    describe('GoToAnchor directive ', function() {

        it('Should check that the compiled element contains the specified content', function () {
            beforeEach(inject(function() {
                element = angular.element('<a goto-anchor="log-nav-top"><i class="fa fa-chevron-up"></i></a>');
                compile(element)(scope);
            }));
            expect(element.prop("tagName")).toEqual("A");
            expect(element.attr('goto-anchor')).toEqual('log-nav-top');
        });

        it('Should check that the compiled element contains the specified content', function () {
            beforeEach(inject(function() {
                element = angular.element('<a goto-anchor="log-nav-end"><i class="fa fa-chevron-down"></i></a>');
                compile(element)(scope);
            }));
            expect(element.prop("tagName")).toEqual("A");
            expect(element.attr('goto-anchor')).toEqual('log-nav-end');
        });
    });
});