export const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone) {
    return { valid: false, error: 'Mobile number is required' };
  }
  if (!/^\d{10}$/.test(phone)) {
    return { valid: false, error: 'Enter a valid 10-digit number' };
  }
  return { valid: true };
};

export const validateOTP = (otp: string[], length: number): { valid: boolean; error?: string } => {
  const otpString = otp.join('');
  if (otpString.length < length) {
    return { valid: false, error: 'Enter the complete OTP' };
  }
  return { valid: true };
};

export const validateName = (firstName: string, lastName: string): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!firstName.trim()) errors.first = 'Required';
  if (!lastName.trim()) errors.last = 'Required';
  return errors;
};

export const validatePassword = (password: string, confirm: string, minLength: number = 6): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!password) errors.pw = 'Required';
  else if (password.length < minLength) errors.pw = `Must be atleast ${minLength} characters`;
  if (!confirm) errors.cf = 'Required';
  else if (password !== confirm) errors.cf = 'Both passwords must match';
  return errors;
};
