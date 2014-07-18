'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
    beforeEach(module('playAngular.directives'));

    describe('inPlaceEditor', function () {

        var scope, element, textEl, inputEl,
            INITIAL_TEXT = 'TEST NAME';

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element('<in-place-editor value="value"></in-place-editor>');

            $compile(element)(scope);
            scope.$apply(function () {
                scope.value = INITIAL_TEXT;
            });

            textEl = element.find('span');
            inputEl = element.find('input');
        }));

        it('should have correct initial view', function () {
            expect(element.hasClass('active')).toBeFalsy();
            expect(textEl.text()).toBe(INITIAL_TEXT);
            expect(inputEl.val()).toBe(INITIAL_TEXT);
        });

    });
});
