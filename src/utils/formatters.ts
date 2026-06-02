export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatFullName = (firstName: string, lastName: string, fallback: string = ''): string => {
  const name = `${firstName} ${lastName}`.trim();
  return name || fallback;
};

export const cleanPhoneInput = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 10);
};

export const cleanOTPInput = (value: string): string => {
  return value.replace(/\D/g, '').slice(-1);
};
