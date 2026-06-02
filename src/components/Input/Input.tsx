import React, { useState } from 'react';
import styles from './Input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<Props> = ({
  label,
  error,
  hint,
  required,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        {...rest}
        aria-invalid={!!error}
        className={styles.input}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        style={{
          borderColor: error ? 'var(--color-error)' : focused ? 'var(--color-primary-light)' : 'var(--color-border)',
        }}
      />
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
};
