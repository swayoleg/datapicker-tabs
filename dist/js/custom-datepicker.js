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
 *
 * @version 1.2.0
 *
 * FEATURES:
 * - Day and Month selection modes
 * - Single or multiple selection for both days and months
 * - Format customization
 * - Min/Max date constraints
 * - Max month selection limit
 * - Display type options: 'tabs', 'day', or 'month'
 * - Saturday-only selection for fishing venues
 * - Cookie-based mode persistence
 * - Tooltip overlay positioning
 * - Mobile-friendly design
 * - Automatic container creation
 * - Support for multiple instances with class selectors
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
 * const picker = new DatepickerTabs('.date-input', {
 *   mode: 'month',
 *   multipleDays: false,  // Single day selection
 *   multipleMonths: true, // Multiple month selection
 *   dateFormat: 'DD/MM/YYYY',
 *   displayType: 'tabs', // 'tabs', 'day', or 'month'
 *   maxMonthSelection: 6, // Limit to select max 6 months
 *   maxDate: new Date(2026, 11, 31), // Max selectable date
 *   futureSaturdaysOnly: true,
 *   onDateChange: function(date) {
 *     console.log('Selected date:', date);
 *   }
 * });
 * ```
 *
 * 3. Methods:
 * ```javascript
 * // Set date programmatically
 * picker.setDate(new Date());
 *
 * // Get currently selected date(s)
 * const date = picker.getDate();
 *
 * // Switch mode
 * picker.setMode('month');
 *
 * // Enable/disable multiple day selection
 * picker.setMultipleDays(true);
 * 
 * // Enable/disable multiple month selection
 * picker.setMultipleMonths(true);
 * 
 * // Enable both multiple days and months
 * picker.setMultiple(true);
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
      startDate: new Date(),
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
      containerId: '' // Custom container ID to render calendar (if not provided, one will be generated)
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
        console.error('DatapickerTabs: No elements found with selector:', selector);
        return;
      }
    } else if (selector instanceof HTMLElement) {
      // If an actual element is passed, use it directly
      this.inputElement = selector;
    } else {
      console.error('DatapickerTabs: Invalid selector or element:', selector);
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

    // Try to restore mode from cookie (only if displayType is 'tabs')
    if (this.options.displayType === 'tabs') {
      this.restoreModeFromCookie();
    }

    // Initialize the datepicker
    this.init();
  }

  /**
   * Create a datepicker instance for a specific input element
   * @private
   */
  return _createClass(DatepickerTabs, [{
    key: "_createInstance",
    value: function _createInstance(inputElement, options, containerId) {
      // Create a new options object with the input element
      var instanceOptions = _objectSpread(_objectSpread({}, options), {}, {
        containerId: containerId
      });

      // Create a new instance and return it
      return new DatapickerTabs(inputElement, instanceOptions);
    }

    /**
     * Format a date according to the specified format
     * Supports:
     * - DD: Day of month with leading zero
     * - D: Day of month without leading zero
     * - MMM: Month name short (Jan, Feb, etc.)
     * - MMMM: Month name full (January, February, etc.)
     * - MM: Month number with leading zero
     * - M: Month number without leading zero
     * - YYYY: Full year (2023)
     * - YY: Short year (23)
     */
  }, {
    key: "formatDate",
    value: function formatDate(date, format) {
      if (!date) return '';
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();

      // Replace format tokens with actual values
      return format.replace(/DD/g, day.toString().padStart(2, '0')).replace(/D/g, day.toString()).replace(/MMMM/g, this.options.monthNames[month]).replace(/MMM/g, this.options.monthNames[month].substr(0, 3)).replace(/MM/g, (month + 1).toString().padStart(2, '0')).replace(/M/g, (month + 1).toString()).replace(/YYYY/g, year.toString()).replace(/YY/g, year.toString().substr(2, 2));
    }

    /**
     * Position the datepicker relative to the input element
     * Adjusts to stay in viewport
     */
  }, {
    key: "positionPicker",
    value: function positionPicker() {
      if (!this.inputElement) return;
      var container = this.element.querySelector('.custom-datepicker-container');
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
      var _this2 = this;
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
        if (_this2.isVisible && !_this2.element.contains(e.target) && (!_this2.inputElement || !_this2.inputElement.contains(e.target))) {
          _this2.hide();
        }
      });
    }

    /**
     * Setup input element events
     */
  }, {
    key: "setupInputElement",
    value: function setupInputElement() {
      var _this3 = this;
      // Update input with initial date if available
      this.inputElement.classList.add('datepicker-input');
      this.updateInputValue();

      // Add click handler to show the picker
      this.inputElement.addEventListener('click', function (e) {
        e.stopPropagation();
        if (_this3.isVisible) {
          _this3.hide();
        } else {
          _this3.show();
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
      var _this4 = this;
      if (!this.inputElement) return;
      if (this.options.mode === 'day') {
        if (this.selectedDates.length === 0) {
          this.inputElement.value = '';
        } else if (this.options.multipleDays) {
          var formattedDates = this.selectedDates.map(function (d) {
            return _this4.formatDate(d, _this4.options.dateFormat);
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
            return _this4.formatDate(new Date(m.year, m.month, 1), _this4.options.monthFormat);
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
      var _this5 = this;
      if (this.isVisible) return;

      // Show the container
      var container = this.element.querySelector('.custom-datepicker-container');
      if (container) {
        container.style.display = 'block';
        this.isVisible = true;

        // Position the picker with a slight delay to ensure it's rendered
        setTimeout(function () {
          _this5.positionPicker();
        }, 0);

        // Add window resize handler (but not scroll handler)
        this.resizeHandler = function () {
          if (_this5.isVisible) {
            _this5.positionPicker();
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
      if (!this.isVisible && !this.element.querySelector('.custom-datepicker-container')) return;

      // Hide the container
      var container = this.element.querySelector('.custom-datepicker-container');
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
      var startYear = currentYear - 5;
      var endYear = currentYear + 5;

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
      var container = this.element.querySelector('.custom-datepicker-container');
      if (!container) {
        // First time rendering - create the full container
        container = document.createElement('div');
        container.className = 'custom-datepicker-container';

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
      var _this6 = this;
      var html = '<div class="multi-select-info">Selected Dates:</div>';
      html += '<div class="selected-list">';
      this.selectedDates.forEach(function (date, index) {
        var formatted = _this6.formatDate(date, _this6.options.dateFormat);
        html += "\n        <div class=\"selected-item\" data-index=\"".concat(index, "\">\n          ").concat(formatted, "\n          <button class=\"remove-btn\" data-index=\"").concat(index, "\">\xD7</button>\n        </div>\n      ");
      });
      html += '</div>';
      return html;
    }

    // Render selected months info (for multiple selection)
  }, {
    key: "renderSelectedMonths",
    value: function renderSelectedMonths() {
      var _this7 = this;
      var html = '<div class="multi-select-info">Selected Months:</div>';
      html += '<div class="selected-list">';
      this.selectedMonths.forEach(function (item, index) {
        var formatted = _this7.formatDate(new Date(item.year, item.month, 1), _this7.options.monthFormat);
        html += "\n        <div class=\"selected-item\" data-index=\"".concat(index, "\">\n          ").concat(formatted, "\n          <button class=\"remove-btn\" data-index=\"").concat(index, "\">\xD7</button>\n        </div>\n      ");
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
      var _this8 = this;
      // Tab switching (only if displayType is 'tabs')
      if (this.options.displayType === 'tabs') {
        var tabs = this.element.querySelectorAll('.datepicker-tab');
        tabs.forEach(function (tab) {
          tab.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            var mode = tab.getAttribute('data-mode');
            _this8.options.mode = mode;
            _this8.setModeCookie(mode); // Save mode to cookie
            _this8.render();
            _this8.attachEvents();

            // Trigger a custom event to notify of mode change
            var event = new CustomEvent('datepickerModeChange', {
              detail: {
                mode: mode
              }
            });
            _this8.element.dispatchEvent(event);
          });
        });
      }

      // Year selector
      var yearSelector = this.element.querySelector('.year-selector');
      if (yearSelector) {
        yearSelector.addEventListener('change', function (e) {
          _this8.currentDate.setFullYear(parseInt(e.target.value, 10));
          _this8.render();
          _this8.attachEvents();
        });
      }

      // Month navigation
      var prevMonthBtn = this.element.querySelector('.prev-month');
      var nextMonthBtn = this.element.querySelector('.next-month');
      if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling to keep the picker open

          // Check if going to the previous month is allowed based on min date
          if (_this8.options.minDate) {
            var minDate = new Date(_this8.options.minDate);
            var currentMonth = _this8.currentDate.getMonth();
            var currentYear = _this8.currentDate.getFullYear();

            // If we're already at the min date month and year, don't go back further
            if (currentMonth === 0 && currentYear === minDate.getFullYear() || currentMonth === minDate.getMonth() && currentYear === minDate.getFullYear()) {
              return;
            }
          }
          _this8.currentDate.setMonth(_this8.currentDate.getMonth() - 1);
          _this8.render();
          _this8.attachEvents();
        });
      }
      if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling to keep the picker open

          // Check if going to the next month is allowed based on max date
          if (_this8.options.maxDate) {
            var maxDate = new Date(_this8.options.maxDate);
            var currentMonth = _this8.currentDate.getMonth();
            var currentYear = _this8.currentDate.getFullYear();

            // If we're already at the max date month and year, don't go forward further
            if (currentMonth === 11 && currentYear === maxDate.getFullYear() || currentMonth === maxDate.getMonth() && currentYear === maxDate.getFullYear()) {
              return;
            }
          }
          _this8.currentDate.setMonth(_this8.currentDate.getMonth() + 1);
          _this8.render();
          _this8.attachEvents();
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
              if (_this8.options.multipleDays) {
                // If multiple day selection is enabled
                var index = _this8.selectedDates.findIndex(function (d) {
                  return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
                });
                if (index === -1) {
                  // Add to selection
                  _this8.selectedDates.push(selectedDate);
                } else {
                  // Remove from selection
                  _this8.selectedDates.splice(index, 1);
                }

                // Update the UI to reflect the new selection
                // Remove 'selected' class from all days with data-clickable
                dayItems.forEach(function (di) {
                  return di.classList.remove('selected');
                });

                // Add 'selected' class to selected days
                _this8.selectedDates.forEach(function (selected) {
                  var dayStr = "".concat(selected.getFullYear(), "-").concat(selected.getMonth() + 1, "-").concat(selected.getDate());
                  var selectedEl = _this8.element.querySelector(".day-item[data-date=\"".concat(dayStr, "\"]"));
                  if (selectedEl) {
                    selectedEl.classList.add('selected');
                  }
                });
                _this8.render();
                _this8.attachEvents();
              } else {
                // Single selection
                _this8.selectedDates = [selectedDate];

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
                    selectedDates: _this8.selectedDates,
                    selectedMonths: []
                  }
                });
                _this8.element.dispatchEvent(event);

                // Update input value if available
                _this8.updateInputValue();

                // Hide the picker
                _this8.hide();

                // Call callback if provided
                if (_this8.options.onDateChange) {
                  _this8.options.onDateChange(_this8.selectedDates[0]);
                }
              }
            }
          });
        });
      }

      // Month selection
      if (this.options.mode === 'month') {
        var monthItems = this.element.querySelectorAll('.month-item:not(.disabled)');
        monthItems.forEach(function (item) {
          item.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            var month = parseInt(item.getAttribute('data-month'), 10);
            var year = parseInt(item.getAttribute('data-year'), 10);
            if (_this8.options.multipleMonths) {
              // If multiple month selection is enabled
              var index = _this8.selectedMonths.findIndex(function (m) {
                return m.month === month && m.year === year;
              });
              if (index === -1) {
                // Check if adding the month would exceed the maximum allowed
                if (_this8.options.maxMonthSelection && _this8.selectedMonths.length >= _this8.options.maxMonthSelection) {
                  // If max reached, remove the oldest selection before adding new one
                  _this8.selectedMonths.shift();
                }

                // Add to selection
                _this8.selectedMonths.push({
                  month: month,
                  year: year
                });
              } else {
                // Remove from selection
                _this8.selectedMonths.splice(index, 1);
              }
            } else {
              // Single selection
              _this8.selectedMonths = [{
                month: month,
                year: year
              }];

              // Also update selected dates to first day of month
              _this8.selectedDates = [new Date(year, month, 1)];

              // If single month selection, apply immediately and close
              // Create an event to notify that a month has been selected and applied
              var event = new CustomEvent('datepickerApply', {
                detail: {
                  mode: 'month',
                  selectedDates: _this8.selectedDates,
                  selectedMonths: _this8.selectedMonths
                }
              });
              _this8.element.dispatchEvent(event);

              // Update input value if available
              _this8.updateInputValue();

              // Hide the picker
              _this8.hide();

              // Call callback if provided
              if (_this8.options.onDateChange) {
                _this8.options.onDateChange(_this8.selectedDates[0]);
              }
              return;
            }

            // Update the UI to reflect the new selection
            // Remove 'selected' class from all months
            monthItems.forEach(function (mi) {
              return mi.classList.remove('selected');
            });

            // Add 'selected' class to selected months
            _this8.selectedMonths.forEach(function (selected) {
              if (selected.year === year) {
                var selectedEl = _this8.element.querySelector(".month-item[data-month=\"".concat(selected.month, "\"][data-year=\"").concat(selected.year, "\"]"));
                if (selectedEl) {
                  selectedEl.classList.add('selected');
                }
              }
            });
            _this8.render();
            _this8.attachEvents();
          });
        });
      }

      // Remove buttons for multi-select
      var removeButtons = this.element.querySelectorAll('.remove-btn');
      removeButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent bubbling to parent
          var index = parseInt(btn.getAttribute('data-index'), 10);
          if (_this8.options.mode === 'day') {
            _this8.selectedDates.splice(index, 1);
          } else {
            _this8.selectedMonths.splice(index, 1);
          }
          _this8.render();
          _this8.attachEvents();

          // Call callback if provided
          if (_this8.options.onDateChange) {
            if (_this8.options.mode === 'day') {
              _this8.options.onDateChange(_this8.options.multiple ? _this8.selectedDates : _this8.selectedDates[0]);
            } else {
              var dates = _this8.selectedMonths.map(function (m) {
                return new Date(m.year, m.month, 1);
              });
              _this8.options.onDateChange(_this8.options.multiple ? dates : dates[0]);
            }
          }
        });
      });

      // Clear button
      var clearBtn = this.element.querySelector('.datepicker-btn.clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling to keep the picker open
          _this8.selectedDates = [];
          _this8.selectedMonths = [];
          _this8.render();
          _this8.attachEvents();

          // Update input value if available
          if (_this8.inputElement) {
            _this8.inputElement.value = '';
          }

          // Create a custom event for clearing
          var event = new CustomEvent('datepickerClear');
          _this8.element.dispatchEvent(event);

          // Call callback if provided
          if (_this8.options.onDateChange) {
            _this8.options.onDateChange(null);
          }
        });
      }

      // Apply button
      var applyBtn = this.element.querySelector('.datepicker-btn.apply');
      if (applyBtn) {
        applyBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent event bubbling

          // Create an event to notify that dates have been applied
          var event = new CustomEvent('datepickerApply', {
            detail: {
              mode: _this8.options.mode,
              selectedDates: _this8.selectedDates,
              selectedMonths: _this8.selectedMonths
            }
          });
          _this8.element.dispatchEvent(event);

          // Update input value if available
          _this8.updateInputValue();

          // Hide the picker
          _this8.hide();

          // Call callback if provided
          if (_this8.options.onDateChange) {
            if (_this8.options.mode === 'day') {
              // In day mode, only call if we have selections
              if (_this8.selectedDates.length > 0) {
                _this8.options.onDateChange(_this8.options.multiple ? _this8.selectedDates : _this8.selectedDates[0]);
              } else {
                _this8.options.onDateChange(null);
              }
            } else {
              // In month mode, convert month selections to dates (1st of each month)
              if (_this8.selectedMonths.length > 0) {
                var dates = _this8.selectedMonths.map(function (m) {
                  return new Date(m.year, m.month, 1);
                });
                _this8.options.onDateChange(_this8.options.multiple ? dates : dates[0]);
              } else {
                _this8.options.onDateChange(null);
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
  }]);
}(); // Create global reference
window.DatepickerTabs = DatepickerTabs;