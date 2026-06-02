export const COLORS = {
  PRIMARY: '#0054fd',
  PRIMARY_LIGHT: '#729cf0',
  ERROR: '#ef4444',
  TEXT_PRIMARY: '#132c4a',
  TEXT_SECONDARY: '#8292a1',
  BORDER: '#d9e0e6',
  BORDER_LIGHT: '#eef1f4',
  BORDER_LIGHTER: '#f3f4f6',
  BACKGROUND: '#f6f7f9',
  BACKGROUND_CARD: '#fff',
};

export const FORM_STEPS = {
  TOTAL: 5,
  ACCOUNT_TYPE: 1,
  PHONE: 2,
  OTP: 3,
  NAME: 4,
  PASSWORD: 5,
};

export const ACCOUNT_TYPES = [
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
];

export const FORM_MESSAGES = {
  OTP_INCOMPLETE: 'Enter the complete OTP',
  OTP_NOT_RECEIVED: 'Did not receive OTP?',
  RESEND_OTP: 'Resend OTP',
  ACCOUNT_SET: "You're all set!",
  ACCOUNT_SUMMARY: "Here's a quick summary of your account details",
  SECURITY_MESSAGE: 'Your account is secured with bank-grade security',
  GO_TO_DASHBOARD: 'Go To Dashboard',
};

export const FORM_LABELS = {
  MOBILE_NUMBER: 'Mobile Number',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  PASSWORD: 'Enter new password',
  CONFIRM_PASSWORD: 'Confirm password',
  BACK: 'Back',
  CONTINUE: 'Continue',
};

export const PHONE_CONFIG = {
  COUNTRY_FLAG: '🇺🇸',
  COUNTRY_CODE: '+1',
  PLACEHOLDER: '8343989239',
};

export const OTP_CONFIG = {
  LENGTH: 4,
};

export const PASSWORD_CONFIG = {
  MIN_LENGTH: 6,
};

export const MODAL_CONFIG = {
  SUMMARY_LABEL_ACCOUNT_TYPE: 'Account Type',
  SUMMARY_LABEL_EMAIL: 'Email',
  SUMMARY_LABEL_NAME: 'Name',
  SUMMARY_LABEL_MOBILE: 'Mobile Number',
  SUMMARY_VALUE_EMAIL: 'jo····@example.com',
  SUMMARY_VALUE_NAME_DEFAULT: 'John Doe',
  SUMMARY_VALUE_PHONE_DEFAULT: '9711677290',
};

export const LAYOUT_LABELS = {
  STARTED: "Let's get started",
  CREATE_ACCOUNT: 'Create your account',
  FOLLOW_STEPS: 'Follow the steps to create your account',
};
