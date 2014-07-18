'use strict';

/* Services */

(function () {
    function TreeNode(name, children, _expanded) {
        this.name = name || 'click-to-change';
        this.children = children || [];
        this._expanded = !!_expanded;
    }

    TreeNode.prototype = {
        add: function (node) {
            this.children.push(node);
        },
        remove: function (node) {
            this.children.splice(this.children.indexOf(node), 1);
        },
        hasChildren: function () {
            return !!this.children.length;
        },

        expand: function () {
            this._expanded = true;
        },
        toggle: function () {
            this._expanded = !this._expanded;
        },
        isExpanded: function () {
            return this._expanded;
        }
    };

    angular.module('playAngular.services', ['LocalStorageModule'])
        .service('treeService', function () {
            var tree = [new TreeNode('root node')];
            return {
                get: function () {
                    return tree;
                },
                add: function (target) {
                    target.add(new TreeNode());
                },
                remove: function (node, parent) {
                    parent.remove(node);
                }
            };
        })
        .service('treeStateService', ['localStorageService', function (localStorageService) {
            var STORE_NAME = 'angular-tree',
                serialize = function (tree) {
                    if (tree && tree.length) {
                        var node, i, len, result = [];
                        for (i = 0, len = tree.length; i < len; i++) {
                            node = tree[i];
                            result.push({
                                name: node.name,
                                _expanded: node._expanded,
                                children: serialize(node.children)
                            });
                        }
                        return result;
                    }
                },
                deSerialize = function (rawTree) {
                    if (rawTree && rawTree.length) {
                        var rawNode, i, len, result = [];
                        for (i = 0, len = rawTree.length; i < len; i++) {
                            rawNode = rawTree[i];
                            result.push(new TreeNode(rawNode.name, deSerialize(rawNode.children), rawNode._expanded));
                        }
                        return result;
                    }
                };
            return {
                save: function (tree) {
                    localStorageService.set(STORE_NAME, serialize(tree));
                },
                restore: function () {
                    return deSerialize(localStorageService.get(STORE_NAME));
                }
            }
        }]);
})();
