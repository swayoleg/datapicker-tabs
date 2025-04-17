/**
 * datepicker-tabs - A versatile date picker. Great for booking systems! If users don't have a specific date in mind, they can easily pick a few different dates, a  whole month, or even  several months at once (with a maximum limit)
 * @version v1.0.1
 * @link https://swayoleg.github.io/datepicker-tabs/
 * @license MIT
 */
"use strict";

/**
 * DatepickerTabs
 *
 * A versatile date picker with day and month selection modes,
 * multiple selection support, and various formatting options.
 * Perfect for booking systems when users need to select multiple dates or months.
 *
 * @version 1.0.1
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

class DatepickerTabs {
  constructor(selector, options = {}) {
    // Define default options
    const defaults = {
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
    this.options = {
      ...defaults,
      ...options
    };

    // Store instance references 
    this.instances = [];

    // Check if selector refers to multiple elements
    if (typeof selector === 'string') {
      const elements = document.querySelectorAll(selector);

      // If multiple elements found, initialize on each one
      if (elements.length > 1) {
        elements.forEach((inputElement, index) => {
          const instanceOptions = {
            ...this.options
          };
          // Create a unique container ID for each instance
          const instanceId = `datepicker-container-${Date.now()}-${index}`;
          this.instances.push(this._createInstance(inputElement, instanceOptions, instanceId));
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
    const containerId = this.options.containerId || `datepicker-container-${Date.now()}`;
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
      const startDate = new Date(this.options.startDate);
      this.selectedMonths.push({
        month: startDate.getMonth(),
        year: startDate.getFullYear()
      });
    }

    // Initialize current date to selected month or date if available
    if (this.selectedMonths.length > 0) {
      const selectedMonth = this.selectedMonths[0];
      this.currentDate = new Date(selectedMonth.year, selectedMonth.month, 1);
    } else if (this.selectedDates.length > 0) {
      const selectedDate = this.selectedDates[0];
      this.currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }

    // Try to restore mode from cookie (only if displayType is 'tabs')
    if (this.options.displayType === 'tabs') {
      this.restoreModeFromCookie();
    }
    if (this.inputElement && this.inputElement.value && !this.options.startDate) {
      if (this.options.mode === 'day') {
        const parsedDates = this.parseDateInput(this.inputElement.value);
        if (parsedDates.length > 0) {
          this.selectedDates = parsedDates;
          this.currentDate = new Date(parsedDates[0].getFullYear(), parsedDates[0].getMonth(), 1);
        }
      } else if (this.options.mode === 'month') {
        const parsedMonths = this.parseMonthInput(this.inputElement.value);
        if (parsedMonths.length > 0) {
          this.selectedMonths = parsedMonths;
          this.selectedDates = parsedMonths.map(m => new Date(m.year, m.month, 1));
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
  parseDate(dateStr, format) {
    if (!dateStr || !format) return null;

    // Create mapping objects for format tokens
    const formatTokens = {
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
    let regexFormat = format.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Replace format tokens with regex capture groups
    Object.keys(formatTokens).forEach(token => {
      regexFormat = regexFormat.replace(new RegExp(token, 'g'), formatTokens[token].source);
    });

    // Create final regex with anchors
    const regex = new RegExp(`^${regexFormat}$`);
    const match = dateStr.match(regex);
    if (!match) return null;

    // Extract date parts with a more robust approach
    let day = 1,
      month = 0,
      year = new Date().getFullYear();
    try {
      // Process all capturing groups from the regex match
      let groupCount = 1; // Skip first group which is the whole match

      while (groupCount < match.length) {
        const val = match[groupCount];

        // Try to find which part of the date this group represents
        // based on its format and value
        if (/^\d{4}$/.test(val)) {
          // Likely a 4-digit year
          year = parseInt(val, 10);
        } else if (/^\d{2}$/.test(val) && parseInt(val, 10) > 31) {
          // Likely a 2-digit year
          const twoDigitYear = parseInt(val, 10);
          const currentYear = new Date().getFullYear();
          const century = Math.floor(currentYear / 100) * 100;
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
          const monthIndex = this.options.monthNames.findIndex(m => m.toLowerCase().startsWith(val.toLowerCase()));
          if (monthIndex !== -1) {
            month = monthIndex;
          }
        }
        groupCount++;
      }

      // Create and validate the date
      const parsedDate = new Date(year, month, day);
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
  DPTisValidDate(date) {
    return date && date instanceof Date && !isNaN(date.getTime());
  }

  /**
   * Parse multiple date strings from input value
   */
  parseDateInput(inputValue) {
    if (!inputValue) return [];

    // Determine which format to use based on mode
    const format = this.options.mode === 'day' ? this.options.dateFormat : this.options.monthFormat;

    // Split by commas for multiple dates
    const dateStrings = inputValue.split(',').map(str => str.trim());

    // Parse each date string and validate
    return dateStrings.map(dateStr => {
      const date = this.parseDate(dateStr, format);
      return this.DPTisValidDate(date) ? date : null;
    }).filter(date => date !== null); // Filter out invalid dates
  }

  /**
   * Enhanced version of parseMonthInput to ensure more reliable parsing
   */
  parseMonthInput(inputValue) {
    if (!inputValue) return [];

    // Split by commas for multiple months
    const monthStrings = inputValue.split(',').map(str => str.trim());

    // Parse each month string and convert to month objects
    return monthStrings.map(monthStr => {
      // Try direct parsing with the configured format
      const date = this.parseDate(monthStr, this.options.monthFormat);
      if (date && !isNaN(date.getTime())) {
        return {
          month: date.getMonth(),
          year: date.getFullYear()
        };
      }

      // If direct parsing fails, try a more flexible approach
      // This helps with various month formats like "Apr 2025" or "April 2025"
      const monthYearPattern = /([A-Za-z]+)\s+(\d{4})/i;
      const match = monthStr.match(monthYearPattern);
      if (match) {
        const monthName = match[1];
        const year = parseInt(match[2], 10);

        // Find month by name
        const monthIndex = this.options.monthNames.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase()));
        if (monthIndex !== -1 && !isNaN(year)) {
          return {
            month: monthIndex,
            year: year
          };
        }
      }

      // Also try numeric format like "MM/YYYY"
      const numericPattern = /(\d{1,2})[\/\-\s](\d{4})/;
      const numMatch = monthStr.match(numericPattern);
      if (numMatch) {
        const month = parseInt(numMatch[1], 10) - 1; // Convert to 0-based
        const year = parseInt(numMatch[2], 10);
        if (month >= 0 && month <= 11 && !isNaN(year)) {
          return {
            month: month,
            year: year
          };
        }
      }
      return null;
    }).filter(month => month !== null); // Filter out invalid months
  }

  /**
   * Create a datepicker instance for a specific input element
   * @private
   */
  _createInstance(inputElement, options, containerId) {
    // Create a new options object with the input element
    const instanceOptions = {
      ...options,
      containerId
    };

    // Create a new instance and return it
    return new DatepickerTabs(inputElement, instanceOptions);
  }

  /**
   * DatepickerTabs Format Date Fix
   *
   * This is a corrected formatDate method that properly handles month name formatting
   * without issues like replacing the 'D' in 'Dec' with the day number.
   */

  formatDate(date, format) {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

    // For the specific month-year format that's causing problems,
    // use a direct approach
    if (format === 'MMM YYYY' || format === 'MMMM YYYY') {
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      if (format === 'MMM YYYY') {
        // Use the first 3 characters of the month name
        const shortMonthName = this.options.monthNames[monthIndex].substring(0, 3);
        return `${shortMonthName} ${year}`;
      } else {
        // Use the full month name
        return `${this.options.monthNames[monthIndex]} ${year}`;
      }
    }

    // For other formats, use a direct replacement approach
    // that avoids the issue with 'D' in month names
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Create a copy of the format string
    let result = format;

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
  positionPicker() {
    if (!this.inputElement) return;
    const container = this.element.querySelector('.custom-datepickertabs-container');
    if (!container) return;

    // Get input position and dimensions
    const inputRect = this.inputElement.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const containerWidth = container.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Check if there's enough space below
    const spaceBelow = windowHeight - inputRect.bottom;
    const showOnTop = spaceBelow < containerHeight && inputRect.top > containerHeight;

    // Calculate scroll offset for initial positioning
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Position horizontally - align with input field left edge
    let left = inputRect.left + scrollLeft;

    // Ensure the picker doesn't go off-screen to the right
    if (left + containerWidth > windowWidth + scrollLeft) {
      left = inputRect.right - containerWidth + scrollLeft;
    }

    // Ensure the picker doesn't go off-screen to the left
    if (left < scrollLeft) {
      left = scrollLeft + 5;
    }

    // Position vertically based on available space
    let top;
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
    container.style.top = `${top}px`;
    container.style.left = `${left}px`;
    container.style.zIndex = this.options.zIndex;
  }

  /**
   * Initialize the datepicker
   */
  init() {
    this.render();
    this.attachEvents();

    // Set up input element if provided
    if (this.inputElement) {
      this.setupInputElement();
    }

    // Initially hide the picker
    this.hide();

    // Add document click handler to close when clicking outside
    document.addEventListener('click', e => {
      if (this.isVisible && !this.element.contains(e.target) && (!this.inputElement || !this.inputElement.contains(e.target))) {
        this.hide();
      }
    });
  }

  /**
   * Setup input element events
   */
  setupInputElement() {
    // Update input with initial date if available
    this.inputElement.classList.add('datepicker-input');
    this.updateInputValue();

    // Add click handler to show the picker
    this.inputElement.addEventListener('click', e => {
      e.stopPropagation();
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
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
  updateInputValue() {
    if (!this.inputElement) return;
    if (this.options.mode === 'day') {
      if (this.selectedDates.length === 0) {
        this.inputElement.value = '';
      } else if (this.options.multipleDays) {
        const formattedDates = this.selectedDates.map(d => this.formatDate(d, this.options.dateFormat));
        this.inputElement.value = formattedDates.join(', ');
      } else {
        this.inputElement.value = this.formatDate(this.selectedDates[0], this.options.dateFormat);
      }
    } else {
      if (this.selectedMonths.length === 0) {
        this.inputElement.value = '';
      } else if (this.options.multipleMonths) {
        const formattedMonths = this.selectedMonths.map(m => this.formatDate(new Date(m.year, m.month, 1), this.options.monthFormat));
        this.inputElement.value = formattedMonths.join(', ');
      } else {
        const m = this.selectedMonths[0];
        this.inputElement.value = this.formatDate(new Date(m.year, m.month, 1), this.options.monthFormat);
      }
    }
  }

  /**
   * Show the datepicker
   */
  show() {
    if (this.isVisible) return;

    //console.log('show');

    // Parse the input value every time before showing
    if (this.inputElement && this.inputElement.value) {
      if (this.options.mode === 'month') {
        const parsedMonths = this.parseMonthInput(this.inputElement.value);
        if (parsedMonths.length > 0) {
          this.selectedMonths = parsedMonths;
          this.selectedDates = parsedMonths.map(m => new Date(m.year, m.month, 1));

          // Important: Always update the currentDate to show the view of the selected month
          // This is the key fix for single month selection
          const selectedMonth = parsedMonths[0];
          this.currentDate = new Date(selectedMonth.year, selectedMonth.month, 1);
        }
      } else if (this.options.mode === 'day') {
        const parsedDates = this.parseDateInput(this.inputElement.value);
        if (parsedDates.length > 0) {
          this.selectedDates = parsedDates;
          // Update the view to show the month of the selected date
          const selectedDate = parsedDates[0];
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
    const container = this.element.querySelector('.custom-datepickertabs-container');
    if (container) {
      container.style.display = 'block';
      this.isVisible = true;

      // Position the picker with a slight delay to ensure it's rendered
      setTimeout(() => {
        this.positionPicker();
      }, 0);

      // Add window resize handler (but not scroll handler)
      this.resizeHandler = () => {
        if (this.isVisible) {
          this.positionPicker();
        }
      };
      window.addEventListener('resize', this.resizeHandler);

      // Trigger a custom event
      const event = new CustomEvent('datepickerShow');
      this.element.dispatchEvent(event);
    }
  }

  /**
   * Hide the datepicker
   */
  hide() {
    if (!this.isVisible && !this.element.querySelector('.custom-datepickertabs-container')) return;

    // Hide the container
    const container = this.element.querySelector('.custom-datepickertabs-container');
    if (container) {
      container.style.display = 'none';
      this.isVisible = false;

      // Remove resize event listener
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }

      // Trigger a custom event
      const event = new CustomEvent('datepickerHide');
      this.element.dispatchEvent(event);
    }
  }

  // Set cookie for mode persistence
  setModeCookie(mode) {
    if (this.options.displayType !== 'tabs') return; // Only use cookies in tabs mode

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Cookie expires in 7 days
    document.cookie = `${this.options.cookieName}=${mode};expires=${expiryDate.toUTCString()};path=/`;
  }

  // Get mode from cookie
  getModeCookie() {
    const name = this.options.cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  // Restore mode from cookie if available
  restoreModeFromCookie() {
    const savedMode = this.getModeCookie();
    if (savedMode && (savedMode === 'day' || savedMode === 'month')) {
      this.options.mode = savedMode;
    }
  }

  /**
   * Get years range for year selector based on min/max date constraints
   */
  getYearsRange(currentYear) {
    let startYear = currentYear - this.options.backwardsYearsOffset;
    let endYear = currentYear + this.options.forwardsYearsOffset;

    // Apply min date constraint
    if (this.options.minDate) {
      const minYear = this.options.minDate.getFullYear();
      startYear = Math.max(startYear, minYear);
    }

    // Apply max date constraint
    if (this.options.maxDate) {
      const maxYear = this.options.maxDate.getFullYear();
      endYear = Math.min(endYear, maxYear);
    }
    return {
      startYear,
      endYear
    };
  }

  /**
   * Check if a month is selectable based on min/max date constraints
   */
  isMonthSelectable(month, year) {
    // Check for min date constraint
    if (this.options.minDate) {
      const minDate = new Date(this.options.minDate);
      const minYear = minDate.getFullYear();
      const minMonth = minDate.getMonth();
      if (year < minYear || year === minYear && month < minMonth) {
        return false;
      }
    }

    // Check for max date constraint
    if (this.options.maxDate) {
      const maxDate = new Date(this.options.maxDate);
      const maxYear = maxDate.getFullYear();
      const maxMonth = maxDate.getMonth();
      if (year > maxYear || year === maxYear && month > maxMonth) {
        return false;
      }
    }
    return true;
  }

  // Render the datepicker UI
  render() {
    // Check if the container already exists
    let container = this.element.querySelector('.custom-datepickertabs-container');
    if (!container) {
      // First time rendering - create the full container
      container = document.createElement('div');
      container.className = 'custom-datepickertabs-container';

      // Add header
      container.innerHTML = `
        <div class="datepicker-header">
          <h3 class="datepicker-title">Select ${this.options.mode === 'day' ? 'Date' : 'Month'}</h3>
        </div>
      `;

      // Add tabs only if displayType is tabs
      if (this.options.displayType === 'tabs') {
        container.innerHTML += `
          <div class="datepicker-tabs-ui">
            <button class="datepicker-tab ${this.options.mode === 'day' ? 'active' : ''}" data-mode="day">Specific Date</button>
            <button class="datepicker-tab ${this.options.mode === 'month' ? 'active' : ''}" data-mode="month">Whole Month</button>
          </div>
        `;
      }

      // Create content based on mode
      const content = document.createElement('div');
      content.className = 'datepicker-content';
      if (this.options.mode === 'day') {
        content.innerHTML = this.renderDayMode();
      } else {
        content.innerHTML = this.renderMonthMode();
      }
      container.appendChild(content);

      // Add footer with buttons
      container.innerHTML += `
        <div class="datepicker-footer">
          <button class="datepicker-btn clear">Clear</button>
          <button class="datepicker-btn apply">Apply</button>
        </div>
      `;
      this.element.appendChild(container);
    } else {
      // Update only what's needed
      const title = container.querySelector('.datepicker-title');
      if (title) {
        title.textContent = `Select ${this.options.mode === 'day' ? 'Date' : 'Month'}`;
      }

      // Update tabs only if they are present
      const tabsUI = container.querySelector('.datepicker-tabs-ui');
      if (tabsUI) {
        const dayTab = tabsUI.querySelector('[data-mode="day"]');
        const monthTab = tabsUI.querySelector('[data-mode="month"]');
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
      const content = container.querySelector('.datepicker-content');
      if (content) {
        content.innerHTML = this.options.mode === 'day' ? this.renderDayMode() : this.renderMonthMode();
      }
    }
  }

  // Render day selection mode
  renderDayMode() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Get days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the day of the week of the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Calculate days from previous month to display
    const prevMonthDays = firstDayOfMonth;

    // Create year selector
    const yearsHtml = this.renderYearSelector(year);

    // Create month navigation
    const navHtml = `
      <div class="datepicker-nav">
        <button class="datepicker-nav-btn prev-month">&lt;</button>
        <span>${this.options.monthNames[month]} ${year}</span>
        <button class="datepicker-nav-btn next-month">&gt;</button>
      </div>
    `;

    // Create day names header
    let daysHeaderHtml = '<div class="datepicker-days-container">';
    for (let i = 0; i < 7; i++) {
      daysHeaderHtml += `<div class="day-name">${this.options.dayNames[i]}</div>`;
    }

    // Create days grid
    let daysHtml = '';

    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    for (let i = 0; i < prevMonthDays; i++) {
      const day = daysInPrevMonth - prevMonthDays + i + 1;
      daysHtml += `<div class="day-item other-month disabled">${day}</div>`;
    }

    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today for comparison

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
      const isSaturday = date.getDay() === 6;
      const isSelected = this.isDateSelected(date);

      // Set hours to 0 for date comparison
      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);
      const isFuture = compareDate > today;

      // Check if day should be disabled
      let isDisabled = false;

      // If futureSaturdaysOnly is enabled, disable all non-Saturday days
      // and all Saturdays that are in the past
      if (this.options.futureSaturdaysOnly) {
        isDisabled = !(isSaturday && isFuture);
      }

      // Apply min date restriction
      if (this.options.minDate) {
        const minDate = new Date(this.options.minDate);
        minDate.setHours(0, 0, 0, 0);
        if (compareDate < minDate) isDisabled = true;
      }

      // Apply max date restriction
      if (this.options.maxDate) {
        const maxDate = new Date(this.options.maxDate);
        maxDate.setHours(0, 0, 0, 0);
        if (compareDate > maxDate) isDisabled = true;
      }
      const classes = ['day-item', isToday ? 'today' : '', isSelected ? 'selected' : '', isDisabled ? 'disabled' : '', isSaturday ? 'saturday' : ''].filter(Boolean).join(' ');

      // Add a data attribute to indicate if the day is clickable
      const clickableAttr = isDisabled ? '' : 'data-clickable="true"';
      daysHtml += `<div class="${classes}" ${clickableAttr} data-date="${year}-${month + 1}-${i}">${i}</div>`;
    }

    // Next month days
    const daysFromNextMonth = 42 - (prevMonthDays + daysInMonth);
    for (let i = 1; i <= daysFromNextMonth; i++) {
      daysHtml += `<div class="day-item other-month disabled">${i}</div>`;
    }
    daysHtml += '</div>';

    // Combine all parts
    let html = yearsHtml + navHtml + daysHeaderHtml + daysHtml;

    // If multiple day selection is enabled, add the selection info
    if (this.options.multipleDays && this.selectedDates.length > 0) {
      html += this.renderSelectedDates();
    }
    return html;
  }

  // Render month selection mode
  renderMonthMode() {
    //console.log('renderMonthMode')
    const year = this.currentDate.getFullYear();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Create year selector
    const yearsHtml = this.renderYearSelector(year);

    // Create months grid
    let monthsHtml = '<div class="datepicker-month-container">';
    for (let i = 0; i < 12; i++) {
      const isSelected = this.isMonthSelected(i, year);
      // Check if month is selectable based on min/max date
      const isSelectable = this.isMonthSelectable(i, year);
      // Check if this is the current month
      const isThisMonth = i === currentMonth && year === currentYear;
      const classes = ['month-item', isSelected ? 'selected' : '', isThisMonth ? 'this-month' : '', !isSelectable ? 'disabled' : ''].filter(Boolean).join(' ');
      const monthAttrs = isSelectable ? `data-month="${i}" data-year="${year}"` : '';
      monthsHtml += `<div class="${classes}" ${monthAttrs}>${this.options.monthNames[i]}</div>`;
    }
    monthsHtml += '</div>';

    // Combine all parts
    let html = yearsHtml + monthsHtml;

    // If multiple month selection is enabled, add the selection info
    if (this.options.multipleMonths && this.selectedMonths.length > 0) {
      html += this.renderSelectedMonths();
    }
    return html;
  }

  // Render year selector
  renderYearSelector(currentYear) {
    // Get range of years based on min/max date constraints
    const {
      startYear,
      endYear
    } = this.getYearsRange(currentYear);
    let html = '<div class="datepicker-years">';
    html += '<select class="year-selector">';
    for (let year = startYear; year <= endYear; year++) {
      html += `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`;
    }
    html += '</select>';
    html += '</div>';
    return html;
  }

  // Render selected dates info (for multiple selection)
  renderSelectedDates() {
    let html = '<div class="multi-select-info">Selected Dates:</div>';
    html += '<div class="selected-list">';
    this.selectedDates.forEach((date, index) => {
      const formatted = this.formatDate(date, this.options.dateFormat);
      html += `
        <div class="selected-item" data-index="${index}">
          ${formatted}
          <button class="remove-btn" data-index="${index}">×</button>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  // Render selected months info (for multiple selection)
  renderSelectedMonths() {
    let html = '<div class="multi-select-info">Selected Months:</div>';
    html += '<div class="selected-list">';
    this.selectedMonths.forEach((item, index) => {
      // Validate the month object
      if (!item || typeof item.month !== 'number' || typeof item.year !== 'number' || item.month < 0 || item.month > 11 || isNaN(item.year)) {
        return; // Skip invalid months
      }

      // Create a date object and validate it
      const dateObj = new Date(item.year, item.month, 1);
      if (isNaN(dateObj.getTime())) {
        return; // Skip invalid dates
      }
      const formatted = this.formatDate(dateObj, this.options.monthFormat);

      // Only add to HTML if we got a valid formatted string
      if (formatted) {
        html += `
        <div class="selected-item" data-index="${index}">
          ${formatted}
          <button class="remove-btn" data-index="${index}">×</button>
        </div>
      `;
      }
    });
    html += '</div>';
    return html;
  }

  // Check if a date is selected
  isDateSelected(date) {
    return this.selectedDates.some(selectedDate => selectedDate.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear());
  }

  // Check if a month is selected
  isMonthSelected(month, year) {
    return this.selectedMonths.some(item => item.month === month && item.year === year);
  }

  // Check if maximum month selections reached
  isMaxMonthSelectionsReached() {
    return this.options.maxMonthSelection !== null && this.selectedMonths.length >= this.options.maxMonthSelection;
  }

  // Attach event listeners
  attachEvents() {
    // Tab switching (only if displayType is 'tabs')
    if (this.options.displayType === 'tabs') {
      const tabs = this.element.querySelectorAll('.datepicker-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', e => {
          e.stopPropagation(); // Prevent event bubbling
          const mode = tab.getAttribute('data-mode');
          this.options.mode = mode;
          this.setModeCookie(mode); // Save mode to cookie
          this.render();
          this.attachEvents();

          // Trigger a custom event to notify of mode change
          const event = new CustomEvent('datepickerModeChange', {
            detail: {
              mode: mode
            }
          });
          this.element.dispatchEvent(event);
        });
      });
    }

    // Year selector
    const yearSelector = this.element.querySelector('.year-selector');
    if (yearSelector) {
      yearSelector.addEventListener('change', e => {
        this.currentDate.setFullYear(parseInt(e.target.value, 10));
        this.render();
        this.attachEvents();
      });
    }

    // Month navigation
    const prevMonthBtn = this.element.querySelector('.prev-month');
    const nextMonthBtn = this.element.querySelector('.next-month');
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', e => {
        e.stopPropagation(); // Prevent event bubbling to keep the picker open

        // Check if going to the previous month is allowed based on min date
        if (this.options.minDate) {
          const minDate = new Date(this.options.minDate);
          const currentMonth = this.currentDate.getMonth();
          const currentYear = this.currentDate.getFullYear();

          // If we're already at the min date month and year, don't go back further
          if (currentMonth === 0 && currentYear === minDate.getFullYear() || currentMonth === minDate.getMonth() && currentYear === minDate.getFullYear()) {
            return;
          }
        }
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
        this.attachEvents();
      });
    }
    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', e => {
        e.stopPropagation(); // Prevent event bubbling to keep the picker open

        // Check if going to the next month is allowed based on max date
        if (this.options.maxDate) {
          const maxDate = new Date(this.options.maxDate);
          const currentMonth = this.currentDate.getMonth();
          const currentYear = this.currentDate.getFullYear();

          // If we're already at the max date month and year, don't go forward further
          if (currentMonth === 11 && currentYear === maxDate.getFullYear() || currentMonth === maxDate.getMonth() && currentYear === maxDate.getFullYear()) {
            return;
          }
        }
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
        this.attachEvents();
      });
    }

    // Day selection
    if (this.options.mode === 'day') {
      // Only select clickable days (those with data-clickable attribute)
      const dayItems = this.element.querySelectorAll('.day-item[data-clickable="true"]');
      dayItems.forEach(day => {
        day.addEventListener('click', e => {
          e.stopPropagation(); // Prevent event bubbling
          const dateStr = day.getAttribute('data-date');
          if (dateStr) {
            const [year, month, date] = dateStr.split('-').map(Number);
            const selectedDate = new Date(year, month - 1, date);
            if (this.options.multipleDays) {
              // If multiple day selection is enabled
              const index = this.selectedDates.findIndex(d => d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear());
              if (index === -1) {
                // Add to selection
                this.selectedDates.push(selectedDate);
              } else {
                // Remove from selection
                this.selectedDates.splice(index, 1);
              }

              // Update the UI to reflect the new selection
              // Remove 'selected' class from all days with data-clickable
              dayItems.forEach(di => di.classList.remove('selected'));

              // Add 'selected' class to selected days
              this.selectedDates.forEach(selected => {
                const dayStr = `${selected.getFullYear()}-${selected.getMonth() + 1}-${selected.getDate()}`;
                const selectedEl = this.element.querySelector(`.day-item[data-date="${dayStr}"]`);
                if (selectedEl) {
                  selectedEl.classList.add('selected');
                }
              });
              this.render();
              this.attachEvents();
            } else {
              // Single selection
              this.selectedDates = [selectedDate];

              // Update the UI to reflect the new selection
              // Remove 'selected' class from all days with data-clickable
              dayItems.forEach(di => di.classList.remove('selected'));
              // Add 'selected' class to the clicked day
              day.classList.add('selected');

              // Create an event to notify that a date has been selected and applied
              const event = new CustomEvent('datepickerApply', {
                detail: {
                  mode: 'day',
                  selectedDates: this.selectedDates,
                  selectedMonths: []
                }
              });
              this.element.dispatchEvent(event);

              // Update input value if available
              this.updateInputValue();

              // Hide the picker
              this.hide();

              // Call callback if provided
              if (this.options.onDateChange) {
                this.options.onDateChange(this.selectedDates[0]);
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
      const monthItems = this.element.querySelectorAll('.month-item:not(.disabled)');
      monthItems.forEach(item => {
        item.addEventListener('click', e => {
          e.stopPropagation(); // Prevent event bubbling
          const month = parseInt(item.getAttribute('data-month'), 10);
          const year = parseInt(item.getAttribute('data-year'), 10);
          if (this.options.multipleMonths) {
            // If multiple month selection is enabled
            const index = this.selectedMonths.findIndex(m => m.month === month && m.year === year);
            if (index === -1) {
              // Check if adding the month would exceed the maximum allowed
              if (this.options.maxMonthSelection && this.selectedMonths.length >= this.options.maxMonthSelection) {
                // If max reached, remove the oldest selection before adding new one
                this.selectedMonths.shift();
              }

              // Add to selection
              this.selectedMonths.push({
                month,
                year
              });

              // Also update selected dates array with all month selections
              this.selectedDates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
            } else {
              // Remove from selection
              this.selectedMonths.splice(index, 1);

              // Update selected dates array to match
              this.selectedDates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
            }

            // Re-render to show updated selections
            this.render();
            this.attachEvents();

            // Update input value
            this.updateInputValue();

            // Call callback with all selected dates
            if (this.options.onDateChange) {
              this.options.onDateChange(this.selectedDates);
            }
          } else {
            // Single selection
            this.selectedMonths = [{
              month,
              year
            }];

            // Also update selected dates to first day of month
            this.selectedDates = [new Date(year, month, 1)];

            // Update currentDate to match the selected month
            this.currentDate = new Date(year, month, 1);

            // Re-render to show updated selections
            this.render();
            this.attachEvents();

            // If single month selection, apply immediately and close
            // Create an event to notify that a month has been selected and applied
            const event = new CustomEvent('datepickerApply', {
              detail: {
                mode: 'month',
                selectedDates: this.selectedDates,
                selectedMonths: this.selectedMonths
              }
            });
            this.element.dispatchEvent(event);

            // Update input value if available
            this.updateInputValue();

            // Hide the picker
            this.hide();

            // Call callback if provided
            if (this.options.onDateChange) {
              this.options.onDateChange(this.selectedDates[0]);
            }
          }
        });
      });
    }

    // Remove buttons for multi-select
    const removeButtons = this.element.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); // Prevent bubbling to parent
        const index = parseInt(btn.getAttribute('data-index'), 10);
        if (this.options.mode === 'day') {
          this.selectedDates.splice(index, 1);
        } else {
          this.selectedMonths.splice(index, 1);
        }
        this.render();
        this.attachEvents();

        // Call callback if provided
        if (this.options.onDateChange) {
          if (this.options.mode === 'day') {
            this.options.onDateChange(this.options.multiple ? this.selectedDates : this.selectedDates[0]);
          } else {
            const dates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
            this.options.onDateChange(this.options.multiple ? dates : dates[0]);
          }
        }
      });
    });

    // Clear button
    const clearBtn = this.element.querySelector('.datepicker-btn.clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', e => {
        e.stopPropagation(); // Prevent event bubbling to keep the picker open
        this.selectedDates = [];
        this.selectedMonths = [];
        this.render();
        this.attachEvents();

        // Update input value if available
        if (this.inputElement) {
          this.inputElement.value = '';
        }

        // Create a custom event for clearing
        const event = new CustomEvent('datepickerClear');
        this.element.dispatchEvent(event);

        // Call callback if provided
        if (this.options.onDateChange) {
          this.options.onDateChange(null);
        }
      });
    }

    // Apply button
    // Apply button handler for the DatepickerTabs class
    // This should replace the current Apply button handler in attachEvents method

    // Apply button
    const applyBtn = this.element.querySelector('.datepicker-btn.apply');
    if (applyBtn) {
      applyBtn.addEventListener('click', e => {
        e.stopPropagation(); // Prevent event bubbling

        // Create an event to notify that dates have been applied
        const event = new CustomEvent('datepickerApply', {
          detail: {
            mode: this.options.mode,
            selectedDates: this.selectedDates,
            selectedMonths: this.selectedMonths
          }
        });
        this.element.dispatchEvent(event);

        // Update input value if available
        this.updateInputValue();

        // Hide the picker
        this.hide();

        // Call callback if provided
        if (this.options.onDateChange) {
          if (this.options.mode === 'day') {
            // In day mode, only call if we have selections
            if (this.selectedDates.length > 0) {
              this.options.onDateChange(this.options.multipleDays ? this.selectedDates : this.selectedDates[0]);
            } else {
              this.options.onDateChange(null);
            }
          } else {
            // In month mode, convert month selections to dates (1st of each month)
            if (this.selectedMonths.length > 0) {
              const dates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
              this.options.onDateChange(this.options.multipleMonths ? dates : dates[0]);
            } else {
              this.options.onDateChange(null);
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
  setMode(mode) {
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
  getMode() {
    return this.options.mode;
  }

  /**
   * Set display type
   * @param {string} type - 'tabs', 'day', or 'month'
   */
  setDisplayType(type) {
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
  setDate(date) {
    if (Array.isArray(date)) {
      this.selectedDates = date.map(d => new Date(d));

      // Also update month selection if in month mode
      this.selectedMonths = date.map(d => ({
        month: new Date(d).getMonth(),
        year: new Date(d).getFullYear()
      }));
    } else if (date) {
      this.selectedDates = [new Date(date)];

      // Also update month selection if in month mode
      const d = new Date(date);
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
  setMaxMonthSelection(limit) {
    this.options.maxMonthSelection = limit;

    // If current selections exceed the new limit, trim the excess
    if (limit !== null && this.selectedMonths.length > limit) {
      // Keep only the most recent selections up to the limit
      this.selectedMonths = this.selectedMonths.slice(-limit);

      // Also update the selectedDates to match
      this.selectedDates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
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
  getDate() {
    if (this.options.mode === 'day') {
      return this.selectedDates.length === 0 ? null : this.options.multipleDays ? this.selectedDates : this.selectedDates[0];
    } else {
      // Convert month selections to dates (1st of each month)
      const dates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
      return dates.length === 0 ? null : this.options.multipleMonths ? dates : dates[0];
    }
  }

  /**
   * Enable/disable multiple days selection
   * @param {boolean} enable - Whether to enable multiple day selection
   */
  setMultipleDays(enable) {
    this.options.multipleDays = !!enable;
    this.render();
    this.attachEvents();
    return this;
  }

  /**
   * Enable/disable multiple months selection
   * @param {boolean} enable - Whether to enable multiple month selection
   */
  setMultipleMonths(enable) {
    this.options.multipleMonths = !!enable;
    this.render();
    this.attachEvents();
    return this;
  }

  /**
   * Enable/disable multiple selection (both days and months)
   * @param {boolean} enable - Whether to enable multiple selection
   */
  setMultiple(enable) {
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
  setDateFormat(format) {
    this.options.dateFormat = format;
    this.updateInputValue();
    return this;
  }

  /**
   * Set month format
   * @param {string} format - Format string
   */
  setMonthFormat(format) {
    this.options.monthFormat = format;
    this.updateInputValue();
    return this;
  }

  /**
   * Set min date
   * @param {Date|null} date - Minimum selectable date
   */
  setMinDate(date) {
    this.options.minDate = date ? new Date(date) : null;
    this.render();
    this.attachEvents();
    return this;
  }

  /**
   * Set max date
   * @param {Date|null} date - Maximum selectable date
   */
  setMaxDate(date) {
    this.options.maxDate = date ? new Date(date) : null;
    this.render();
    this.attachEvents();
    return this;
  }

  /**
   * Destroy the datepicker instance and clean up
   */
  destroy() {
    // Remove event listeners from input
    if (this.inputElement) {
      const newInputElement = this.inputElement.cloneNode(true);
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
  getDatesAsString(dates) {
    const currentMode = this.getMode();
    if (Array.isArray(dates)) {
      return dates.map(d => {
        const month = d.toLocaleString('default', {
          month: 'short'
        });
        const year = d.getFullYear();
        const day = d.getDay();
        if ('day' == currentMode) {
          return `${day} ${month} ${year}`;
        } else {
          return `${month} ${year}`;
        }
      }).join(', ');
    } else {
      const month = dates.toLocaleString('default', {
        month: 'short'
      });
      const year = dates.getFullYear();
      const day = dates.getDate();
      if ('day' == currentMode) {
        return `${day} ${month} ${year}`;
      } else {
        return `${month} ${year}`;
      }
    }
  }
}

// Create global reference
window.DatepickerTabs = DatepickerTabs;