declare class DatepickerTabs {
    /**
     * Creates a new DatepickerTabs instance
     * @param selector CSS selector string or HTMLElement
     * @param options Configuration options
     */
    constructor(
        selector: string | HTMLElement,
        options?: DatepickerTabsOptions
    );

    /**
     * Selected dates in the datepicker
     */
    selectedDates: Date[];

    /**
     * Selected months in the datepicker as { month: number, year: number }
     */
    selectedMonths: { month: number; year: number }[];

    /**
     * Sets the selected date(s)
     * @param date Date or array of dates to select
     */
    setDate(date: Date | Date[] | null): DatepickerTabs;

    /**
     * Gets the currently selected date(s)
     * @returns Selected date(s) or null if none selected
     */
    getDate(): Date | Date[] | null;

    /**
     * Sets the picker mode
     * @param mode 'day' or 'month'
     */
    setMode(mode: 'day' | 'month'): DatepickerTabs;

    /**
     * Gets the current mode
     * @returns Current mode ('day' or 'month')
     */
    getMode(): 'day' | 'month';

    /**
     * Sets the display type
     * @param type 'tabs', 'day', or 'month'
     */
    setDisplayType(type: 'tabs' | 'day' | 'month'): DatepickerTabs;

    /**
     * Enable/disable multiple days selection
     * @param enable Whether to enable multiple day selection
     */
    setMultipleDays(enable: boolean): DatepickerTabs;

    /**
     * Enable/disable multiple months selection
     * @param enable Whether to enable multiple month selection
     */
    setMultipleMonths(enable: boolean): DatepickerTabs;

    /**
     * Enable/disable multiple selection (both days and months)
     * @param enable Whether to enable multiple selection
     */
    setMultiple(enable: boolean): DatepickerTabs;

    /**
     * Set date format
     * @param format Format string
     */
    setDateFormat(format: string): DatepickerTabs;

    /**
     * Set month format
     * @param format Format string
     */
    setMonthFormat(format: string): DatepickerTabs;

    /**
     * Set min date
     * @param date Minimum selectable date
     */
    setMinDate(date: Date | null): DatepickerTabs;

    /**
     * Set max date
     * @param date Maximum selectable date
     */
    setMaxDate(date: Date | null): DatepickerTabs;

    /**
     * Set max month selection limit
     * @param limit Max number of months that can be selected
     */
    setMaxMonthSelection(limit: number): DatepickerTabs;

    /**
     * Shows the date picker
     */
    show(): DatepickerTabs;

    /**
     * Hides the date picker
     */
    hide(): DatepickerTabs;

    /**
     * Destroy the datepicker instance and clean up
     */
    destroy(): void;

    /**
     * Returns dates as formatted string (used in demos)
     * @param dates Date or array of dates
     */
    getDatesAsString(dates: Date | Date[]): string;
}

interface DatepickerTabsOptions {
    /**
     * Mode of operation: 'day' or 'month'
     * @default 'day'
     */
    mode?: 'day' | 'month';

    /**
     * Display type: 'tabs', 'day', or 'month'
     * @default 'tabs'
     */
    displayType?: 'tabs' | 'day' | 'month';

    /**
     * Allow multiple day selection
     * @default false
     */
    multipleDays?: boolean;

    /**
     * Allow multiple month selection
     * @default false
     */
    multipleMonths?: boolean;

    /**
     * Maximum number of months that can be selected (when multipleMonths is true)
     * @default null
     */
    maxMonthSelection?: number | null;

    /**
     * Initial selected date
     * @default null
     */
    startDate?: Date | null;

    /**
     * Minimum selectable date
     * @default null
     */
    minDate?: Date | null;

    /**
     * Maximum selectable date
     * @default null
     */
    maxDate?: Date | null;

    /**
     * Option for day mode to only enable Saturdays in the future
     * @default false
     */
    futureSaturdaysOnly?: boolean;

    /**
     * Array of days of week to disable (0-6, where 0 is Sunday)
     * @default []
     */
    disabledDaysOfWeek?: number[];

    /**
     * Array of specific dates to disable (Date objects or date strings in various formats)
     * @default []
     */
    disabledDates?: (Date | string)[];

    /**
     * Option to start the week on Monday instead of Sunday
     * @default false
     */
    startWeekOnMonday?: boolean;

    /**
     * Callback when date(s) change
     * @default null
     */
    onDateChange?: ((date: Date | Date[] | null) => void) | null;

    /**
     * Array of month names
     * @default ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
     */
    monthNames?: string[];

    /**
     * Array of day names
     * @default ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
     */
    dayNames?: string[];

    /**
     * Store mode in cookie
     * @default 'datepickerTabsMode'
     */
    cookieName?: string;

    /**
     * Format for displaying dates
     * @default 'DD MMM YYYY'
     */
    dateFormat?: string;

    /**
     * Format for displaying months
     * @default 'MMM YYYY'
     */
    monthFormat?: string;

    /**
     * Position of the picker: 'bottom' or 'top'
     * @default 'bottom'
     */
    position?: 'bottom' | 'top';

    /**
     * z-index for the picker container
     * @default 9999
     */
    zIndex?: number;

    /**
     * Custom container ID to render calendar (if not provided, one will be generated)
     * @default ''
     */
    containerId?: string;

    /**
     * How many year offset render backwards in years selectbox
     * @default 5
     */
    backwardsYearsOffset?: number;

    /**
     * How many year offset render forwards in years selectbox
     * @default 5
     */
    forwardsYearsOffset?: number;
}

declare global {
    interface Window {
        DatepickerTabs: typeof DatepickerTabs;
    }
}

export default DatepickerTabs;