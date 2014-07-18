'use strict';

/* Directives */

(function () {
    angular.module('playAngular.directives', [])
        .directive('inPlaceEditor', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                scope: { value: '=' },
                template: '<span ng-click="edit()" title="click to edit">{{value}}</span><input ng-model="value" placeholder="node name"/>',
                link: function (scope, el) {
                    el.addClass('in-place-editor');

                    var inputEl = angular.element(el.children()[1]),
                        stopEditing = function () {
                            el.removeClass('active');
                        };

                    scope.edit = function () {
                        el.addClass('active');
                        var input = inputEl[0];
                        input.focus();
                        input.select();
                    };

                    inputEl
                        .prop('onblur', function () {
                            if (scope.value) {
                                stopEditing();
                            } else {
                                $timeout(function () {
                                    inputEl[0].focus();
                                });
                            }
                        })
                        .prop('onkeyup', function (event) {
                            if (event.keyCode == 13) {
                                stopEditing();
                            }
                        });
                }
            };
        }]);
})();
