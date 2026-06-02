import React, { useState } from 'react';
import { EyeIcon } from '../Icons/EyeIcon';
import { EyeOffIcon } from '../Icons/EyeOffIcon';
import { COLORS } from '../../constants/constants';
import styles from './PasswordInput.module.css';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
}

export const PasswordInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
}) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div
        className={styles.inputWrapper}
        data-error={!!error}
        data-focused={focused}
      >
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.input}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow(!show)}
          className={styles.toggleButton}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeIcon color={COLORS.PRIMARY_LIGHT} /> : <EyeOffIcon color={COLORS.PRIMARY_LIGHT} />}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
};
