# DatepickerTabs NPM Installation Guide

This document guides you through setting up DatepickerTabs as an NPM package.

## Publishing to NPM

Follow these steps to publish your DatepickerTabs component to NPM:

1. Create an NPM account if you don't have one:
   ```
   npm adduser
   ```

2. Login to your NPM account:
   ```
   npm login
   ```

3. Build your package:
   ```
   npm run build
   ```

4. Publish to NPM:
   ```
   npm publish
   ```

## NPM Package Development

### Initial Setup

1. Clone the repository:
   ```
   git clone https://github.com/swayoleg/datepicker-tabs.git
   cd datepicker-tabs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the package:
   ```
   npm run build
   ```

### Development Workflow

1. Run the development server with auto-rebuilding:
   ```
   npm run dev
   ```

2. Make your changes to files in the `src` directory

3. Test your changes in the browser using `index.html`

4. When ready to publish a new version, update the version number in `package.json`:
   ```
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

5. Publish the new version:
   ```
   npm publish
   ```

## Using DatepickerTabs in Projects

### Basic Usage

1. Install the package:
   ```
   npm install datepicker-tabs
   ```

2. Import CSS and JS in your project:

   **Using ES6 modules:**
   ```javascript
   import DatepickerTabs from 'datepicker-tabs';
   import 'datepicker-tabs/dist/css/datepicker-tabs.min.css';
   
   const picker = new DatepickerTabs('#date-input');
   ```

   **Using CommonJS:**
   ```javascript
   const DatepickerTabs = require('datepicker-tabs');
   require('datepicker-tabs/dist/css/datepicker-tabs.min.css');
   
   const picker = new DatepickerTabs('#date-input');
   ```

   **Using HTML script tags:**
   ```html
   <link rel="stylesheet" href="node_modules/datepicker-tabs/dist/css/datepicker-tabs.min.css">
   <script src="node_modules/datepicker-tabs/dist/js/datepicker-tabs.min.js"></script>
   
   <script>
     const picker = new DatepickerTabs('#date-input');
   </script>
   ```

### Using with Bundlers

**Webpack:**
```javascript
// In your JavaScript file
import DatepickerTabs from 'datepicker-tabs';
import 'datepicker-tabs/dist/css/datepicker-tabs.min.css';

// Initialize the date picker
const picker = new DatepickerTabs('#date-input');
```

**Parcel:**
```javascript
// In your JavaScript file
import DatepickerTabs from 'datepicker-tabs';
import 'datepicker-tabs/dist/css/datepicker-tabs.min.css';

// Initialize the date picker
const picker = new DatepickerTabs('#date-input');
```

**Vite:**
```javascript
// In your JavaScript file
import DatepickerTabs from 'datepicker-tabs';
import 'datepicker-tabs/dist/css/datepicker-tabs.min.css';

// Initialize the date picker
const picker = new DatepickerTabs('#date-input');
```

### Using with Laravel Mix

```javascript
// webpack.mix.js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

// In your JavaScript file (resources/js/app.js)
import DatepickerTabs from 'datepicker-tabs';
import 'datepicker-tabs/dist/css/datepicker-tabs.min.css';

// Initialize the date picker
const picker = new DatepickerTabs('#date-input');
```