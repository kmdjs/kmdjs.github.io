(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['react', "JSXTransformer"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react'), require('JSXTransformer'));
    } else {
        root.returnExports = factory(root.React, root.JSXTransformer);
    }
}(this, function (React, JSXTransformer) {
    React.jsReady = function (fn) {
        React.jsReady._readyCallbacks.push(fn);
    }
    React.jsReady._readyCallbacks = [];

    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', runScripts, false);
    } else {
      window.attachEvent('onload', runScripts);
    }
  
    function runScripts() {
        JSXTransformer.runScripts(React.jsReady._readyCallbacks);
    }

}));