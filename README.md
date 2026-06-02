# Login Flow App

A modern, production-ready multi-step account creation form with email verification, built with React, TypeScript, and CSS Modules.

## Live Demo

🚀 **[Live App on GitHub Pages](https://yashshreeshinde.github.io/login-flow-app/)**

## GitHub Repository

📦 **[GitHub Repository](https://github.com/YashshreeShinde/login-flow-app)**

Automatically deployed on every push to `main` branch via GitHub Actions.

## Project Overview

This is a clean, well-structured React application demonstrating a professional login/registration flow with form validation, multi-step progression, and success confirmation. The app is fully typed with TypeScript and uses modern React patterns.

## Architecture

### Folder Structure

```
src/
├── components/          # Reusable React components
│   ├── AccountTypeStep/       # Account type selection (Personal/Business)
│   ├── FormNav/              # Navigation buttons (Back/Continue)
│   ├── Icons/                # Custom SVG icons
│   ├── Input/                # Reusable text input component
│   ├── LoginLayout/          # Main layout with progress bar
│   ├── NameStep/             # First and last name inputs
│   ├── OTPStep/              # 4-digit OTP verification
│   ├── PasswordInput/        # Password input with visibility toggle
│   ├── PasswordStep/         # Password and confirmation inputs
│   ├── PhoneStep/            # Phone number with country code
│   └── SuccessModal/         # Success confirmation modal
├── constants/           # Application constants
│   └── constants.ts          # Colors, labels, config values
├── utils/              # Utility functions
│   ├── formatters.ts         # Input formatting (capitalize, clean phone, etc.)
│   └── validators.ts         # Form validation logic
├── styles/             # Global styles
│   └── theme.css             # CSS variables for theming
├── App.tsx             # Main application component
└── main.tsx            # React entry point
```

### Component Architecture

Each component follows a consistent pattern:
- **Component file** (`ComponentName.tsx`) - React component with TypeScript interface
- **Styles file** (`ComponentName.module.css`) - Scoped CSS using CSS Modules
- **Self-contained** - All dependencies are relative to the component folder

### State Management

The app uses React's built-in hooks for state management:
- `useState` for local component state
- Props passing for parent-child communication
- No external state management library needed for this use case

### Form Flow

```
AccountType → Phone → OTP → Name → Password → Success Modal
```

Each step validates input before allowing progression. Form data is accumulated in the main `App` component and passed to child steps.

## Design Decisions

### 1. **CSS Modules over Inline Styles**
- **Why**: Scoped styling prevents class name collisions and makes styles maintainable
- **Benefit**: Each component has isolated styles; changes don't affect other components

### 2. **Custom SVG Icons over FontAwesome**
- **Why**: Reduces bundle size, avoids external dependency, gives full control over icon rendering
- **Benefit**: Icons are React components with prop-based customization (color, size)

### 3. **CSS Variables for Theming**
- **Why**: Centralized design tokens for colors, spacing, fonts, and borders
- **Benefit**: Easy to maintain consistent design; simple theme switching if needed

### 4. **Validator Functions with Error Objects**
- **Why**: Decouples validation logic from components; reusable and testable
- **Benefit**: Single source of truth for validation rules; easy to update error messages

### 5. **Progress Bar as Absolute Overlay**
- **Why**: Visual indicator stays on top of the form card, not inside it
- **Benefit**: Clean UX; progress is always visible regardless of card content

### 6. **Type-Safe Props with TypeScript Interfaces**
- **Why**: Catches errors at compile time; documents component contracts
- **Benefit**: Better IDE support, easier refactoring, fewer runtime errors

## Key Features

### Multi-Step Form
- 5-step account creation process
- Progress bar showing current progress
- Back/Continue navigation
- Form data persistence across steps

### Validation
- Phone: 10-digit format validation
- OTP: 4-digit complete entry
- Name: Both first and last name required
- Password: Minimum 6 characters, matching confirmation

### Input Formatting
- Phone input: Automatically removes non-digits, limits to 10 characters
- OTP input: Single digit per field, paste support
- Name input: Trims whitespace

### Success Confirmation
- Modal overlay with account summary
- Displays: account type, email, name, phone
- Bank-grade security badge
- Reset button to start new account creation

### Responsive Design
- Full-width layout with side padding
- Flexible spacing using CSS variables
- Adapts to different screen sizes

## Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Component-scoped styling
- **CSS Custom Properties** - Design tokens and theming

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Form Flow & Validation

### Step 1: Account Type
- Select between Personal or Business account
- No validation, just selection

### Step 2: Phone Number
- Enter 10-digit phone number (US format)
- Validation: Must be exactly 10 digits
- Error handling with inline feedback

### Step 3: OTP Verification
- Enter 4-digit OTP
- Auto-focus to next field on digit entry
- Support for pasting full OTP
- Resend OTP functionality

### Step 4: Name
- Enter first and last name
- Validation: Both fields required
- Field-level error messages

### Step 5: Password
- Enter and confirm password
- Validation: Minimum 6 characters, passwords must match
- Password visibility toggle with eye icon

### Success
- Modal shows account summary
- Confirmation of all entered information
- Option to close and start new account

## Component Details

### LoginLayout
- **Role**: Main layout container
- **Props**: `children`, `currentStep`, `totalSteps`
- **Features**: Progress bar positioned absolutely on top, full-width with side padding

### FormNav
- **Role**: Reusable navigation component
- **Props**: `onBack`, `onContinue`, `showBack`, `continueLabel`
- **Features**: Conditional back button, customizable labels

### Input & PasswordInput
- **Role**: Reusable form inputs
- **Props**: Standard HTML input attributes plus `error`, `hint`, `label`
- **Features**: Error states, helper text, focus styling

### Icons (PersonalIcon, BusinessIcon, EyeIcon, EyeOffIcon)
- **Role**: SVG icon components
- **Props**: `color`, `size`
- **Features**: Customizable via props, no external icon library

## Styling Approach

### CSS Custom Properties
```css
--color-primary: #0054fd
--color-error: #ef4444
--spacing-lg: 16px
--font-weight-bold: 700
--border-radius-lg: 16px
```

### CSS Modules
Each component has its own `.module.css` file with scoped class names:
```css
.container { /* Scoped to component */ }
.input { /* Scoped to component */ }
.error { /* Scoped to component */ }
```

### Theme System
All colors and dimensions are defined in `src/styles/theme.css` for easy maintenance and consistent theming.

## Performance Optimizations

1. **CSS Modules** - No unused CSS, scoped styles only
2. **SVG Icons** - Lightweight, no external icon font
3. **React.FC with TypeScript** - Type checking at build time
4. **Minimal Dependencies** - Only essential packages
5. **Production Build** - Optimized by Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add unit tests for validators and formatters
- Implement real OTP verification backend
- Add password strength meter
- Email verification step
- Two-factor authentication
- Dark mode toggle using CSS custom properties
- Accessibility improvements (ARIA labels, keyboard navigation)
- Internationalization (i18n) support

## Code Quality

- ✅ No unused imports or variables
- ✅ Type-safe TypeScript throughout
- ✅ Consistent code style
- ✅ Component-based and reusable
- ✅ Clear separation of concerns
- ✅ Descriptive variable and function names
- ✅ No comments needed (self-documenting code)

## License

MIT

---

**Built with ❤️ using React + TypeScript**
