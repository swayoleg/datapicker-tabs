"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * DatepickerTabs
 *
 * A versatile date picker with day and month selection modes,
 * multiple selection support, and various formatting options.
 * Perfect for booking systems when users need to select multiple dates or months.
 *
 * @version 1.3.0
 *
 * FEATURES:
 * - Day and Month selection modes
 * - Single or multiple selection for both days and months
 * - Format customization
 * - Min/Max date constraints
 * - Max month selection limit
 * - Display type options: 'tabs', 'day', or 'month'
 * - Saturday-only selection for specific use cases
 * - Cookie-based mode persistence
 * - Tooltip overlay positioning
 * - Mobile-friendly design
 * - Automatic container creation
 * - Support for multiple instances with class selectors
 * - Customizable year range
 *
 * USAGE:
 *
 * 1. Basic initialization:
 * ```javascript
 * // Initialize on a single input with ID
 * const picker = new DatepickerTabs('#date-input');
 *
 * // Initialize on multiple inputs with class
 * const pickers = new DatepickerTabs('.date-input-class');
 * ```
 *
 * 2. With options:
 * ```javascript
 * const picker = new DatepickerTabs('#date-input', {
 *   // Basic configuration
 *   mode: 'month',                   // 'day' or 'month' mode
 *   displayType: 'tabs',             // Display as 'tabs', 'day', or 'month'
 *
 *   // Selection options
 *   multipleDays: false,             // Allow multiple day selection
 *   multipleMonths: true,            // Allow multiple month selection
 *   maxMonthSelection: 6,            // Max selectable months (when multipleMonths=true)
 *
 *   // Date range options
 *   startDate: null,                 // Initial selected date
 *   minDate: null,                   // Minimum selectable date
 *   maxDate: new Date(2026, 11, 31), // Maximum selectable date
 *   futureSaturdaysOnly: true,       // Only enable future Saturdays in day mode
 *
 *   // Localization
 *   monthNames: ['January', 'February', '...'], // Custom month names
 *   dayNames: ['Sun', 'Mon', '...'],           // Custom day names
 *   dateFormat: 'DD/MM/YYYY',        // Date display format
 *   monthFormat: 'MMM YYYY',         // Month display format
 *
 *   // UI settings
 *   position: 'bottom',              // 'bottom' or 'top' position
 *   zIndex: 9999,                    // Picker z-index
 *
 *   // Persistence
 *   cookieName: 'datepickerTabsMode',// Cookie name for mode storage
 *
 *   // Year range configuration
 *   backwardsYearsOffset: 5,         // Years to display before current year
 *   forwardsYearsOffset: 5,          // Years to display after current year
 *
 *   // Callbacks
 *   onDateChange: function(date) {   // Date selection callback
 *     console.log('Selected date:', date);
 *   },
 *
 *   // Custom container
 *   containerId: ''                  // Custom container ID for rendering
 * });
 * ```
 *
 * 3. Methods:
 * ```javascript
 * // Set date programmatically
 * picker.setDate(new Date());
 * picker.setDate([new Date(2025, 0, 1), new Date(2025, 1, 1)]); // Multiple dates
 * picker.setDate(null); // Clear selection
 *
 * // Get currently selected date(s)
 * const date = picker.getDate();
 *
 * // Mode and display type
 * picker.setMode('month'); // Switch mode ('day' or 'month')
 * picker.getMode(); // Get current mode
 * picker.setDisplayType('tabs'); // Change display type ('tabs', 'day', or 'month')
 *
 * // Selection options
 * picker.setMultipleDays(true); // Enable/disable multiple day selection
 * picker.setMultipleMonths(true); // Enable/disable multiple month selection
 * picker.setMultiple(true); // Enable both multiple days and months selection
 * picker.setMaxMonthSelection(3); // Set maximum number of selectable months
 *
 * // Format options
 * picker.setDateFormat('YYYY-MM-DD'); // Set date format
 * picker.setMonthFormat('MM/YYYY'); // Set month format
 *
 * // Date constraints
 * picker.setMinDate(new Date(2025, 0, 1)); // Set minimum selectable date
 * picker.setMaxDate(new Date(2025, 11, 31)); // Set maximum selectable date
 *
 * // Visibility
 * picker.show(); // Show the date picker
 * picker.hide(); // Hide the date picker
 *
 * // Cleanup
 * picker.destroy(); // Remove datepicker and clean up resources
 * ```
 */
