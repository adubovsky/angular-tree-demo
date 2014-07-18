'use strict';

/* Controllers */

(function () {
    angular.module('playAngular.controllers', ['playAngular.services'])
    /**
     * Controls tree
     */
        .controller('TreeController', ['$scope', 'treeService', 'treeStateService', '$timeout', function ($scope, treeService, treeStateService, $timeout) {
            $scope.tree = treeStateService.restore() || treeService.get();

            $scope.add = function (target) {
                target.expand();
                treeService.add(target);
            };
            $scope.remove = function (target, parent) {
                treeService.remove(target, parent);
            };
            $scope.toggle = function (node) {
                node.toggle();
            };

            // automatically save tree to the local storage when tree changes
            var saveRequest;
            $scope.$watch('tree', function () {
                $timeout.cancel(saveRequest);
                saveRequest = $timeout(function () {
                    treeStateService.save($scope.tree);
                }, 1000); // user can type in node name input => do not trigger save immediately
            }, true);
        }]);
})();
