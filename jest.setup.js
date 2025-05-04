// jest.setup.js
class MockElement {
    constructor() {
        this.style = {};
        this.classList = {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn().mockReturnValue(false)
        };
        this.children = [];
        this.value = '';
        this.attributes = {};
        this.parentElement = null;
        this.parentNode = {
            insertBefore: jest.fn(),
            replaceChild: jest.fn()
        };
        this.nextSibling = null;
    }

    getAttribute(name) { return this.attributes[name] || null; }
    setAttribute(name, value) { this.attributes[name] = value; }
    hasAttribute(name) { return name in this.attributes; }
    appendChild() { return new MockElement(); }
    addEventListener() {}
    getBoundingClientRect() {
        return { top: 0, left: 0, right: 100, bottom: 100, width: 100, height: 100 };
    }
}

// Create a more realistic document mock
global.document = {
    createElement: jest.fn().mockImplementation(() => new MockElement()),
    createTextNode: jest.fn().mockImplementation(() => new MockElement()),
    querySelector: jest.fn().mockImplementation(() => new MockElement()),
    querySelectorAll: jest.fn().mockImplementation((selector) => {
        // Return array with one mock element to simulate finding the target
        return [new MockElement()];
    }),
    body: new MockElement(),
    documentElement: {
        scrollLeft: 0,
        scrollTop: 0
    },
    getElementById: jest.fn().mockImplementation(() => new MockElement()),
    getElementsByClassName: jest.fn().mockImplementation(() => [new MockElement()]),
    getElementsByTagName: jest.fn().mockImplementation(() => [new MockElement()]),
    createEvent: jest.fn().mockImplementation(() => ({
        initEvent: jest.fn()
    }))
};

// Create a more realistic window mock
global.window = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    pageXOffset: 0,
    pageYOffset: 0,
    innerWidth: 1024,
    innerHeight: 768,
    getComputedStyle: jest.fn().mockReturnValue({
        getPropertyValue: jest.fn()
    }),
    location: {
        href: 'http://localhost/'
    },
    getSelection: jest.fn().mockReturnValue({
        removeAllRanges: jest.fn(),
        addRange: jest.fn(),
        selectAllChildren: jest.fn()
    }),
    setTimeout: jest.fn(),
    clearTimeout: jest.fn()
};

// Mock navigator
global.navigator = {
    userAgent: 'node.js',
    clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined)
    }
};

// Add CustomEvent to global
global.CustomEvent = class CustomEvent {
    constructor(event, params) {
        this.event = event;
        this.params = params;
    }
};

// Mock Storage for cookie-related tests
class MockStorage {
    constructor() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

global.localStorage = new MockStorage();
global.sessionStorage = new MockStorage();

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
    get: jest.fn().mockImplementation(() => {
        return Object.entries(global.localStorage.store)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ');
    }),
    set: jest.fn().mockImplementation((value) => {
        const parts = value.split(';')[0].split('=');
        if (parts.length === 2) {
            global.localStorage.setItem(parts[0].trim(), parts[1].trim());
        }
    })
});

// IMPORTANT: Store original console methods before mocking
const originalConsoleError = console.error;

// Replace console.error with a filtered version
console.error = jest.fn((...args) => {
    // Suppress specific error messages that are expected during testing
    if (typeof args[0] === 'string' &&
        (args[0].includes('DatepickerTabs: No elements found with selector:') ||
            args[0].includes('DatepickerTabs: Invalid selector or element:'))) {
        return; // Suppress these messages
    }

    // For all other errors, use the original console.error
    originalConsoleError(...args);
});

// Optionally, you can do the same for other console methods if needed
// const originalConsoleWarn = console.warn;
// console.warn = jest.fn((...args) => {
//     // Filter specific warnings
//     originalConsoleWarn(...args);
// });