'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('application', function () {

    // add the custom locator to find node by name
    by.addLocator('nodeName', function (nodeText, opt_parentElement) {
        var using = opt_parentElement || document,
            nodes = using.querySelectorAll('li');

        return Array.prototype.filter.call(nodes, function (node) {
            return node.querySelector('in-place-editor span').textContent === nodeText;
        });
    });

    browser.get('index.html');

    var treeEl = element(by.css('.angular-tree')),
        NODE_NAME = 'super node name';

    it('only root node is displayed', function () {
        checkNodesCount(1);
        // check that root node has correct icon
        expect(treeEl.element(by.css('li .node-icon')).getAttribute('class')).toMatch('glyphicon-file');
    });

    it('node is added to the root', function () {
        createNode();
        // check that root node icon was changed
        expect(treeEl.all(by.css('li .node-icon')).first().getAttribute('class')).toNotMatch('glyphicon-file');
        checkNodesCount(2);
    });

    it('secondary node is added', function () {
        createNode();

        // remember the node we working with
        var nodeEl = treeEl.all(by.css('li')).get(1);

        createNode(nodeEl);
        createNode(nodeEl);

        checkNodesCount(2, nodeEl);
        checkNodesCount(5);
    });

    it('in place editor works', function () {
        var nodeEl = treeEl.all(by.css('li')).get(1),
            editorEl = nodeEl.all(by.css('in-place-editor')).first(),
            outEl = editorEl.element(by.css('span')),
            inputEl = editorEl.element(by.css('input'));

        // editor in display mode by default
        validateEditorState(outEl, inputEl, false);

        editorEl.click();
        validateEditorState(outEl, inputEl, true);

        // check that editor is not closed if type empty name
        inputEl.sendKeys(' ');
        clickOutsideOfTheTree();
        validateEditorState(outEl, inputEl, true);

        // editor is closed on blur
        inputEl.sendKeys(NODE_NAME);
        clickOutsideOfTheTree();
        validateEditorState(outEl, inputEl, false);

        // check that new name is displayed
        expect(outEl.getText()).toBe(NODE_NAME);
    });

    it('node expanding / collapsing works', function () {
        validateNodeState(true);
        toggleNode();
        validateNodeState(false);
        toggleNode();
        validateNodeState(true);
    });

    it('node is removed', function () {
        var nodeEl = treeEl.all(by.nodeName(NODE_NAME)).first();
        expect(nodeEl.isPresent()).toBeTruthy();
        nodeEl.all(by.css('.remove-node')).first().click();
        expect(nodeEl.isPresent()).toBeFalsy();
    });


    // helper functions
    function createNode(parentEl) {
        (parentEl || treeEl).all(by.css('.add-node')).first().click();
    }

    function toggleNode(nodeEl) {
        (nodeEl || treeEl).all(by.css('li .toggle-node')).first().click();
    }

    function checkNodesCount(expectedCount, parentEl) {
        expect((parentEl || treeEl).all(by.css('li')).count()).toBe(expectedCount);
    }

    function validateEditorState(outEl, inputEl, editing) {
        expect(outEl.isDisplayed()).toBe(!editing);
        expect(inputEl.isDisplayed()).toBe(editing);
    }

    function validateNodeState(expanded, nodeEl) {
        expect((nodeEl || treeEl).all(by.css('li .node-icon')).first().getAttribute('class')).toMatch('glyphicon-folder-' + (expanded ? 'open' : 'close'));
        expect((nodeEl || treeEl).all(by.css('ul')).first().isDisplayed()).toBe(expanded);
    }

    function clickOutsideOfTheTree() {
        element(by.css('nav')).click();
    }

});
