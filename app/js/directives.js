'use strict';

/* Directives */

(function () {
    angular.module('playAngular.directives', [])
    /**
     * Renders and controls in place editor
     */
        .directive('inPlaceEditor', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                scope: { value: '=' },
                template: '<span ng-click="edit()" title="click to edit">{{value}}</span><input ng-model="value" placeholder="node name"/>',
                link: function (scope, el) {
                    el.addClass('in-place-editor');

                    var inputEl = angular.element(el.children()[1]),
                        stopEditing = function () {
                            // do not allow empty names
                            if (scope.value) {
                                el.removeClass('active');
                            } else {
                                $timeout(function () {
                                    inputEl[0].focus();
                                });
                            }
                        };

                    scope.edit = function () {
                        el.addClass('active');
                        var input = inputEl[0];
                        // focus input and select all text on click
                        input.focus();
                        input.select();
                    };

                    inputEl
                        // stop editing on blur & enter key
                        .prop('onblur', function () {
                            stopEditing();
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
