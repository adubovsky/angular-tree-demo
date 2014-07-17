'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
    beforeEach(module('playAngular.controllers'));

    describe('TreeController', function () {
        var ctrl, scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('TreeController', { $scope: scope });
        }));

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should assign tree variable', function () {
            expect(scope.tree.length).toBe(1);
        });
    });

});
