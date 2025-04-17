# Contributing to DatepickerTabs

Thank you for considering contributing to DatepickerTabs! This document provides guidelines and instructions for contributing to this project.

## Development Setup

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```
   git clone https://github.com/YOUR-USERNAME/datepicker-tabs.git
   cd datepicker-tabs
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a branch for your changes:
   ```
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. Run the development server with automatic rebuilding:
   ```
   npm run dev
   ```

2. Make changes to the files in the `src` directory:
    - JavaScript: `src/assets/js/`
    - SCSS: `src/assets/scss/`

3. Test your changes using the `index.html` demo file in the project root.

4. Build the package before submitting your PR:
   ```
   npm run build
   ```

## Pull Requests

1. Ensure your code follows the existing code style.
2. Update documentation if necessary.
3. Add tests for any new functionality.
4. Make sure all tests pass.
5. Push your changes to your fork:
   ```
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request from your fork to the main repository.

## Coding Standards

- Use 2 spaces for indentation
- Follow the existing coding style used in the project
- Add comments for complex functionality
- Keep lines under 100 characters when possible

## Adding Features

When adding a new feature:

1. First check if there's an existing issue for the feature you want to add
2. If not, create an issue to discuss the feature before implementing it
3. Write clear documentation for your feature
4. Add examples of how to use your feature to the demo page

## SCSS Guidelines

- Use nesting but try not to nest deeper than 3 levels
- Follow the existing SCSS structure with component-scoped styles
- Maintain backward compatibility with existing styles when possible

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## License

By contributing to DatepickerTabs, you agree that your contributions will be licensed under the project's MIT license.