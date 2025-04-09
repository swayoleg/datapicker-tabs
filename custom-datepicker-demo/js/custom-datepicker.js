/**
 * CustomDatePicker
 * 
 * A versatile date picker with day and month selection modes,
 * multiple selection support, and various formatting options.
 * 
 * @version 1.0.0
 * 
 * FEATURES:
 * - Day and Month selection modes
 * - Single or multiple selection
 * - Format customization
 * - Min/Max date constraints
 * - Saturday-only selection for fishing venues
 * - Cookie-based mode persistence
 * - Tooltip overlay positioning
 * - Mobile-friendly design
 * 
 * USAGE:
 * 
 * 1. Basic initialization:
 * ```javascript
 * const picker = new CustomDatePicker('#date-container', {
 *   inputElement: '#date-input'
 * });
 * ```
 * 
 * 2. With options:
 * ```javascript
 * const picker = new CustomDatePicker('#date-container', {
 *   inputElement: '#date-input',
 *   mode: 'month',
 *   multiple: true,
 *   dateFormat: 'DD/MM/YYYY',
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
 * // Enable/disable multiple selection
 * picker.setMultiple(true);
 * ```
 */
class CustomDatePicker {
  constructor(element, options = {}) {
    // Define default options
    const defaults = {
      mode: 'day', // 'day' or 'month'
      multiple: false, // Allow multiple date/month selection
      startDate: new Date(),
      minDate: null,
      maxDate: null,
      futureSaturdaysOnly: false, // Option for day mode to only enable Saturdays in the future
      onDateChange: null, // Callback when date(s) change
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      cookieName: 'customDatePickerMode', // Store mode in cookie
      dateFormat: 'DD MMM YYYY', // Default format for display
      monthFormat: 'MMM YYYY', // Default format for month display
      inputElement: null, // Optional input element to update with selected date
      position: 'bottom', // 'bottom' or 'top' - default position relative to input
      zIndex: 9999 // z-index for the picker container
    };

    // Merge default options with provided options
    this.options = { ...defaults, ...options };
    
    // Element where the datepicker will be rendered
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    
    // Get the input element if provided
    if (this.options.inputElement) {
      this.inputElement = typeof this.options.inputElement === 'string' 
        ? document.querySelector(this.options.inputElement) 
        : this.options.inputElement;
    }
    
    // Initialize properties
    this.currentDate = new Date(this.options.startDate || new Date());
    this.selectedDates = this.options.startDate ? [new Date(this.options.startDate)] : [];
    this.selectedMonths = [];
    this.isVisible = false;
    
    // If month mode and a start date is provided, extract the month and year
    if (this.options.mode === 'month' && this.options.startDate) {
      const startDate = new Date(this.options.startDate);
      this.selectedMonths.push({
        month: startDate.getMonth(),
        year: startDate.getFullYear()
      });
    }
    
    // Try to restore mode from cookie
    this.restoreModeFromCookie();
    
    // Initialize the datepicker
    this.init();
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
  formatDate(date, format) {
    if (!date) return '';
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    // Replace format tokens with actual values
    return format
      .replace(/DD/g, day.toString().padStart(2, '0'))
      .replace(/D/g, day.toString())
      .replace(/MMMM/g, this.options.monthNames[month])
      .replace(/MMM/g, this.options.monthNames[month].substr(0, 3))
      .replace(/MM/g, (month + 1).toString().padStart(2, '0'))
      .replace(/M/g, (month + 1).toString())
      .replace(/YYYY/g, year.toString())
      .replace(/YY/g, year.toString().substr(2, 2));
  }
  
  /**
   * Position the datepicker relative to the input element
   * Adjusts to stay in viewport
   */
  positionPicker() {
    if (!this.inputElement) return;
    
    const container = this.element.querySelector('.custom-datepicker-container');
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
      left = (inputRect.right - containerWidth) + scrollLeft;
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
    document.addEventListener('click', (e) => {
      if (this.isVisible && 
          !this.element.contains(e.target) && 
          (!this.inputElement || !this.inputElement.contains(e.target))) {
        this.hide();
      }
    });
  }
  
  /**
   * Setup input element events
   */
  setupInputElement() {
    // Update input with initial date if available
    this.updateInputValue();
    
    // Add click handler to show the picker
    this.inputElement.addEventListener('click', (e) => {
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
      } else if (this.options.multiple) {
        const formattedDates = this.selectedDates.map(d => 
          this.formatDate(d, this.options.dateFormat)
        );
        this.inputElement.value = formattedDates.join(', ');
      } else {
        this.inputElement.value = this.formatDate(
          this.selectedDates[0], 
          this.options.dateFormat
        );
      }
    } else {
      if (this.selectedMonths.length === 0) {
        this.inputElement.value = '';
      } else if (this.options.multiple) {
        const formattedMonths = this.selectedMonths.map(m => 
          this.formatDate(new Date(m.year, m.month, 1), this.options.monthFormat)
        );
        this.inputElement.value = formattedMonths.join(', ');
      } else {
        const m = this.selectedMonths[0];
        this.inputElement.value = this.formatDate(
          new Date(m.year, m.month, 1), 
          this.options.monthFormat
        );
      }
    }
  }
  
  /**
   * Show the datepicker
   */
  show() {
    if (this.isVisible) return;
    
    // Show the container
    const container = this.element.querySelector('.custom-datepicker-container');
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
    if (!this.isVisible && !this.element.querySelector('.custom-datepicker-container')) return;
    
    // Hide the container
    const container = this.element.querySelector('.custom-datepicker-container');
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
  
  // Render the datepicker UI
  render() {
    // Check if the container already exists
    let container = this.element.querySelector('.custom-datepicker-container');
    
    if (!container) {
      // First time rendering - create the full container
      container = document.createElement('div');
      container.className = 'custom-datepicker-container';
      
      // Add header
      container.innerHTML = `
        <div class="datepicker-header">
          <h3 class="datepicker-title">Select ${this.options.mode === 'day' ? 'Date' : 'Month'}</h3>
        </div>
        
        <div class="datepicker-tabs">
          <button class="datepicker-tab ${this.options.mode === 'day' ? 'active' : ''}" data-mode="day">Specific Date</button>
          <button class="datepicker-tab ${this.options.mode === 'month' ? 'active' : ''}" data-mode="month">Whole Month</button>
        </div>
      `;
      
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
      
      // Update tabs
      const dayTab = container.querySelector('[data-mode="day"]');
      const monthTab = container.querySelector('[data-mode="month"]');
      
      if (dayTab && monthTab) {
        if (this.options.mode === 'day') {
          dayTab.classList.add('active');
          monthTab.classList.remove('active');
        } else {
          dayTab.classList.remove('active');
          monthTab.classList.add('active');
        }
      }
      
      // Update content
      const content = container.querySelector('.datepicker-content');
      if (content) {
        content.innerHTML = this.options.mode === 'day' 
          ? this.renderDayMode() 
          : this.renderMonthMode();
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
      const isToday = 
        today.getDate() === i && 
        today.getMonth() === month && 
        today.getFullYear() === year;
      
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
      
      const classes = [
        'day-item',
        isToday ? 'today' : '',
        isSelected ? 'selected' : '',
        isDisabled ? 'disabled' : '',
        isSaturday ? 'saturday' : ''
      ].filter(Boolean).join(' ');
      
      // Add a data attribute to indicate if the day is clickable
      const clickableAttr = isDisabled ? '' : 'data-clickable="true"';
      
      daysHtml += `<div class="${classes}" ${clickableAttr} data-date="${year}-${month+1}-${i}">${i}</div>`;
    }
    
    // Next month days
    const daysFromNextMonth = 42 - (prevMonthDays + daysInMonth);
    for (let i = 1; i <= daysFromNextMonth; i++) {
      daysHtml += `<div class="day-item other-month disabled">${i}</div>`;
    }
    
    daysHtml += '</div>';
    
    // Combine all parts
    let html = yearsHtml + navHtml + daysHeaderHtml + daysHtml;
    
    // If multiple selection is enabled, add the selection info
    if (this.options.multiple && this.selectedDates.length > 0) {
      html += this.renderSelectedDates();
    }
    
    return html;
  }
  
  // Render month selection mode
  renderMonthMode() {
    const year = this.currentDate.getFullYear();
    
    // Create year selector
    const yearsHtml = this.renderYearSelector(year);
    
    // Create months grid
    let monthsHtml = '<div class="datepicker-month-container">';
    
    for (let i = 0; i < 12; i++) {
      const isSelected = this.isMonthSelected(i, year);
      
      const classes = [
        'month-item',
        isSelected ? 'selected' : ''
      ].filter(Boolean).join(' ');
      
      monthsHtml += `<div class="${classes}" data-month="${i}" data-year="${year}">${this.options.monthNames[i]}</div>`;
    }
    
    monthsHtml += '</div>';
    
    // Combine all parts
    let html = yearsHtml + monthsHtml;
    
    // If multiple selection is enabled, add the selection info
    if (this.options.multiple && this.selectedMonths.length > 0) {
      html += this.renderSelectedMonths();
    }
    
    return html;
  }
  
  // Render year selector
  renderYearSelector(currentYear) {
    // Create a range of years (current year +/- 5 years)
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    
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
      const formatted = this.formatDate(date);
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
      const formatted = `${this.options.monthNames[item.month]} ${item.year}`;
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
  
  // Format date as string
  formatDate(date) {
    const day = date.getDate();
    const month = this.options.monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  // Check if a date is selected
  isDateSelected(date) {
    return this.selectedDates.some(selectedDate => 
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  }
  
  // Check if a month is selected
  isMonthSelected(month, year) {
    return this.selectedMonths.some(item => 
      item.month === month && item.year === year
    );
  }
  
  // Attach event listeners
  attachEvents() {
    // Tab switching
    const tabs = this.element.querySelectorAll('.datepicker-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const mode = tab.getAttribute('data-mode');
        this.options.mode = mode;
        this.setModeCookie(mode); // Save mode to cookie
        this.render();
        this.attachEvents();
        
        // Trigger a custom event to notify of mode change
        const event = new CustomEvent('datepickerModeChange', { 
          detail: { mode: mode }
        });
        this.element.dispatchEvent(event);
      });
    });
    
    // Year selector
    const yearSelector = this.element.querySelector('.year-selector');
    if (yearSelector) {
      yearSelector.addEventListener('change', (e) => {
        this.currentDate.setFullYear(parseInt(e.target.value, 10));
        this.render();
        this.attachEvents();
      });
    }
    
    // Month navigation
    const prevMonthBtn = this.element.querySelector('.prev-month');
    const nextMonthBtn = this.element.querySelector('.next-month');
    
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to keep the picker open
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
        this.attachEvents();
      });
    }
    
    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to keep the picker open
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
        day.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent event bubbling
          const dateStr = day.getAttribute('data-date');
          if (dateStr) {
            const [year, month, date] = dateStr.split('-').map(Number);
            const selectedDate = new Date(year, month - 1, date);
            
            // In day mode, we always use single selection
            this.selectedDates = [selectedDate];
              
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
        });
      });
    }
    
    // Month selection
    if (this.options.mode === 'month') {
      const monthItems = this.element.querySelectorAll('.month-item');
      monthItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent event bubbling
          const month = parseInt(item.getAttribute('data-month'), 10);
          const year = parseInt(item.getAttribute('data-year'), 10);
          
          if (this.options.multiple) {
            // If multiple selection is enabled
            const index = this.selectedMonths.findIndex(m => 
              m.month === month && m.year === year
            );
            
            if (index === -1) {
              // Add to selection
              this.selectedMonths.push({ month, year });
            } else {
              // Remove from selection
              this.selectedMonths.splice(index, 1);
            }
          } else {
            // Single selection
            this.selectedMonths = [{ month, year }];
            
            // Also update selected dates to first day of month
            this.selectedDates = [new Date(year, month, 1)];
          }
          
          this.render();
          this.attachEvents();
          
          // In month mode, we don't trigger the onDateChange callback
          // until the Apply button is clicked - we just highlight the selection
        });
      });
    }
    
    // Remove buttons for multi-select
    const removeButtons = this.element.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
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
      clearBtn.addEventListener('click', (e) => {
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
    const applyBtn = this.element.querySelector('.datepicker-btn.apply');
    if (applyBtn) {
      applyBtn.addEventListener('click', (e) => {
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
              this.options.onDateChange(this.options.multiple ? this.selectedDates : this.selectedDates[0]);
            } else {
              this.options.onDateChange(null);
            }
          } else {
            // In month mode, convert month selections to dates (1st of each month)
            if (this.selectedMonths.length > 0) {
              const dates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
              this.options.onDateChange(this.options.multiple ? dates : dates[0]);
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
      this.setModeCookie(mode);
      this.render();
      this.attachEvents();
      this.updateInputValue();
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
   * Get selected date(s)
   * @returns {Date|Date[]|null} - Selected date(s)
   */
  getDate() {
    if (this.options.mode === 'day') {
      return this.selectedDates.length === 0 ? null : 
             (this.options.multiple ? this.selectedDates : this.selectedDates[0]);
    } else {
      // Convert month selections to dates (1st of each month)
      const dates = this.selectedMonths.map(m => new Date(m.year, m.month, 1));
      return dates.length === 0 ? null : 
             (this.options.multiple ? dates : dates[0]);
    }
  }
  
  /**
   * Enable/disable multiple selection
   * @param {boolean} enable - Whether to enable multiple selection
   */
  setMultiple(enable) {
    this.options.multiple = !!enable;
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
}

// Create global reference
window.CustomDatePicker = CustomDatePicker;