# Changelog

## [1.0.4] - 2025-05-04

- Fixed bug when click to remove-btn but need to wait apply click. Now on remove btn click it calls the
  this.updateInputValue();
- Fixed parseDate function to work with different date formats.
- Added option __disabledDaysOfWeek__ to disable specific days of the week. disabledDaysOfWeek: [0, 6] - this will disable Sunday (0) and Saturday (6)
- Added option to start week from Monday. __startWeekOnMonday__: false
- Added option to __disable certain dates__ with js object or strings.
```
disabledDates: [
    // Using Date objects
    new Date(2025, 11, 25),  // Christmas 2025
    
    // Using date strings (supports multiple formats)
    '01/01/2025',           // New Year's Day (DD/MM/YYYY)
    '2025-07-04',           // Independence Day (YYYY-MM-DD)
    '11/27/2025'            // Thanksgiving (MM/DD/YYYY)
  ],
  dateFormat: 'DD/MM/YYYY'  // Format for display and primary string parsing
```
- Added file [parsedate-test-html.html](parsedate-test-html.html) to test how parseDate works with test cases (feel free to edit)
- Added test suite with jest so you can run ``` npm run test ``` to test the code (parseDate function mostly)
- Updated a lot of documentation and examples in readme and index.html, updated interface index.d.ts file
- Tried to make auto npm publish on github (Need help with this)
- Added module export to the mail file so you can use it in node, updated gulp to replace it when build to dist
- Mocked the console.error when no selector for tests (in jest setup)
- Fixed the configurator with 3 new options in index.html


## [1.0.3] - 2025-05-04
- Fixed issue with multiply calls of onDateChange event handler in multiply month mode.

## [1.0.2] - 2025-04-17
- Proper rebuild of npm package

## [1.0.1] - 2025-04-17
- Added NPM package, jsdeliver, unpkg and docs for it

## [1.0.0] - 2025-04-17
- Initial release
- Day and Month selection modes
- Single or multiple selection
- Format customization
- Min/Max date constraints