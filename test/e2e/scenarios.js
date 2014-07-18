'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('demo application', function() {

    browser.get('index.html');

    var treeEl = element(by.css('.angular-tree'));

    it('only root node present', function() {
        checkNodesCount(1);
        expect(treeEl.element(by.css('li .node-icon')).getAttribute('class')).toMatch('glyphicon-file');
    });

    it('add node to the root', function () {
        createNode();
        expect(treeEl.all(by.css('li .node-icon')).first().getAttribute('class')).toNotMatch('glyphicon-file');
        checkNodesCount(2);
    });

    it('add node to the child', function () {
        createNode();

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
            inputEl = editorEl.element(by.css('input')),
            NODE_NAME = 'updated name';

        validateEditorState(outEl, inputEl, false);

        editorEl.click();
        validateEditorState(outEl, inputEl, true);

        inputEl.sendKeys(NODE_NAME);

        treeEl.click();
        validateEditorState(outEl, inputEl, false);
        expect(outEl.getText()).toBe(NODE_NAME);
    });

    it('expand/collapse works', function () {
        validateNodeState(true);
        toggleNode();
        validateNodeState(false);
        toggleNode();
        validateNodeState(true);
    });

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
    }

});
