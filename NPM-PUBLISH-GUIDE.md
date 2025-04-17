# Publishing DatepickerTabs to NPM

This guide will walk you through the process of packaging and publishing DatepickerTabs to the NPM registry.

## Prerequisites

1. Node.js and npm installed on your system
2. An npm account (create one at https://www.npmjs.com/signup)
3. Git repository for your project

## Step 1: Prepare Your Package

1. Make sure you have the following files in your project root:
    - `package.json`
    - `.npmignore`
    - `README.md`
    - `LICENSE`
    - `index.js` (Entry point)
    - `index.d.ts` (TypeScript declarations)

2. Ensure your `package.json` has the correct:
    - name (must be unique on npm)
    - version
    - description
    - main (entry point)
    - files (array of files/directories to include)
    - repository information
    - author and license details

## Step 2: Install Dependencies and Update Package.json

Run the following commands to install the required development dependencies:

```bash
# Install Gulp and related packages
npm install --save-dev gulp gulp-sass sass gulp-postcss autoprefixer cssnano gulp-sourcemaps gulp-rename gulp-uglify gulp-babel @babel/core @babel/preset-env gulp-header

# Add prepare script to ensure build runs before publish
npm pkg set scripts.prepare="npm run build"
```

## Step 3: Test Your Package Locally

Before publishing, it's a good idea to test your package locally:

1. Build your package:
   ```bash
   npm run build
   ```

2. Create a test directory outside your project:
   ```bash
   mkdir ~/datepicker-test
   cd ~/datepicker-test
   npm init -y
   ```

3. Install your package locally using the path to your project:
   ```bash
   npm install /path/to/your/datepicker-tabs
   ```

4. Create a test HTML file and JavaScript file to verify it works.

## Step 4: Publish to NPM

1. Login to your npm account:
   ```bash
   npm login
   ```

2. Perform a dry run to see what files will be included:
   ```bash
   npm publish --dry-run
   ```

3. If everything looks good, publish your package:
   ```bash
   npm publish
   ```

4. If your package name includes a scope (e.g., `@username/datepicker-tabs`), use:
   ```bash
   npm publish --access public
   ```

## Step 5: Updating Your Package

When you make changes and want to publish a new version:

1. Update the version in `package.json` using npm version:
   ```bash
   npm version patch  # for bug fixes (0.0.x)
   npm version minor  # for new features (0.x.0)
   npm version major  # for breaking changes (x.0.0)
   ```

2. Build your package:
   ```bash
   npm run build
   ```

3. Publish the new version:
   ```bash
   npm publish
   ```

## Common Issues and Troubleshooting

### "You don't have permission to publish"
- Check if the package name is already taken. Try a different name or scope it under your username.

### Files not included in the published package
- Double-check your `files` array in `package.json`
- Verify the `.npmignore` file isn't excluding important files

### "npm ERR! 403 Forbidden"
- Make sure you're logged in: `npm login`
- Check if the package name conflicts with an existing package

### Versioning conflicts
- If you get an error about the version being already published, increment your version number

## Post-Publication

After publishing:

1. Create a GitHub release to match your npm version
2. Update your project's documentation to include npm installation instructions
3. Share your published package with the community!

Remember, quality documentation and examples will help users understand and adopt your package.