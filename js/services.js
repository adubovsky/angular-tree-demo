'use strict';

/* Services */

(function () {
    /**
     * TreeNode represents simple tree node
     *
     * @param {String} name - name of the node
     * @param {Array<TreeNode>} [children] - an array of children nodes
     * @param {Boolean} [expanded] - if the node should be rendered expanded
     * @constructor
     */
    function TreeNode(name, children, expanded) {
        this.name = name;
        this.children = children || [];
        this._expanded = !!expanded;
    }

    TreeNode.prototype = {
        /**
         * Adds the node to the children
         * @param {TreeNode} node - node to be added
         */
        add: function (node) {
            this.children.push(node);
        },
        /**
         * Removes the node form the children
         * @param {TreeNode} node - node to be removed
         */
        remove: function (node) {
            this.children.splice(this.children.indexOf(node), 1);
        },
        /**
         * Determine if the current node has children
         * @returns {boolean}
         */
        hasChildren: function () {
            return !!this.children.length;
        },

        /**
         * Changes node state to expanded
         */
        expand: function () {
            this._expanded = true;
        },
        /**
         * Toggles node state
         */
        toggle: function () {
            this._expanded = !this._expanded;
        },
        /**
         * Determone if the current node expanded
         * @returns {boolean}
         */
        isExpanded: function () {
            return this._expanded;
        }
    };

    angular.module('playAngular.services', ['LocalStorageModule'])
    /**
     * treeService manipulates with tree
     */
        .service('treeService', function () {
            var tree = [new TreeNode('root node')];
            return {
                /**
                 * Returns the current tree
                 * @returns {Array<TreeNode>}
                 */
                get: function () {
                    return tree;
                },
                /**
                 * Adds node to the target
                 * @param {TreeNode} target - node to which new node will be added
                 */
                add: function (target) {
                    target.add(new TreeNode('click to change'));
                },
                /**
                 * Removes node from parent
                 * @param {TreeNode} node - node to be removed
                 * @param {TreeNode} parent - node from which to delete
                 */
                remove: function (node, parent) {
                    parent.remove(node);
                }
            };
        })
    /**
     * treeStateService manipulates with tree state
     */
        .service('treeStateService', ['localStorageService', function (localStorageService) {
            var STORE_NAME = 'angular-tree',
                /**
                 * Serializes the tree model to save to local storage
                 * @param {Array<TreeNode>} tree - tree to be serialized
                 * @returns {Array<Object>} an array of plain js objects
                 */
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
                /**
                 * De-serializes tree from local storage
                 * @param {Array<Object>} rawTree - tree to be de-serialized
                 * @returns {Array<TreeNode>} tree
                 */
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
                /**
                 * Serializes and save tree to the local storage
                 * @param {Array<TreeNode>} tree - tree to be saved
                 */
                save: function (tree) {
                    localStorageService.set(STORE_NAME, serialize(tree));
                },
                /**
                 * Read tree from local storage and de-serialize
                 * @returns {Array<TreeNode>} tree
                 */
                restore: function () {
                    return deSerialize(localStorageService.get(STORE_NAME));
                }
            }
        }]);
})();
