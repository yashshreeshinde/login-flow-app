# Architecture Documentation

## Overview

Login Flow App is a modern, production-ready multi-step account creation form built with React, TypeScript, and CSS Modules. The application demonstrates professional-grade practices for form handling, validation, and state management.

**Tech Stack:**
- React 18+
- TypeScript
- Vite (build tool)
- CSS Modules (component-scoped styling)
- CSS Custom Properties (design tokens)

---

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── AccountTypeStep/        # Step 1: Account type selection (Personal/Business)
│   ├── FormNav/                # Navigation buttons (Back/Continue)
│   ├── Icons/                  # Custom SVG icons
│   ├── Input/                  # Reusable text input component
│   ├── LoginLayout/            # Main layout with progress bar
│   ├── NameStep/               # Step 4: First and last name inputs
│   ├── OTPStep/                # Step 3: 4-digit OTP verification
│   ├── PasswordInput/          # Password input with visibility toggle
│   ├── PasswordStep/           # Step 5: Password and confirmation
│   ├── PhoneStep/              # Step 2: Phone number with country code
│   └── SuccessModal/           # Final step: Success confirmation
├── constants/            # Application constants
│   └── constants.ts            # Colors, labels, validation rules
├── utils/               # Utility functions
│   ├── formatters.ts           # Input formatting logic
│   └── validators.ts           # Form validation logic
├── styles/              # Global styles
│   └── theme.css               # CSS variables for theming
├── assets/              # Static assets
│   └── illustration.png         # Onboarding illustration
├── App.tsx              # Main application component
└── main.tsx             # React entry point
```

---

## Component Architecture

### Component Pattern

Each component follows a consistent folder structure:

```
ComponentName/
├── ComponentName.tsx          # React component with TypeScript interface
├── ComponentName.module.css   # Scoped CSS styles
└── (optional) index.ts        # Export for cleaner imports
```

**Example: Input Component**

```typescript
// src/components/Input/Input.tsx
interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({ value, onChange, error, label, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
```

### Component Hierarchy

```
App
└── LoginLayout
    ├── Progress Bar
    └── FormNav + Current Step
        ├── AccountTypeStep
        ├── PhoneStep
        ├── OTPStep
        ├── NameStep
        ├── PasswordStep
        └── SuccessModal
```

---

## Form Flow

```
Step 1: Account Type
   ↓
Step 2: Phone Number
   ↓
Step 3: OTP Verification
   ↓
Step 4: Name (First & Last)
   ↓
Step 5: Password Setup
   ↓
Success Modal
```

### Form Data Structure

```typescript
interface FormData {
  accountType: 'personal' | 'business';
  phone: string;
  otp: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}
```

---

## State Management

The app uses **React Hooks** for state management with a parent-child prop-passing pattern:

- **useState**: Local component state for inputs and form steps
- **useEffect**: Side effects (if needed for future features)
- **Props Drilling**: Pass data from App → LoginLayout → FormNav and individual steps

**Why not Redux/Zustand?**
- Minimal state complexity
- Single form with sequential steps
- No cross-cutting state needs
- Simpler for code review and maintenance

---

## Validation & Formatting

### Validation Functions (`src/utils/validators.ts`)

```typescript
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validatePhone = (phone: string): ValidationResult => {
  if (phone.length !== 10) {
    return { isValid: false, error: 'Phone must be 10 digits' };
  }
  return { isValid: true };
};

export const validateOTP = (otp: string): ValidationResult => {
  if (otp.length !== 4) {
    return { isValid: false, error: 'OTP must be 4 digits' };
  }
  return { isValid: true };
};

export const validatePassword = (password: string, confirm: string): ValidationResult => {
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }
  if (password !== confirm) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  return { isValid: true };
};
```

### Formatting Functions (`src/utils/formatters.ts`)

```typescript
export const cleanPhone = (phone: string): string => {
  return phone.replace(/\D/g, '').slice(0, 10);
};

export const capitalizeName = (name: string): string => {
  return name.trim().replace(/\b\w/g, char => char.toUpperCase());
};
```

**Design Decision:** Validation and formatting are decoupled from components, making them:
- Testable without rendering React
- Reusable across components
- Easy to maintain in one place

---

## Styling Approach

### CSS Modules

Each component has scoped CSS to prevent class name collisions:

```css
/* Input.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input {
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.inputError {
  border-color: var(--color-error);
}

.error {
  color: var(--color-error);
  font-size: 12px;
}
```

### Design Tokens (`src/styles/theme.css`)

```css
:root {
  /* Colors */
  --color-primary: #0054fd;
  --color-error: #ef4444;
  --color-success: #10b981;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
  --color-bg: #ffffff;

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;

  /* Borders */
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

**Benefits:**
- Centralized design system
- Easy theme switching (dark mode ready)
- Consistent spacing and colors
- One place to update brand colors

---

## Icon System

Custom SVG icons as React components (no external icon library):

```typescript
// src/components/Icons/PersonalIcon.tsx
interface Props {
  color?: string;
  size?: number;
}

export const PersonalIcon: React.FC<Props> = ({ 
  color = '#0054fd', 
  size = 24 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color} />
    <path d="M12 14c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" fill={color} />
  </svg>
);
```

**Advantages:**
- No external dependencies
- Lightweight (inline SVGs)
- Full control over appearance
- Prop-based customization (color, size)

---

## Design Decisions & Rationale

### 1. CSS Modules over Inline Styles
**Decision:** Use `.module.css` files instead of styled-components or inline styles.

**Why:**
- Scoped styles prevent class name collisions
- Better performance (no runtime CSS-in-JS)
- Familiar to most React developers
- Works well with TypeScript

**Trade-off:** Slightly more verbose than styled-components, but more maintainable.

---

### 2. Custom SVG Icons over Icon Library
**Decision:** Create custom SVG icons instead of FontAwesome or Material Icons.

**Why:**
- Reduces bundle size
- No external dependencies
- Full control over rendering and animation
- Simple prop-based customization

**Trade-off:** Limited to icons we create ourselves (not a problem for small design systems).

---

### 3. CSS Variables for Theming
**Decision:** Use CSS Custom Properties (`--color-*`, `--spacing-*`, etc.).

**Why:**
- Centralized design tokens
- Easy to implement dark mode in future
- Runtime theme switching capability
- Better than hardcoded values

**Trade-off:** Requires CSS support (IE 11 doesn't support, but we target modern browsers).

---

### 4. Validator Functions Returning Objects
**Decision:** Validation functions return `{ isValid, error }` objects instead of throwing errors.

**Why:**
- Easier to handle multiple validation errors in future
- Components can display errors directly
- Consistent error handling pattern
- No try/catch needed in components

---

### 5. Parent Component State Management
**Decision:** Keep form state in the main `App` component.

**Why:**
- Simple form flow (sequential steps)
- Each step needs previous data
- Easier to debug (single source of truth)
- No need for Redux/Context complexity

**Trade-off:** Props drilling for deeply nested components (not a problem with this form structure).

---

### 6. Progress Bar as Absolute Overlay
**Decision:** Position progress bar absolutely on top of the form card.

**Why:**
- Visual indicator always visible
- Doesn't affect form card layout
- Clean UX with clear progress indication
- Matches design specifications

---

### 7. Type-Safe Props with TypeScript Interfaces
**Decision:** Define `Props` interface for every component.

**Why:**
- Compile-time type checking
- Better IDE autocomplete
- Documents component contract
- Prevents prop-related bugs

---

## Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| Account Type | Personal or Business | None (selection only) |
| Phone | Exactly 10 digits | "Phone must be 10 digits" |
| OTP | Exactly 4 digits | "OTP must be 4 digits" |
| First Name | Non-empty, trimmed | "First name is required" |
| Last Name | Non-empty, trimmed | "Last name is required" |
| Password | Min 6 chars, matches confirm | "Password must be at least 6 characters" |
| Password Confirm | Must match password | "Passwords do not match" |

---

## Input Formatting

| Field | Formatting |
|-------|-----------|
| Phone | Remove non-digits, limit to 10 chars |
| OTP | Single digit per field, auto-advance |
| Name | Capitalize first letter of each word, trim whitespace |
| Password | No formatting (allow any characters) |

---

## Key Features

### ✅ Multi-Step Form
- 5-step account creation process
- Progress bar showing current progress
- Back/Continue navigation
- Form data persistence across steps

### ✅ Validation
- Field-level validation with inline error messages
- Prevents progression with invalid data
- Clear, user-friendly error messages

### ✅ Input Formatting
- Phone input: Auto-removes non-digits
- OTP input: Single digit per field with auto-focus
- Name input: Auto-capitalize and trim

### ✅ Success Confirmation
- Modal overlay with account summary
- Displays all entered information
- Bank-grade security badge
- Reset button to start new account creation

### ✅ Responsive Design
- Full-width layout with side padding
- Flexible spacing using CSS variables
- Adapts to different screen sizes

### ✅ Type Safety
- Full TypeScript throughout
- No `any` types
- Compile-time error checking

### ✅ Code Quality
- No unused imports or variables
- Consistent code style (enforced by ESLint)
- Self-documenting code
- Minimal comments (code is clear enough)

---

## Performance Optimizations

1. **CSS Modules:** Scoped styles reduce CSS bundle size
2. **SVG Icons:** Lightweight, no external icon font loading
3. **React.FC with TypeScript:** Type checking at build time, no runtime overhead
4. **Minimal Dependencies:** Only React and React-DOM (plus dev tools)
5. **Vite Build:** Fast, optimized production builds
6. **CSS Custom Properties:** Single paint operation for theme changes

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

## Deployment

### GitHub Pages (Current)
- Automatic deployment via GitHub Actions
- Triggers on push to `main` branch
- Subdirectory deployment: `/login-flow-app/`
- Build: `npm run build` → uploads `dist/` folder

### Build Process
```bash
npm install          # Install dependencies
npm run build        # TypeScript + Vite optimization
npm run preview      # Test production build locally
```

### Environment Configuration
- Base path: `/login-flow-app/` (GitHub Pages subdirectory)
- Asset handling: Images imported as modules for proper path resolution

---

## Testing Strategy

### Current State
- No unit tests (focus on clean, readable code)
- Manual testing via browser (reactive form behavior)

### Future Improvements
- Unit tests for validators and formatters
- Component snapshot tests
- E2E tests for form flow
- Accessibility testing (WCAG 2.1 AA)

---

## Security Considerations

1. **No External APIs:** Form data stays in browser (demo only)
2. **Input Sanitization:** HTML special characters handled by React
3. **No Sensitive Data:** Passwords not stored, logged, or transmitted
4. **HTTPS:** GitHub Pages enforces HTTPS for deployed app
5. **CSP Ready:** Can add Content Security Policy headers if needed

---

## Future Enhancements

- [ ] Real backend integration for OTP verification
- [ ] Email verification step
- [ ] Password strength meter
- [ ] Two-factor authentication
- [ ] Dark mode toggle using CSS custom properties
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Internationalization (i18n) support
- [ ] Unit tests for validators
- [ ] E2E tests for form flow
- [ ] Loading states and error boundaries
- [ ] Session persistence using localStorage

---

## Development Workflow

### Getting Started
```bash
# Clone repository
git clone https://github.com/YashshreeShinde/login-flow-app.git
cd login-flow-app

# Install dependencies
npm install

# Start development server
npm run dev

# The app opens at http://localhost:5173
```

### Making Changes
1. Edit component files (`.tsx`) or styles (`.module.css`)
2. Dev server hot-reloads automatically
3. Check console for TypeScript errors
4. Test form flow manually

### Committing Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add password strength meter"

# Push to main (triggers GitHub Actions deployment)
git push origin main
```

### Code Quality
```bash
# Type checking
npm run build          # Runs TypeScript compiler

# Linting
npm run lint           # Runs ESLint with strict rules
```

---

## File Size Analysis

| Package | Size | Purpose |
|---------|------|---------|
| react | ~42KB | UI library |
| react-dom | ~40KB | DOM rendering |
| TypeScript | ~2.5MB | Dev dependency only |
| Vite | ~3MB | Dev dependency only |
| **Production Build** | ~150KB (gzipped) | Final app size |

---

## Common Patterns in This Codebase

### Error Handling Pattern
```typescript
const validation = validatePhone(phone);
if (!validation.isValid) {
  setPhoneError(validation.error);
  return;
}
// Proceed
```

### Input Handler Pattern
```typescript
const handleChange = (value: string) => {
  const formatted = cleanPhone(value);
  setPhone(formatted);
  if (phoneError) setPhoneError('');
};
```

### Step Navigation Pattern
```typescript
const handleContinue = () => {
  const validation = validateCurrentStep();
  if (!validation.isValid) {
    setError(validation.error);
    return;
  }
  setCurrentStep(currentStep + 1);
};
```

---

## Debugging Tips

### Issue: Form not responding to input
- Check console for TypeScript errors
- Verify `onChange` handler is properly connected
- Check CSS for `pointer-events: none`

### Issue: Styles not applying
- Verify CSS class names match in `.module.css`
- Check CSS specificity (CSS Modules handle this)
- Use browser DevTools to inspect computed styles

### Issue: Validation not working
- Check validator function logic in `validators.ts`
- Verify form state is updating correctly
- Test validator directly in browser console

### Issue: Assets not loading
- Verify asset path (use module imports)
- Check `vite.config.ts` base path
- For GitHub Pages, ensure assets are in `src/` folder

---

## Related Documentation

- [README.md](../README.md) - Project overview and setup
- [package.json](../package.json) - Dependencies and scripts
- [src/constants/constants.ts](../src/constants/constants.ts) - Application constants
- [src/utils/validators.ts](../src/utils/validators.ts) - Validation logic
- [src/utils/formatters.ts](../src/utils/formatters.ts) - Formatting logic

---

**Last Updated:** May 2026
**Status:** Production Ready
**Maintainer:** Yashshree Shinde
