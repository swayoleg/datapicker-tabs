// __tests__/direct-import.test.js
const DatepickerTabs = require('../src/assets/js/datepicker-tabs');

describe('DatepickerTabs parseDate function', () => {
    let datepicker;

    beforeEach(() => {
        // Create an instance
        datepicker = new DatepickerTabs('#date-input');

        // Replace initialization to avoid actual DOM manipulation
        datepicker.init = jest.fn();
    });

    test('should parse a date in DD/MM/YYYY format', () => {
        // Call parseDate with a test date
        const date = datepicker.parseDate('25/05/2025', 'DD/MM/YYYY');

        // Verify results
        expect(date instanceof Date).toBe(true);
        expect(date.getDate()).toBe(25);
        expect(date.getMonth()).toBe(4); // May is month 4 (zero-based)
        expect(date.getFullYear()).toBe(2025);
    });

    test('should parse a date in YYYY-MM-DD format', () => {
        const date = datepicker.parseDate('2025-05-25', 'YYYY-MM-DD');

        expect(date instanceof Date).toBe(true);
        expect(date.getDate()).toBe(25);
        expect(date.getMonth()).toBe(4);
        expect(date.getFullYear()).toBe(2025);
    });

    test('should parse a date with month name', () => {
        const date = datepicker.parseDate('25 May 2025', 'DD MMM YYYY');

        expect(date instanceof Date).toBe(true);
        expect(date.getDate()).toBe(25);
        expect(date.getMonth()).toBe(4);
        expect(date.getFullYear()).toBe(2025);
    });

    // Test cases for parseDate
    const testCases = [
        // Format: DD/MM/YYYY
        {
            name: "DD/MM/YYYY - standard date",
            input: "04/07/2025",
            format: "DD/MM/YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },
        {
            name: "DD/MM/YYYY - single digit day",
            input: "4/07/2025",
            format: "DD/MM/YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },
        {
            name: "DD/MM/YYYY - single digit month",
            input: "04/7/2025",
            format: "DD/MM/YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },

        // Format: MM/DD/YYYY
        {
            name: "MM/DD/YYYY - standard date",
            input: "07/04/2025",
            format: "MM/DD/YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },
        {
            name: "MM/DD/YYYY - single digit month",
            input: "7/04/2025",
            format: "MM/DD/YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },
        {
            name: "MM/DD/YYYY - single digit day",
            input: "07/4/2025",
            format: "MM/DD/YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },

        // Format: YYYY-MM-DD
        {
            name: "YYYY-MM-DD - ISO format",
            input: "2025-07-04",
            format: "YYYY-MM-DD",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },

        // Format: DD MMM YYYY
        {
            name: "DD MMM YYYY - month name short format",
            input: "04 Jul 2025",
            format: "DD MMM YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },
        {
            name: "DD MMM YYYY - lowercase month name",
            input: "04 jul 2025",
            format: "DD MMM YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },

        // Format: DD MMMM YYYY
        {
            name: "DD MMMM YYYY - full month name",
            input: "04 July 2025",
            format: "DD MMMM YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        },

        // Month only formats
        {
            name: "MMM YYYY - short month name",
            input: "Jul 2025",
            format: "MMM YYYY",
            expected: new Date(2025, 6, 1) // July 1st, 2025
        },
        {
            name: "MMMM YYYY - full month name",
            input: "July 2025",
            format: "MMMM YYYY",
            expected: new Date(2025, 6, 1) // July 1st, 2025
        },

        // Edge cases
        {
            name: "Empty string input",
            input: "",
            format: "DD/MM/YYYY",
            expected: null
        },
        {
            name: "Invalid date (non-existent day)",
            input: "31/02/2025", // February 31st doesn't exist
            format: "DD/MM/YYYY",
            expected: null
        },
        {
            name: "Invalid format",
            input: "04/07/2025",
            format: "invalid",
            expected: null
        },
        {
            name: "Mismatched format and input",
            input: "04/07/2025",
            format: "YYYY-MM-DD",
            expected: null
        },
        {
            name: "Custom format with different separator",
            input: "04.07.2025",
            format: "DD.MM.YYYY",
            expected: new Date(2025, 6, 4) // July 4th, 2025
        }
    ];

    // Run all test cases
    test.each(testCases)('$name', ({ input, format, expected }) => {
        const result = datepicker.parseDate(input, format);

        if (expected === null) {
            expect(result).toBeNull();
        } else {
            expect(result instanceof Date).toBe(true);
            expect(result.getDate()).toBe(expected.getDate());
            expect(result.getMonth()).toBe(expected.getMonth());
            expect(result.getFullYear()).toBe(expected.getFullYear());
        }
    });

    test('should return null for invalid date', () => {
        const date = datepicker.parseDate('invalid-date', 'DD/MM/YYYY');
        expect(date).toBeNull();
    });
});