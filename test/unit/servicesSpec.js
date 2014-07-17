'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('playAngular.services'));

    describe('treeService', function () {
        var tree, service;

        beforeEach(inject(function (treeService) {
            service = treeService;
            tree = treeService.get();
        }));

        it('#get should return tree', function () {
            expect(tree.length).toBe(1);
        });

        it('#add should add child node', function () {
            var root = tree[0];
            service.add(root);
            expect(root.children.length).toBe(1);
        });

        it('#remove should remove child node', function () {
            var root = tree[0];
            service.add(root);
            service.add(root);
            expect(root.children.length).toBe(2);
            service.remove(root.children[0], root);
            expect(root.children.length).toBe(1);
        });
    });

    describe('treeStateService', function () {
        //TODO: implement
    });
});
