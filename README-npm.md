# DatepickerTabs

A versatile date picker with day and month selection modes, multiple selection support, and various formatting options.

**Great for booking systems!** If users don't have a **specific date** in mind, they can easily pick a **few different dates**, a **whole month**, or even **several months at once** (with a maximum limit).

<p>
<a href="https://swayoleg.github.io/datepicker-tabs/">
  <img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen" alt="Live Demo">
</a>
</p>

## Features

- Day and Month selection modes
- Single or multiple selection
- Format customization
- Min/Max date constraints
- Max month selection limit
- Display type options: 'tabs', 'day', or 'month'
- Saturday-only selection for specific use cases
- Cookie-based mode persistence
- Tooltip overlay positioning
- Mobile-friendly design
- Automatic container creation
- Support for multiple instances with class selectors

## Installation

### Via NPM

```bash
npm install datepicker-tabs
```

### Manual Installation

Clone or download the package from GitHub.
Include CSS and JS from dist folder to your page:

```html
<link rel="stylesheet" href="dist/css/datepicker-tabs.min.css">
<script src="dist/js/datepicker-tabs.min.js"></script>
```

## Basic Usage

```javascript
// Initialize on a single input with ID
const picker = new DatepickerTabs('#date-input');

// Initialize on multiple inputs with class
const pickers = new DatepickerTabs('.date-input-class');
```

## Options

You can customize the date picker by passing an options object:

```javascript
const picker = new DatepickerTabs('#date-input', {
    // Basic configuration
    mode: 'month',                   // 'day' or 'month' mode
    displayType: 'tabs',             // Display as 'tabs', 'day', or 'month'

    // Selection options
    multipleDays: false,             // Allow multiple day selection
    multipleMonths: true,            // Allow multiple month selection
    maxMonthSelection: 6,            // Max selectable months (when multipleMonths=true)

    // Date range options
    startDate: null,                 // Initial selected date
    minDate: null,                   // Minimum selectable date
    maxDate: new Date(2026, 11, 31), // Maximum selectable date
    futureSaturdaysOnly: true,       // Only enable future Saturdays in day mode

    // Localization
    monthNames: ['January', 'February'],    // Custom month names
    dayNames: ['Sun', 'Mon'],          // Custom day names
    dateFormat: 'DD/MM/YYYY',        // Date display format
    monthFormat: 'MMM YYYY',         // Month display format

    // UI settings
    position: 'bottom',              // 'bottom' or 'top' position
    zIndex: 9999,                    // Picker z-index

    // Persistence
    cookieName: 'datepickerTabsMode',// Cookie name for mode storage

    backwardsYearsOffset: 5, // How many year offset render backwards in years selectbox. If now 2025 it will render from 2020
    forwardsYearsOffset: 5, // How many year offset render forwards in years selectbox. If now 2025 it will render till 2030

    // Callbacks
    onDateChange: function(date) {   // Date selection callback
        console.log('Selected date:', date);
    },
    containerId: '', //Custom container ID to render calendar (if not provided, one will be generated) 
});
```

For full documentation and examples, please visit the [GitHub repository](https://github.com/swayoleg/datepicker-tabs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.