var DatepickerTabs = /*#__PURE__*/function () {
  function DatepickerTabs(selector) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, DatepickerTabs);
    // Define default options
    var defaults = {
      mode: 'day',
      // 'day' or 'month'
      displayType: 'tabs',
      // 'tabs', 'day', or 'month' - controls if tabs should be shown
      multipleDays: false,
      // Allow multiple day selection
      multipleMonths: false,
      // Allow multiple month selection
      maxMonthSelection: null,
      // Maximum number of months that can be selected (when multipleMonths is true)
      startDate: null,
      minDate: null,
      maxDate: null,
      futureSaturdaysOnly: false,
      // Option for day mode to only enable Saturdays in the future
      onDateChange: null,
      // Callback when date(s) change
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      cookieName: 'datepickerTabsMode',
      // Store mode in cookie
      dateFormat: 'DD MMM YYYY',
      // Default format for display
      monthFormat: 'MMM YYYY',
      // Default format for month display
      position: 'bottom',
      // 'bottom' or 'top' - default position relative to input
      zIndex: 9999,
      // z-index for the picker container
      containerId: '',
      // Custom container ID to render calendar (if not provided, one will be generated)
      backwardsYearsOffset: 5,
      // How many year offset render backwards in years selectbox. If now 2025 it will render from 2020
      forwardsYearsOffset: 5 // How many year offset render forwards in years selectbox. If now 2025 it will render till 2030
    };

    // Merge default options with provided options
    this.options = _objectSpread(_objectSpread({}, defaults), options);

    // Store instance references 
    this.instances = [];

    // Check if selector refers to multiple elements
    if (typeof selector === 'string') {
      var elements = document.querySelectorAll(selector);

      // If multiple elements found, initialize on each one
      if (elements.length > 1) {
        elements.forEach(function (inputElement, index) {
          var instanceOptions = _objectSpread({}, _this.options);
          // Create a unique container ID for each instance
          var instanceId = "datepicker-container-".concat(Date.now(), "-").concat(index);
          _this.instances.push(_this._createInstance(inputElement, instanceOptions, instanceId));
        });
        return this.instances;
      } else if (elements.length === 1) {
        // Single element - use it as input element
        this.inputElement = elements[0];
      } else {
        console.error('DatepickerTabs: No elements found with selector:', selector);
        return;
      }
    } else if (selector instanceof HTMLElement) {
      // If an actual element is passed, use it directly
      this.inputElement = selector;
    } else {
      console.error('DatepickerTabs: Invalid selector or element:', selector);
      return;
    }

    // Create container element for this instance
    var containerId = this.options.containerId || "datepicker-container-".concat(Date.now());
    this.containerId = containerId;

    // Create container element and add it to the DOM
    this.containerElement = document.createElement('div');
    this.containerElement.id = containerId;
    this.containerElement.className = 'datepicker-tabs-container';
    document.body.appendChild(this.containerElement);

    // Set the element where the datepicker will be rendered
    this.element = this.containerElement;

    // Add the wrapper class to the element for CSS scoping
    this.element.classList.add('datepicker-tabs');

    // Initialize properties
    this.currentDate = new Date(this.options.startDate || new Date());
    this.selectedDates = this.options.startDate ? [new Date(this.options.startDate)] : [];
    this.selectedMonths = [];
    this.isVisible = false;

    // If displayType is 'day' or 'month', force the mode to match
    if (this.options.displayType === 'day' || this.options.displayType === 'month') {
      this.options.mode = this.options.displayType;
    }

    // If month mode and a start date is provided, extract the month and year
    if (this.options.mode === 'month' && this.options.startDate) {
      var startDate = new Date(this.options.startDate);
      this.selectedMonths.push({
        month: startDate.getMonth(),
        year: startDate.getFullYear()
      });
    }

    // Initialize current date to selected month or date if available
    if (this.selectedMonths.length > 0) {
      var selectedMonth = this.selectedMonths[0];
      this.currentDate = new Date(selectedMonth.year, selectedMonth.month, 1);
    } else if (this.selectedDates.length > 0) {
      var selectedDate = this.selectedDates[0];
      this.currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }

    // Try to restore mode from cookie (only if displayType is 'tabs')
    if (this.options.displayType === 'tabs') {
      this.restoreModeFromCookie();
    }
    if (this.inputElement && this.inputElement.value && !this.options.startDate) {
      if (this.options.mode === 'day') {
        var parsedDates = this.parseDateInput(this.inputElement.value);
        if (parsedDates.length > 0) {
          this.selectedDates = parsedDates;
          this.currentDate = new Date(parsedDates[0].getFullYear(), parsedDates[0].getMonth(), 1);
        }
      } else if (this.options.mode === 'month') {
        var parsedMonths = this.parseMonthInput(this.inputElement.value);
        if (parsedMonths.length > 0) {
          this.selectedMonths = parsedMonths;
          this.selectedDates = parsedMonths.map(function (m) {
            return new Date(m.year, m.month, 1);
          });
          this.currentDate = new Date(parsedMonths[0].year, parsedMonths[0].month, 1);
        }
      }
    }

    // Initialize the datepicker
    this.init();
  }

  /**
   * Returns a Date object if parsing is successful, null otherwise
   */
  return _createClass(DatepickerTabs, [{
    key: "parseDate",
    value: function parseDate(dateStr, format) {
      var _this2 = this;
      if (!dateStr || !format) return null;

      // Create mapping objects for format tokens
      var formatTokens = {
        'DD': /(\d{2})/,
        // Day with leading zero
        'D': /(\d{1,2})/,
        // Day without leading zero
        'MMM': /([A-Za-z]{3})/,
        // Short month name
        'MMMM': /([A-Za-z]+)/,
        // Full month name
        'MM': /(\d{2})/,
        // Month with leading zero
        'M': /(\d{1,2})/,
        // Month without leading zero
        'YYYY': /(\d{4})/,
        // Four digit year
        'YY': /(\d{2})/ // Two digit year
      };

      // Escape special regex characters in format
      var regexFormat = format.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      // Replace format tokens with regex capture groups
      Object.keys(formatTokens).forEach(function (token) {
        regexFormat = regexFormat.replace(new RegExp(token, 'g'), formatTokens[token].source);
      });

      // Create final regex with anchors
      var regex = new RegExp("^".concat(regexFormat, "$"));
      var match = dateStr.match(regex);
      if (!match) return null;

      // Extract date parts with a more robust approach
      var day = 1,
        month = 0,
        year = new Date().getFullYear();
      try {
        // Process all capturing groups from the regex match
        var groupCount = 1; // Skip first group which is the whole match
        var _loop = function _loop() {
          var val = match[groupCount];

          // Try to find which part of the date this group represents
          // based on its format and value
          if (/^\d{4}$/.test(val)) {
            // Likely a 4-digit year
            year = parseInt(val, 10);
          } else if (/^\d{2}$/.test(val) && parseInt(val, 10) > 31) {
            // Likely a 2-digit year
            var twoDigitYear = parseInt(val, 10);
            var currentYear = new Date().getFullYear();
            var century = Math.floor(currentYear / 100) * 100;
            if (twoDigitYear + century > currentYear + 50) {
              year = twoDigitYear + (century - 100);
            } else {
              year = twoDigitYear + century;
            }
          } else if (/^\d{1,2}$/.test(val) && parseInt(val, 10) >= 1 && parseInt(val, 10) <= 12) {
            // Could be month or day
            // If we already have a month value and it's in the format where we'd expect a day, treat as day
            if (format.indexOf('DD') !== -1 || format.indexOf('D') !== -1) {
              day = parseInt(val, 10);
            } else {
              month = parseInt(val, 10) - 1; // 0-based month
            }
          } else if (/^\d{1,2}$/.test(val) && parseInt(val, 10) > 12 && parseInt(val, 10) <= 31) {
            // Definitely a day
            day = parseInt(val, 10);
          } else if (/^[A-Za-z]{3,}$/.test(val)) {
            // Likely a month name
            var monthIndex = _this2.options.monthNames.findIndex(function (m) {
              return m.toLowerCase().startsWith(val.toLowerCase());
            });
            if (monthIndex !== -1) {
              month = monthIndex;
            }
          }
          groupCount++;
        };
        while (groupCount < match.length) {
          _loop();
        }

        // Create and validate the date
        var parsedDate = new Date(year, month, day);
        if (isNaN(parsedDate.getTime())) return null;
        return parsedDate;
      } catch (error) {
        console.error('Error parsing date:', error);
        return null;
      }
    }

    /**
     * Check if a date is valid
     * @param {Date} date - The date to check
     * @returns {boolean} - Whether the date is valid
     */
  }, {
    key: "DPTisValidDate",
    value: function DPTisValidDate(date) {
      return date && date instanceof Date && !isNaN(date.getTime());
    }

    /**
     * Parse multiple date strings from input value
     */
  }, {
    key: "parseDateInput",
    value: function parseDateInput(inputValue) {
      var _this3 = this;
      if (!inputValue) return [];

      // Determine which format to use based on mode
      var format = this.options.mode === 'day' ? this.options.dateFormat : this.options.monthFormat;

      // Split by commas for multiple dates
      var dateStrings = inputValue.split(',').map(function (str) {
        return str.trim();
      });

      // Parse each date string and validate
      return dateStrings.map(function (dateStr) {
        var date = _this3.parseDate(dateStr, format);
        return _this3.DPTisValidDate(date) ? date : null;
      }).filter(function (date) {
        return date !== null;
      }); // Filter out invalid dates
    }

    /**
     * Enhanced version of parseMonthInput to ensure more reliable parsing
     */
  }, {
    key: "parseMonthInput",
    value: function parseMonthInput(inputValue) {
      var _this4 = this;
      if (!inputValue) return [];

      // Split by commas for multiple months
      var monthStrings = inputValue.split(',').map(function (str) {
        return str.trim();
      });

      // Parse each month string and convert to month objects
      return monthStrings.map(function (monthStr) {
        // Try direct parsing with the configured format
        var date = _this4.parseDate(monthStr, _this4.options.monthFormat);
        if (date && !isNaN(date.getTime())) {
          return {
            month: date.getMonth(),
            year: date.getFullYear()
          };
        }

        // If direct parsing fails, try a more flexible approach
        // This helps with various month formats like "Apr 2025" or "April 2025"
        var monthYearPattern = /([A-Za-z]+)\s+(\d{4})/i;
        var match = monthStr.match(monthYearPattern);
        if (match) {
          var monthName = match[1];
          var year = parseInt(match[2], 10);

          // Find month by name
          var monthIndex = _this4.options.monthNames.findIndex(function (m) {
            return m.toLowerCase().startsWith(monthName.toLowerCase());
          });
          if (monthIndex !== -1 && !isNaN(year)) {
            return {
              month: monthIndex,
              year: year
            };
          }
        }

        // Also try numeric format like "MM/YYYY"
        var numericPattern = /(\d{1,2})[\/\-\s](\d{4})/;
        var numMatch = monthStr.match(numericPattern);
        if (numMatch) {
          var month = parseInt(numMatch[1], 10) - 1; // Convert to 0-based
          var _year = parseInt(numMatch[2], 10);
          if (month >= 0 && month <= 11 && !isNaN(_year)) {
            return {
              month: month,
              year: _year
            };
          }
        }
        return null;
      }).filter(function (month) {
        return month !== null;
      }); // Filter out invalid months
    }

    /**
     * Create a datepicker instance for a specific input element
     * @private
     */
  }, {
    key: "_createInstance",
    value: function _createInstance(inputElement, options, containerId) {
      // Create a new options object with the input element
      var instanceOptions = _objectSpread(_objectSpread({}, options), {}, {
        containerId: containerId
      });

      // Create a new instance and return it
      return new DatepickerTabs(inputElement, instanceOptions);
    }

    /**
     * DatepickerTabs Format Date Fix
     *
     * This is a corrected formatDate method that properly handles month name formatting
     * without issues like replacing the 'D' in 'Dec' with the day number.
     */
  }, {
    key: "formatDate",
    value: function formatDate(date, format) {
      if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

      // For the specific month-year format that's causing problems,
      // use a direct approach
      if (format === 'MMM YYYY' || format === 'MMMM YYYY') {
        var monthIndex = date.getMonth();
        var _year2 = date.getFullYear();
        if (format === 'MMM YYYY') {
          // Use the first 3 characters of the month name
          var shortMonthName = this.options.monthNames[monthIndex].substring(0, 3);
          return "".concat(shortMonthName, " ").concat(_year2);
        } else {
          // Use the full month name
          return "".concat(this.options.monthNames[monthIndex], " ").concat(_year2);
        }
      }

      // For other formats, use a direct replacement approach
      // that avoids the issue with 'D' in month names
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();

      // Create a copy of the format string
      var result = format;

      // Replace year patterns
      result = result.replace(/YYYY/g, year.toString());
      result = result.replace(/YY/g, year.toString().slice(-2));

      // Replace month name patterns first
      result = result.replace(/MMMM/g, this.options.monthNames[month]);
      result = result.replace(/MMM/g, this.options.monthNames[month].substring(0, 3));

      // Replace month number patterns
      result = result.replace(/MM/g, String(month + 1).padStart(2, '0'));
      // Use word boundary for single M to avoid replacing M in words
      result = result.replace(/\bM\b/g, String(month + 1));

      // Replace day patterns - after month patterns to avoid conflicts
      result = result.replace(/DD/g, String(day).padStart(2, '0'));
      // Use word boundary for single D to avoid replacing D in words
      result = result.replace(/\bD\b/g, String(day));
      return result;
    }

    /**
     * Position the datepicker relative to the input element
     * Adjusts to stay in viewport
     */
  }, {
    key: "positionPicker",
    value: function positionPicker() {
      if (!this.inputElement) return;
      var container = this.element.querySelector('.custom-datepickertabs-container');
      if (!container) return;

      // Get input position and dimensions
      var inputRect = this.inputElement.getBoundingClientRect();
      var containerHeight = container.offsetHeight;
      var containerWidth = container.offsetWidth;
      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;

      // Check if there's enough space below
      var spaceBelow = windowHeight - inputRect.bottom;
      var showOnTop = spaceBelow < containerHeight && inputRect.top > containerHeight;

      // Calculate scroll offset for initial positioning
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Position horizontally - align with input field left edge
      var left = inputRect.left + scrollLeft;

      // Ensure the picker doesn't go off-screen to the right
      if (left + containerWidth > windowWidth + scrollLeft) {
        left = inputRect.right - containerWidth + scrollLeft;
      }

      // Ensure the picker doesn't go off-screen to the left
      if (left < scrollLeft) {
        left = scrollLeft + 5;
      }

      // Position vertically based on available space
      var top;
      if (showOnTop || this.options.position === 'top') {
        // Position above the input
        top = inputRect.top - containerHeight + scrollTop;

        // If not enough space above, position below instead
        if (top < scrollTop) {
          top = inputRect.bottom + scrollTop;
        }
      } else {
        // Position below the input by default
        top = inputRect.bottom + scrollTop;

        // If not enough space below, position above if possible
        if (top + containerHeight > windowHeight + scrollTop && inputRect.top > containerHeight) {
          top = inputRect.top - containerHeight + scrollTop;
        }
      }

      // Use fixed positioning with coordinates relative to viewport
      container.style.position = 'absolute';
      container.style.top = "".concat(top, "px");
      container.style.left = "".concat(left, "px");
      container.style.zIndex = this.options.zIndex;
    }

    /**
     * Initialize the datepicker
     */
  }, {
    key: "init",
    value: function init() {
      var _this5 = this;
      this.render();
      this.attachEvents();

      // Set up input element if provided
      if (this.inputElement) {
        this.setupInputElement();
      }

      // Initially hide the picker
      this.hide();

      // Add document click handler to close when clicking outside
      document.addEventListener('click', function (e) {
        if (_this5.isVisible && !_this5.element.contains(e.target) && (!_this5.inputElement || !_this5.inputElement.contains(e.target))) {
          _this5.hide();
        }
      });
    }

    /**
     * Setup input element events
     */
  }, {
    key: "setupInputElement",
    value: function setupInputElement() {
      var _this6 = this;
      // Update input with initial date if available
      this.inputElement.classList.add('datepicker-input');
      this.updateInputValue();

      // Add click handler to show the picker
      this.inputElement.addEventListener('click', function (e) {
        e.stopPropagation();
        if (_this6.isVisible) {
          _this6.hide();
        } else {
          _this6.show();
        }
      });

      // Make input readonly to prevent keyboard input
      this.inputElement.setAttribute('readonly', 'readonly');

      // Add placeholder if not already set
      if (!this.inputElement.getAttribute('placeholder')) {
        this.inputElement.setAttribute('placeholder', 'Select a date');
      }
    }

    /**
     * Update input element with formatted date value
     */
  }, {
    key: "updateInputValue",
    value: function updateInputValue() {
      var _this7 = this;
      if (!this.inputElement) return;
      if (this.options.mode === 'day') {
        if (this.selectedDates.length === 0) {
          this.inputElement.value = '';
        } else if (this.options.multipleDays) {
          var formattedDates = this.selectedDates.map(function (d) {
            return _this7.formatDate(d, _this7.options.dateFormat);
          });
          this.inputElement.value = formattedDates.join(', ');
        } else {
          this.inputElement.value = this.formatDate(this.selectedDates[0], this.options.dateFormat);
        }
      } else {
        if (this.selectedMonths.length === 0) {
          this.inputElement.value = '';
        } else if (this.options.multipleMonths) {
          var formattedMonths = this.selectedMonths.map(function (m) {
            return _this7.formatDate(new Date(m.year, m.month, 1), _this7.options.monthFormat);
          });
          this.inputElement.value = formattedMonths.join(', ');
        } else {
          var m = this.selectedMonths[0];
          this.inputElement.value = this.formatDate(new Date(m.year, m.month, 1), this.options.monthFormat);
        }
      }
    }

    /**
     * Show the datepicker
     */
  }, {
    key: "show",
    value: function show() {
      var _this8 = this;
      if (this.isVisible) return;

      //console.log('show');

      // Parse the input value every time before showing
      if (this.inputElement && this.inputElement.value) {
        if (this.options.mode === 'month') {
          var parsedMonths = this.parseMonthInput(this.inputElement.value);
          if (parsedMonths.length > 0) {
            this.selectedMonths = parsedMonths;
            this.selectedDates = parsedMonths.map(function (m) {
              return new Date(m.year, m.month, 1);
            });

            // Important: Always update the currentDate to show the view of the selected month
            // This is the key fix for single month selection
            var selectedMonth = parsedMonths[0];
            this.currentDate = new Date(selectedMonth.year, selectedMonth.month, 1);
          }
        } else if (this.options.mode === 'day') {
          var parsedDates = this.parseDateInput(this.inputElement.value);
          if (parsedDates.length > 0) {
            this.selectedDates = parsedDates;
            // Update the view to show the month of the selected date
            var selectedDate = parsedDates[0];
            this.currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
          }
        }
      }

      /*
      if (this.options.mode === 'month' && this.selectedMonths.length > 0) {
        const selectedMonth = this.selectedMonths[0];
        this.currentDate = new Date(selectedMonth.year, selectedMonth.month, 1);
      } else if (this.options.mode === 'day' && this.selectedDates.length > 0) {
        const selectedDate = this.selectedDates[0];
        this.currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      }
      
      // Update currentDate to match selectedDate if one exists
      if (this.selectedDates.length > 0) {
        const selectedDate = this.selectedDates[0];
        this.currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      } else if (this.selectedMonths.length > 0) {
        // If we have selected months but no dates, use the first selected month
        const selectedMonth = this.selectedMonths[0];
        this.currentDate = new Date(selectedMonth.year, selectedMonth.month, 1);
      }
      */

      // Show the container
      var container = this.element.querySelector('.custom-datepickertabs-container');
      if (container) {
        container.style.display = 'block';
        this.isVisible = true;

        // Position the picker with a slight delay to ensure it's rendered
        setTimeout(function () {
          _this8.positionPicker();
        }, 0);

        // Add window resize handler (but not scroll handler)
        this.resizeHandler = function () {
          if (_this8.isVisible) {
            _this8.positionPicker();
          }
        };
        window.addEventListener('resize', this.resizeHandler);

        // Trigger a custom event
        var event = new CustomEvent('datepickerShow');
        this.element.dispatchEvent(event);
      }
    }

    /**
     * Hide the datepicker
     */
  }, {
    key: "hide",
    value: function hide() {
      if (!this.isVisible && !this.element.querySelector('.custom-datepickertabs-container')) return;

      // Hide the container
      var container = this.element.querySelector('.custom-datepickertabs-container');
      if (container) {
        container.style.display = 'none';
        this.isVisible = false;

        // Remove resize event listener
        if (this.resizeHandler) {
          window.removeEventListener('resize', this.resizeHandler);
        }

        // Trigger a custom event
        var event = new CustomEvent('datepickerHide');
        this.element.dispatchEvent(event);
      }
    }

    // Set cookie for mode persistence
  }, {
    key: "setModeCookie",
    value: function setModeCookie(mode) {
      if (this.options.displayType !== 'tabs') return; // Only use cookies in tabs mode

      var expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // Cookie expires in 7 days
      document.cookie = "".concat(this.options.cookieName, "=").concat(mode, ";expires=").concat(expiryDate.toUTCString(), ";path=/");
    }

    // Get mode from cookie
  }, {
    key: "getModeCookie",
    value: function getModeCookie() {
      var name = this.options.cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var cookies = decodedCookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return null;
    }

    // Restore mode from cookie if available
  }, {
    key: "restoreModeFromCookie",
    value: function restoreModeFromCookie() {
      var savedMode = this.getModeCookie();
      if (savedMode && (savedMode === 'day' || savedMode === 'month')) {
        this.options.mode = savedMode;
      }
    }

    /**
     * Get years range for year selector based on min/max date constraints
     */
  }, {
    key: "getYearsRange",
    value: function getYearsRange(currentYear) {
      var startYear = currentYear - this.options.backwardsYearsOffset;
      var endYear = currentYear + this.options.forwardsYearsOffset;

      // Apply min date constraint
      if (this.options.minDate) {
        var minYear = this.options.minDate.getFullYear();
        startYear = Math.max(startYear, minYear);
      }

      // Apply max date constraint
      if (this.options.maxDate) {
        var maxYear = this.options.maxDate.getFullYear();
        endYear = Math.min(endYear, maxYear);
      }
      return {
        startYear: startYear,
        endYear: endYear
      };
    }

    /**
     * Check if a month is selectable based on min/max date constraints
     */
  }, {
    key: "isMonthSelectable",
    value: function isMonthSelectable(month, year) {
      // Check for min date constraint
      if (this.options.minDate) {
        var minDate = new Date(this.options.minDate);
        var minYear = minDate.getFullYear();
        var minMonth = minDate.getMonth();
        if (year < minYear || year === minYear && month < minMonth) {
          return false;
        }
      }

      // Check for max date constraint
      if (this.options.maxDate) {
        var maxDate = new Date(this.options.maxDate);
        var maxYear = maxDate.getFullYear();
        var maxMonth = maxDate.getMonth();
        if (year > maxYear || year === maxYear && month > maxMonth) {
          return false;
        }
      }
      return true;
    }

    // Render the datepicker UI
  }, {
    key: "render",
    value: function render() {
      // Check if the container already exists
      var container = this.element.querySelector('.custom-datepickertabs-container');
      if (!container) {
        // First time rendering - create the full container
        container = document.createElement('div');
        container.className = 'custom-datepickertabs-container';

        // Add header
        container.innerHTML = "\n        <div class=\"datepicker-header\">\n          <h3 class=\"datepicker-title\">Select ".concat(this.options.mode === 'day' ? 'Date' : 'Month', "</h3>\n        </div>\n      ");

        // Add tabs only if displayType is tabs
        if (this.options.displayType === 'tabs') {
          container.innerHTML += "\n          <div class=\"datepicker-tabs-ui\">\n            <button class=\"datepicker-tab ".concat(this.options.mode === 'day' ? 'active' : '', "\" data-mode=\"day\">Specific Date</button>\n            <button class=\"datepicker-tab ").concat(this.options.mode === 'month' ? 'active' : '', "\" data-mode=\"month\">Whole Month</button>\n          </div>\n        ");
        }

        // Create content based on mode
        var content = document.createElement('div');
        content.className = 'datepicker-content';
        if (this.options.mode === 'day') {
          content.innerHTML = this.renderDayMode();
        } else {
          content.innerHTML = this.renderMonthMode();
        }
        container.appendChild(content);

        // Add footer with buttons
        container.innerHTML += "\n        <div class=\"datepicker-footer\">\n          <button class=\"datepicker-btn clear\">Clear</button>\n          <button class=\"datepicker-btn apply\">Apply</button>\n        </div>\n      ";
        this.element.appendChild(container);
      } else {
        // Update only what's needed
        var title = container.querySelector('.datepicker-title');
        if (title) {
          title.textContent = "Select ".concat(this.options.mode === 'day' ? 'Date' : 'Month');
        }

        // Update tabs only if they are present
        var tabsUI = container.querySelector('.datepicker-tabs-ui');
        if (tabsUI) {
          var dayTab = tabsUI.querySelector('[data-mode="day"]');
          var monthTab = tabsUI.querySelector('[data-mode="month"]');
          if (dayTab && monthTab) {
            if (this.options.mode === 'day') {
              dayTab.classList.add('active');
              monthTab.classList.remove('active');
            } else {
              dayTab.classList.remove('active');
              monthTab.classList.add('active');
            }
          }
        }

        // Update content
        var _content = container.querySelector('.datepicker-content');
        if (_content) {
          _content.innerHTML = this.options.mode === 'day' ? this.renderDayMode() : this.renderMonthMode();
        }
      }
    }

    // Render day selection mode
  }, {
    key: "renderDayMode",
    value: function renderDayMode() {
      var year = this.currentDate.getFullYear();
      var month = this.currentDate.getMonth();

      // Get days in the current month
      var daysInMonth = new Date(year, month + 1, 0).getDate();

      // Get the day of the week of the first day of the month
      var firstDayOfMonth = new Date(year, month, 1).getDay();

      // Calculate days from previous month to display
      var prevMonthDays = firstDayOfMonth;

      // Create year selector
      var yearsHtml = this.renderYearSelector(year);

      // Create month navigation
      var navHtml = "\n      <div class=\"datepicker-nav\">\n        <button class=\"datepicker-nav-btn prev-month\">&lt;</button>\n        <span>".concat(this.options.monthNames[month], " ").concat(year, "</span>\n        <button class=\"datepicker-nav-btn next-month\">&gt;</button>\n      </div>\n    ");

      // Create day names header
      var daysHeaderHtml = '<div class="datepicker-days-container">';
      for (var i = 0; i < 7; i++) {
        daysHeaderHtml += "<div class=\"day-name\">".concat(this.options.dayNames[i], "</div>");
      }

      // Create days grid
      var daysHtml = '';

      // Previous month days
      var prevMonth = month === 0 ? 11 : month - 1;
      var prevMonthYear = month === 0 ? year - 1 : year;
      var daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
      for (var _i = 0; _i < prevMonthDays; _i++) {
        var day = daysInPrevMonth - prevMonthDays + _i + 1;
        daysHtml += "<div class=\"day-item other-month disabled\">".concat(day, "</div>");
      }

      // Current month days
      var today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today for comparison

      for (var _i2 = 1; _i2 <= daysInMonth; _i2++) {
        var date = new Date(year, month, _i2);
        var isToday = today.getDate() === _i2 && today.getMonth() === month && today.getFullYear() === year;
        var isSaturday = date.getDay() === 6;
        var isSelected = this.isDateSelected(date);

        // Set hours to 0 for date comparison
        var compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);
        var isFuture = compareDate > today;

        // Check if day should be disabled
        var isDisabled = false;

        // If futureSaturdaysOnly is enabled, disable all non-Saturday days
        // and all Saturdays that are in the past
        if (this.options.futureSaturdaysOnly) {
          isDisabled = !(isSaturday && isFuture);
        }

        // Apply min date restriction
        if (this.options.minDate) {
          var minDate = new Date(this.options.minDate);
          minDate.setHours(0, 0, 0, 0);
          if (compareDate < minDate) isDisabled = true;
        }

        // Apply max date restriction
        if (this.options.maxDate) {
          var maxDate = new Date(this.options.maxDate);
          maxDate.setHours(0, 0, 0, 0);
          if (compareDate > maxDate) isDisabled = true;
        }
        var classes = ['day-item', isToday ? 'today' : '', isSelected ? 'selected' : '', isDisabled ? 'disabled' : '', isSaturday ? 'saturday' : ''].filter(Boolean).join(' ');

        // Add a data attribute to indicate if the day is clickable
        var clickableAttr = isDisabled ? '' : 'data-clickable="true"';
        daysHtml += "<div class=\"".concat(classes, "\" ").concat(clickableAttr, " data-date=\"").concat(year, "-").concat(month + 1, "-").concat(_i2, "\">").concat(_i2, "</div>");
      }

      // Next month days
      var daysFromNextMonth = 42 - (prevMonthDays + daysInMonth);
      for (var _i3 = 1; _i3 <= daysFromNextMonth; _i3++) {
        daysHtml += "<div class=\"day-item other-month disabled\">".concat(_i3, "</div>");
      }
      daysHtml += '</div>';

      // Combine all parts
      var html = yearsHtml + navHtml + daysHeaderHtml + daysHtml;

      // If multiple day selection is enabled, add the selection info
      if (this.options.multipleDays && this.selectedDates.length > 0) {
        html += this.renderSelectedDates();
      }
      return html;
    }

    // Render month selection mode
  }, {
    key: "renderMonthMode",
    value: function renderMonthMode() {
      //console.log('renderMonthMode')
      var year = this.currentDate.getFullYear();
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth();
      var currentYear = currentDate.getFullYear();

      // Create year selector
      var yearsHtml = this.renderYearSelector(year);

      // Create months grid
      var monthsHtml = '<div class="datepicker-month-container">';
      for (var i = 0; i < 12; i++) {
        var isSelected = this.isMonthSelected(i, year);
        // Check if month is selectable based on min/max date
        var isSelectable = this.isMonthSelectable(i, year);
        // Check if this is the current month
        var isThisMonth = i === currentMonth && year === currentYear;
        var classes = ['month-item', isSelected ? 'selected' : '', isThisMonth ? 'this-month' : '', !isSelectable ? 'disabled' : ''].filter(Boolean).join(' ');
        var monthAttrs = isSelectable ? "data-month=\"".concat(i, "\" data-year=\"").concat(year, "\"") : '';
        monthsHtml += "<div class=\"".concat(classes, "\" ").concat(monthAttrs, ">").concat(this.options.monthNames[i], "</div>");
      }
      monthsHtml += '</div>';

      // Combine all parts
      var html = yearsHtml + monthsHtml;

      // If multiple month selection is enabled, add the selection info
      if (this.options.multipleMonths && this.selectedMonths.length > 0) {
        html += this.renderSelectedMonths();
      }
      return html;
    }

    // Render year selector
  }, {
    key: "renderYearSelector",
    value: function renderYearSelector(currentYear) {
      // Get range of years based on min/max date constraints
      var _this$getYearsRange = this.getYearsRange(currentYear),
        startYear = _this$getYearsRange.startYear,
        endYear = _this$getYearsRange.endYear;
      var html = '<div class="datepicker-years">';
      html += '<select class="year-selector">';
      for (var year = startYear; year <= endYear; year++) {
        html += "<option value=\"".concat(year, "\" ").concat(year === currentYear ? 'selected' : '', ">").concat(year, "</option>");
      }
      html += '</select>';
      html += '</div>';
      return html;
    }

    // Render selected dates info (for multiple selection)
  }, {
    key: "renderSelectedDates",
    value: function renderSelectedDates() {
      var _this9 = this;
      var html = '<div class="multi-select-info">Selected Dates:</div>';
      html += '<div class="selected-list">';
      this.selectedDates.forEach(function (date, index) {
        var formatted = _this9.formatDate(date, _this9.options.dateFormat);
        html += "\n        <div class=\"selected-item\" data-index=\"".concat(index, "\">\n          ").concat(formatted, "\n          <button class=\"remove-btn\" data-index=\"").concat(index, "\">\xD7</button>\n        </div>\n      ");
      });
      html += '</div>';
      return html;
    }

    // Render selected months info (for multiple selection)
  }, {
    key: "renderSelectedMonths",
    value: function renderSelectedMonths() {
      var _this10 = this;
      var html = '<div class="multi-select-info">Selected Months:</div>';
      html += '<div class="selected-list">';
      this.selectedMonths.forEach(function (item, index) {
        // Validate the month object
        if (!item || typeof item.month !== 'number' || typeof item.year !== 'number' || item.month < 0 || item.month > 11 || isNaN(item.year)) {
          return; // Skip invalid months
        }

        // Create a date object and validate it
        var dateObj = new Date(item.year, item.month, 1);
        if (isNaN(dateObj.getTime())) {
          return; // Skip invalid dates
        }
        var formatted = _this10.formatDate(dateObj, _this10.options.monthFormat);

        // Only add to HTML if we got a valid formatted string
        if (formatted) {
          html += "\n        <div class=\"selected-item\" data-index=\"".concat(index, "\">\n          ").concat(formatted, "\n          <button class=\"remove-btn\" data-index=\"").concat(index, "\">\xD7</button>\n        </div>\n      ");
        }
      });
      html += '</div>';
      return html;
    }

    // Check if a date is selected
  }, {
    key: "isDateSelected",
    value: function isDateSelected(date) {
      return this.selectedDates.some(function (selectedDate) {
        return selectedDate.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear();
      });
    }

    // Check if a month is selected
  }, {
    key: "isMonthSelected",
    value: function isMonthSelected(month, year) {
      return this.selectedMonths.some(function (item) {
        return item.month === month && item.year === year;
      });
    }

    // Check if maximum month selections reached
  }, {
    key: "isMaxMonthSelectionsReached",
    value: function isMaxMonthSelectionsReached() {
      return this.options.maxMonthSelection !== null && this.selectedMonths.length >= this.options.maxMonthSelection;
    }

    // Attach event listeners
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this11 = this;
      // Tab switching (only if displayType is 'tabs')
      if (this.options.displayType === 'tabs') {
        var tabs = this.element.querySelectorAll('.datepicker-tab');
        tabs.forEach(function (tab) {
          tab.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            var mode = tab.getAttribute('data-mode');
            _this11.options.mode = mode;
            _this11.setModeCookie(mode); // Save mode to cookie
            _this11.render();
            _this11.attachEvents();

            // Trigger a custom event to notify of mode change
            var event = new CustomEvent('datepickerModeChange', {
              detail: {
                mode: mode
              }
            });
            _this11.element.dispatchEvent(event);
          });
        });
      }

      // Year selector
      var yearSelector = this.element.querySelector('.year-selector');
      if (yearSelector) {
        yearSelector.addEventListener('change', function (e) {
          _this11.currentDate.setFullYear(parseInt(e.target.value, 10));
          _this11.render();
          _this11.attachEvents();
        });
      }

      // Month navigation
      var prevMonthBtn = this.element.querySelector('.prev-month');
      var nextMonthBtn = this.element.querySelector('.next-month');
      if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling to keep the picker open

          // Check if going to the previous month is allowed based on min date
          if (_this11.options.minDate) {
            var minDate = new Date(_this11.options.minDate);
            var currentMonth = _this11.currentDate.getMonth();
            var currentYear = _this11.currentDate.getFullYear();

            // If we're already at the min date month and year, don't go back further
            if (currentMonth === 0 && currentYear === minDate.getFullYear() || currentMonth === minDate.getMonth() && currentYear === minDate.getFullYear()) {
              return;
            }
          }
          _this11.currentDate.setMonth(_this11.currentDate.getMonth() - 1);
          _this11.render();
          _this11.attachEvents();
        });
      }
      if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling to keep the picker open

          // Check if going to the next month is allowed based on max date
          if (_this11.options.maxDate) {
            var maxDate = new Date(_this11.options.maxDate);
            var currentMonth = _this11.currentDate.getMonth();
            var currentYear = _this11.currentDate.getFullYear();

            // If we're already at the max date month and year, don't go forward further
            if (currentMonth === 11 && currentYear === maxDate.getFullYear() || currentMonth === maxDate.getMonth() && currentYear === maxDate.getFullYear()) {
              return;
            }
          }
          _this11.currentDate.setMonth(_this11.currentDate.getMonth() + 1);
          _this11.render();
          _this11.attachEvents();
        });
      }

      // Day selection
      if (this.options.mode === 'day') {
        // Only select clickable days (those with data-clickable attribute)
        var dayItems = this.element.querySelectorAll('.day-item[data-clickable="true"]');
        dayItems.forEach(function (day) {
          day.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            var dateStr = day.getAttribute('data-date');
            if (dateStr) {
              var _dateStr$split$map = dateStr.split('-').map(Number),
                _dateStr$split$map2 = _slicedToArray(_dateStr$split$map, 3),
                year = _dateStr$split$map2[0],
                month = _dateStr$split$map2[1],
                date = _dateStr$split$map2[2];
              var selectedDate = new Date(year, month - 1, date);
              if (_this11.options.multipleDays) {
                // If multiple day selection is enabled
                var index = _this11.selectedDates.findIndex(function (d) {
                  return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
                });
                if (index === -1) {
                  // Add to selection
                  _this11.selectedDates.push(selectedDate);
                } else {
                  // Remove from selection
                  _this11.selectedDates.splice(index, 1);
                }

                // Update the UI to reflect the new selection
                // Remove 'selected' class from all days with data-clickable
                dayItems.forEach(function (di) {
                  return di.classList.remove('selected');
                });

                // Add 'selected' class to selected days
                _this11.selectedDates.forEach(function (selected) {
                  var dayStr = "".concat(selected.getFullYear(), "-").concat(selected.getMonth() + 1, "-").concat(selected.getDate());
                  var selectedEl = _this11.element.querySelector(".day-item[data-date=\"".concat(dayStr, "\"]"));
                  if (selectedEl) {
                    selectedEl.classList.add('selected');
                  }
                });
                _this11.render();
                _this11.attachEvents();
              } else {
                // Single selection
                _this11.selectedDates = [selectedDate];

                // Update the UI to reflect the new selection
                // Remove 'selected' class from all days with data-clickable
                dayItems.forEach(function (di) {
                  return di.classList.remove('selected');
                });
                // Add 'selected' class to the clicked day
                day.classList.add('selected');

                // Create an event to notify that a date has been selected and applied
                var event = new CustomEvent('datepickerApply', {
                  detail: {
                    mode: 'day',
                    selectedDates: _this11.selectedDates,
                    selectedMonths: []
                  }
                });
                _this11.element.dispatchEvent(event);

                // Update input value if available
                _this11.updateInputValue();

                // Hide the picker
                _this11.hide();

                // Call callback if provided
                if (_this11.options.onDateChange) {
                  _this11.options.onDateChange(_this11.selectedDates[0]);
                }
              }
            }
          });
        });
      }

      // Month selection
      // Month selection event handler for the DatepickerTabs class
      // This should replace the current month selection handler in attachEvents method

      // Month selection
      if (this.options.mode === 'month') {
        var monthItems = this.element.querySelectorAll('.month-item:not(.disabled)');
        monthItems.forEach(function (item) {
          item.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            var month = parseInt(item.getAttribute('data-month'), 10);
            var year = parseInt(item.getAttribute('data-year'), 10);
            if (_this11.options.multipleMonths) {
              // If multiple month selection is enabled
              var index = _this11.selectedMonths.findIndex(function (m) {
                return m.month === month && m.year === year;
              });
              if (index === -1) {
                // Check if adding the month would exceed the maximum allowed
                if (_this11.options.maxMonthSelection && _this11.selectedMonths.length >= _this11.options.maxMonthSelection) {
                  // If max reached, remove the oldest selection before adding new one
                  _this11.selectedMonths.shift();
                }

                // Add to selection
                _this11.selectedMonths.push({
                  month: month,
                  year: year
                });

                // Also update selected dates array with all month selections
                _this11.selectedDates = _this11.selectedMonths.map(function (m) {
                  return new Date(m.year, m.month, 1);
                });
              } else {
                // Remove from selection
                _this11.selectedMonths.splice(index, 1);

                // Update selected dates array to match
                _this11.selectedDates = _this11.selectedMonths.map(function (m) {
                  return new Date(m.year, m.month, 1);
                });
              }

              // Re-render to show updated selections
              _this11.render();
              _this11.attachEvents();

              // Update input value
              _this11.updateInputValue();

              // Call callback with all selected dates
              if (_this11.options.onDateChange) {
                _this11.options.onDateChange(_this11.selectedDates);
              }
            } else {
              // Single selection
              _this11.selectedMonths = [{
                month: month,
                year: year
              }];

              // Also update selected dates to first day of month
              _this11.selectedDates = [new Date(year, month, 1)];

              // Update currentDate to match the selected month
              _this11.currentDate = new Date(year, month, 1);

              // Re-render to show updated selections
              _this11.render();
              _this11.attachEvents();

              // If single month selection, apply immediately and close
              // Create an event to notify that a month has been selected and applied
              var event = new CustomEvent('datepickerApply', {
                detail: {
                  mode: 'month',
                  selectedDates: _this11.selectedDates,
                  selectedMonths: _this11.selectedMonths
                }
              });
              _this11.element.dispatchEvent(event);

              // Update input value if available
              _this11.updateInputValue();

              // Hide the picker
              _this11.hide();

              // Call callback if provided
              if (_this11.options.onDateChange) {
                _this11.options.onDateChange(_this11.selectedDates[0]);
              }
            }
          });
        });
      }

      // Remove buttons for multi-select
      var removeButtons = this.element.querySelectorAll('.remove-btn');
      removeButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent bubbling to parent
          var index = parseInt(btn.getAttribute('data-index'), 10);
          if (_this11.options.mode === 'day') {
            _this11.selectedDates.splice(index, 1);
          } else {
            _this11.selectedMonths.splice(index, 1);
          }
          _this11.render();
          _this11.attachEvents();

          // Call callback if provided
          if (_this11.options.onDateChange) {
            if (_this11.options.mode === 'day') {
              _this11.options.onDateChange(_this11.options.multiple ? _this11.selectedDates : _this11.selectedDates[0]);
            } else {
              var dates = _this11.selectedMonths.map(function (m) {
                return new Date(m.year, m.month, 1);
              });
              _this11.options.onDateChange(_this11.options.multiple ? dates : dates[0]);
            }
          }
        });
      });

      // Clear button
      var clearBtn = this.element.querySelector('.datepicker-btn.clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling to keep the picker open
          _this11.selectedDates = [];
          _this11.selectedMonths = [];
          _this11.render();
          _this11.attachEvents();

          // Update input value if available
          if (_this11.inputElement) {
            _this11.inputElement.value = '';
          }

          // Create a custom event for clearing
          var event = new CustomEvent('datepickerClear');
          _this11.element.dispatchEvent(event);

          // Call callback if provided
          if (_this11.options.onDateChange) {
            _this11.options.onDateChange(null);
          }
        });
      }

      // Apply button
      // Apply button handler for the DatepickerTabs class
      // This should replace the current Apply button handler in attachEvents method

      // Apply button
      var applyBtn = this.element.querySelector('.datepicker-btn.apply');
      if (applyBtn) {
        applyBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling

          // Create an event to notify that dates have been applied
          var event = new CustomEvent('datepickerApply', {
            detail: {
              mode: _this11.options.mode,
              selectedDates: _this11.selectedDates,
              selectedMonths: _this11.selectedMonths
            }
          });
          _this11.element.dispatchEvent(event);

          // Update input value if available
          _this11.updateInputValue();

          // Hide the picker
          _this11.hide();

          // Call callback if provided
          if (_this11.options.onDateChange) {
            if (_this11.options.mode === 'day') {
              // In day mode, only call if we have selections
              if (_this11.selectedDates.length > 0) {
                _this11.options.onDateChange(_this11.options.multipleDays ? _this11.selectedDates : _this11.selectedDates[0]);
              } else {
                _this11.options.onDateChange(null);
              }
            } else {
              // In month mode, convert month selections to dates (1st of each month)
              if (_this11.selectedMonths.length > 0) {
                var dates = _this11.selectedMonths.map(function (m) {
                  return new Date(m.year, m.month, 1);
                });
                _this11.options.onDateChange(_this11.options.multipleMonths ? dates : dates[0]);
              } else {
                _this11.options.onDateChange(null);
              }
            }
          }
        });
      }
    }

    /**
     * Public methods
     */

    /**
     * Set date picker mode
     * @param {string} mode - 'day' or 'month'
     */
  }, {
    key: "setMode",
    value: function setMode(mode) {
      if (mode === 'day' || mode === 'month') {
        this.options.mode = mode;
        if (this.options.displayType === 'tabs') {
          this.setModeCookie(mode);
        }
        this.render();
        this.attachEvents();
        this.updateInputValue();
      }
      return this;
    }
  }, {
    key: "getMode",
    value: function getMode() {
      return this.options.mode;
    }

    /**
     * Set display type
     * @param {string} type - 'tabs', 'day', or 'month'
     */
  }, {
    key: "setDisplayType",
    value: function setDisplayType(type) {
      if (type === 'tabs' || type === 'day' || type === 'month') {
        this.options.displayType = type;

        // If not tabs, force mode to match displayType
        if (type !== 'tabs') {
          this.options.mode = type;
        }

        // Re-render picker
        this.render();
        this.attachEvents();
      }
      return this;
    }

    /**
     * Set selected date(s)
     * @param {Date|Date[]|null} date - Date or array of dates to select
     */
  }, {
    key: "setDate",
    value: function setDate(date) {
      if (Array.isArray(date)) {
        this.selectedDates = date.map(function (d) {
          return new Date(d);
        });

        // Also update month selection if in month mode
        this.selectedMonths = date.map(function (d) {
          return {
            month: new Date(d).getMonth(),
            year: new Date(d).getFullYear()
          };
        });
      } else if (date) {
        this.selectedDates = [new Date(date)];

        // Also update month selection if in month mode
        var d = new Date(date);
        this.selectedMonths = [{
          month: d.getMonth(),
          year: d.getFullYear()
        }];
      } else {
        this.selectedDates = [];
        this.selectedMonths = [];
      }
      this.render();
      this.attachEvents();
      this.updateInputValue();
      return this;
    }

    /**
     * Set max month selection limit
     * @param {number|null} limit - Max number of months that can be selected
     */
  }, {
    key: "setMaxMonthSelection",
    value: function setMaxMonthSelection(limit) {
      this.options.maxMonthSelection = limit;

      // If current selections exceed the new limit, trim the excess
      if (limit !== null && this.selectedMonths.length > limit) {
        // Keep only the most recent selections up to the limit
        this.selectedMonths = this.selectedMonths.slice(-limit);

        // Also update the selectedDates to match
        this.selectedDates = this.selectedMonths.map(function (m) {
          return new Date(m.year, m.month, 1);
        });
        this.render();
        this.attachEvents();
        this.updateInputValue();
      }
      return this;
    }

    /**
     * Get selected date(s)
     * @returns {Date|Date[]|null} - Selected date(s)
     */
  }, {
    key: "getDate",
    value: function getDate() {
      if (this.options.mode === 'day') {
        return this.selectedDates.length === 0 ? null : this.options.multipleDays ? this.selectedDates : this.selectedDates[0];
      } else {
        // Convert month selections to dates (1st of each month)
        var dates = this.selectedMonths.map(function (m) {
          return new Date(m.year, m.month, 1);
        });
        return dates.length === 0 ? null : this.options.multipleMonths ? dates : dates[0];
      }
    }

    /**
     * Enable/disable multiple days selection
     * @param {boolean} enable - Whether to enable multiple day selection
     */
  }, {
    key: "setMultipleDays",
    value: function setMultipleDays(enable) {
      this.options.multipleDays = !!enable;
      this.render();
      this.attachEvents();
      return this;
    }

    /**
     * Enable/disable multiple months selection
     * @param {boolean} enable - Whether to enable multiple month selection
     */
  }, {
    key: "setMultipleMonths",
    value: function setMultipleMonths(enable) {
      this.options.multipleMonths = !!enable;
      this.render();
      this.attachEvents();
      return this;
    }

    /**
     * Enable/disable multiple selection (both days and months)
     * @param {boolean} enable - Whether to enable multiple selection
     */
  }, {
    key: "setMultiple",
    value: function setMultiple(enable) {
      this.options.multipleDays = !!enable;
      this.options.multipleMonths = !!enable;
      this.render();
      this.attachEvents();
      return this;
    }

    /**
     * Set date format
     * @param {string} format - Format string
     */
  }, {
    key: "setDateFormat",
    value: function setDateFormat(format) {
      this.options.dateFormat = format;
      this.updateInputValue();
      return this;
    }

    /**
     * Set month format
     * @param {string} format - Format string
     */
  }, {
    key: "setMonthFormat",
    value: function setMonthFormat(format) {
      this.options.monthFormat = format;
      this.updateInputValue();
      return this;
    }

    /**
     * Set min date
     * @param {Date|null} date - Minimum selectable date
     */
  }, {
    key: "setMinDate",
    value: function setMinDate(date) {
      this.options.minDate = date ? new Date(date) : null;
      this.render();
      this.attachEvents();
      return this;
    }

    /**
     * Set max date
     * @param {Date|null} date - Maximum selectable date
     */
  }, {
    key: "setMaxDate",
    value: function setMaxDate(date) {
      this.options.maxDate = date ? new Date(date) : null;
      this.render();
      this.attachEvents();
      return this;
    }

    /**
     * Destroy the datepicker instance and clean up
     */
  }, {
    key: "destroy",
    value: function destroy() {
      // Remove event listeners from input
      if (this.inputElement) {
        var newInputElement = this.inputElement.cloneNode(true);
        this.inputElement.parentNode.replaceChild(newInputElement, this.inputElement);
      }

      // Remove the container element from DOM
      if (this.containerElement && this.containerElement.parentNode) {
        this.containerElement.parentNode.removeChild(this.containerElement);
      }

      // Clean up references
      this.element = null;
      this.inputElement = null;
      this.containerElement = null;
      this.instances = [];
    }

    // This one used to render in demos
  }, {
    key: "getDatesAsString",
    value: function getDatesAsString(dates) {
      var currentMode = this.getMode();
      if (Array.isArray(dates)) {
        return dates.map(function (d) {
          var month = d.toLocaleString('default', {
            month: 'short'
          });
          var year = d.getFullYear();
          var day = d.getDay();
          if ('day' == currentMode) {
            return "".concat(day, " ").concat(month, " ").concat(year);
          } else {
            return "".concat(month, " ").concat(year);
          }
        }).join(', ');
      } else {
        var month = dates.toLocaleString('default', {
          month: 'short'
        });
        var year = dates.getFullYear();
        var day = dates.getDate();
        if ('day' == currentMode) {
          return "".concat(day, " ").concat(month, " ").concat(year);
        } else {
          return "".concat(month, " ").concat(year);
        }
      }
    }
  }]);
}(); // Create global reference
window.DatepickerTabs = DatepickerTabs;