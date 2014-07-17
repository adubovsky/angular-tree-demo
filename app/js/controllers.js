'use strict';

/* Controllers */

(function () {
    angular.module('playAngular.controllers', [])
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

            var saveRequest;
            $scope.$watch('tree', function () {
                $timeout.cancel(saveRequest);
                saveRequest = $timeout(function () {
                    treeStateService.save($scope.tree);
                }, 500); // user can type in node name input => do not trigger save immediately
            }, true);
        }]);
})();
