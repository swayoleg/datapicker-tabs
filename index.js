// Export DatepickerTabs for CommonJS or ES modules
(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser globals
        global.DatepickerTabs = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // Check if we're running in a browser environment
    if (typeof window === 'undefined') {
        console.warn('DatepickerTabs requires a browser environment. It was loaded in a non-browser environment.');
        return {};
    }

    // Return the DatepickerTabs constructor from the window object
    return window.DatepickerTabs;
}));