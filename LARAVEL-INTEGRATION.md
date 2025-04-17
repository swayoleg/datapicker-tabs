# Integrating DatepickerTabs with Laravel

This guide shows how to integrate DatepickerTabs with Laravel projects using different approaches.

## Method 1: Using Laravel Mix (Laravel 8 and earlier)

Laravel Mix provides an elegant API for defining webpack build steps for your Laravel application.

### Step 1: Install DatepickerTabs

```bash
npm install datepicker-tabs --save
```

### Step 2: Import in your JavaScript

In your `resources/js/app.js` file:

```javascript
// Import DatepickerTabs
import DatepickerTabs from 'datepicker-tabs';
window.DatepickerTabs = DatepickerTabs;

// Initialize where needed
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#booking-date')) {
        const datePicker = new DatepickerTabs('#booking-date', {
            mode: 'month',
            multipleMonths: true,
            maxMonthSelection: 3,
            onDateChange: function(dates) {
                console.log('Selected dates:', dates);
            }
        });
    }
});
```

### Step 3: Import the CSS

**Method A:** Import in your SCSS file (`resources/sass/app.scss`):

```scss
// Import DatepickerTabs styles
@import '~datepicker-tabs/dist/css/datepicker-tabs.min.css';
```

**Method B:** Or, configure Laravel Mix to copy the CSS files directly in your `webpack.mix.js`:

```javascript
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .copy('node_modules/datepicker-tabs/dist/css/datepicker-tabs.min.css', 'public/css');
```

### Step 4: Compile assets

```bash
npm run dev
# or 
npm run prod # for production
```

### Step 5: Include in your Blade template

```html
<link rel="stylesheet" href="{{ asset('css/datepicker-tabs.min.css') }}">
<script src="{{ asset('js/app.js') }}" defer></script>

<input type="text" id="booking-date" class="form-control" placeholder="Select dates">
```

## Method 2: Using Vite (Laravel 9+)

Starting with Laravel 9, Vite is the default build tool replacing Laravel Mix.

### Step 1: Install DatepickerTabs

```bash
npm install datepicker-tabs --save
```

### Step 2: Import in your JavaScript

In your main JS file (typically `resources/js/app.js`):

```javascript
import DatepickerTabs from 'datepicker-tabs';
import 'datepicker-tabs/dist/css/datepicker-tabs.min.css';

window.DatepickerTabs = DatepickerTabs;

// Initialize where needed
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#booking-date')) {
        const datePicker = new DatepickerTabs('#booking-date', {
            mode: 'month',
            multipleMonths: true,
            maxMonthSelection: 3
        });
    }
});
```

### Step 3: Configure Vite

Make sure your `vite.config.js` is properly set up:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
```

### Step 4: Build assets

```bash
npm run dev
# or
npm run build # for production
```

### Step 5: Include in your Blade template

```html
@vite(['resources/css/app.css', 'resources/js/app.js'])

<input type="text" id="booking-date" class="form-control" placeholder="Select dates">
```

## Method 3: Creating a Laravel Component

For a more integrated approach, you can create a Blade component to encapsulate DatepickerTabs.

### Step 1: Follow the installation steps from Method 1 or 2

### Step 2: Create a Blade Component

```bash
php artisan make:component DatePicker
```

### Step 3: Update the Component Class

Edit `app/View/Components/DatePicker.php`:

```php
<?php

namespace App\View\Components;

use Illuminate\View\Component;

class DatePicker extends Component
{
    public $id;
    public $name;
    public $placeholder;
    public $value;
    public $options;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $id = null,
        $name = null,
        $placeholder = 'Select dates',
        $value = null,
        $options = []
    ) {
        $this->id = $id ?? 'datepicker-' . uniqid();
        $this->name = $name ?? $this->id;
        $this->placeholder = $placeholder;
        $this->value = $value;
        $this->options = json_encode($options);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.date-picker');
    }
}
```

### Step 4: Create the Component View

Edit `resources/views/components/date-picker.blade.php`:

```blade
<div>
    <input
        type="text"
        id="{{ $id }}"
        name="{{ $name }}"
        class="form-control datepicker-input {{ $attributes->get('class') }}"
        placeholder="{{ $placeholder }}"
        value="{{ $value }}"
        {{ $attributes->whereDoesntStartWith('class') }}
        readonly
    >
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (!window.datePickerInstances) {
                window.datePickerInstances = {};
            }
            
            const options = @json($options);
            
            if (window.DatepickerTabs) {
                window.datePickerInstances['{{ $id }}'] = new DatepickerTabs('#{{ $id }}', options);
            } else {
                console.error('DatepickerTabs not loaded. Make sure to include the library.');
            }
        });
    </script>
</div>
```

### Step 5: Use the Component in Your Blade Templates

```blade
<x-date-picker
    id="booking-date"
    name="booking_date"
    placeholder="Select booking dates"
    :options="[
        'mode' => 'month',
        'multipleMonths' => true,
        'maxMonthSelection' => 3,
        'monthFormat' => 'MMM YYYY'
    ]"
/>
```

## Method 4: Creating a Laravel Package

For reusability across multiple Laravel projects, you could create a Laravel package for DatepickerTabs.

See the [Laravel Package Development Documentation](https://laravel.com/docs/9.x/packages) for details on how to create a custom package.

## Laravel AJAX Form Submission

Here's how to integrate DatepickerTabs with an AJAX form in Laravel:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DatepickerTabs
    const datePicker = new DatepickerTabs('#booking-date', {
        mode: 'month',
        multipleMonths: true,
        maxMonthSelection: 3,
        onDateChange: function(dates) {
            // Update a hidden field with serialized dates
            if (Array.isArray(dates)) {
                const formattedDates = dates.map(date => {
                    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
                }).join(',');
                document.getElementById('booking_dates_hidden').value = formattedDates;
            } else if (dates) {
                document.getElementById('booking_dates_hidden').value = dates.toISOString().split('T')[0];
            } else {
                document.getElementById('booking_dates_hidden').value = '';
            }
        }
    });
    
    // Handle form submission
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message
                alert('Booking successful!');
                form.reset();
            } else {
                // Show error message
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
```

Your Laravel controller can handle the dates like this:

```php
public function store(Request $request)
{
    $request->validate([
        'booking_dates' => 'required|string'
    ]);
    
    $dates = explode(',', $request->booking_dates);
    
    foreach ($dates as $date) {
        Booking::create([
            'user_id' => auth()->id(),
            'date' => $date,
            // other fields...
        ]);
    }
    
    return response()->json(['success' => true]);
}
```

## Troubleshooting

### DatepickerTabs is not defined

Make sure you've properly exposed DatepickerTabs to the window object:

```javascript
import DatepickerTabs from 'datepicker-tabs';
window.DatepickerTabs = DatepickerTabs;
```

### Styles not loading

If styles are not loading, make sure:
1. You've imported the CSS file in your SCSS
2. You've run `npm run dev` or `npm run build`
3. You've included the CSS in your blade template

### Laravel Mix/Vite not finding the module

If you get errors about the module not being found, try running:

```bash
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

### CSRF Token issues with AJAX

For AJAX requests, make sure you include the CSRF token:

```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

And in your AJAX request:

```javascript
headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
}
```