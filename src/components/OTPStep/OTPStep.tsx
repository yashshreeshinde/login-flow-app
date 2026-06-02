import React, { useState, useRef } from 'react';
import { OTP_CONFIG, FORM_MESSAGES } from '../../constants/constants';
import { validateOTP } from '../../utils/validators';
import { cleanOTPInput } from '../../utils/formatters';
import { FormNav } from '../FormNav/FormNav';
import styles from './OTPStep.module.css';

interface OTPStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const OTPStep: React.FC<OTPStepProps> = ({ onNext, onBack }) => {
  const [otp, setOtp] = useState(Array(OTP_CONFIG.LENGTH).fill(''));
  const [error, setError] = useState('');
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    const cleaned = cleanOTPInput(v);
    const newOtp = [...otp];
    newOtp[i] = cleaned;
    setOtp(newOtp);
    setError('');

    if (cleaned && i < OTP_CONFIG.LENGTH - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_CONFIG.LENGTH);
    const newOtp = Array(OTP_CONFIG.LENGTH).fill('');
    pastedData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    refs.current[Math.min(pastedData.length, OTP_CONFIG.LENGTH - 1)]?.focus();
  };

  const handleContinue = () => {
    const validation = validateOTP(otp, OTP_CONFIG.LENGTH);
    if (!validation.valid) {
      setError(validation.error || FORM_MESSAGES.OTP_INCOMPLETE);
      return;
    }
    onNext();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{FORM_MESSAGES.OTP_NOT_RECEIVED}</h2>
      <p className={styles.subtitle}>An OTP has been sent to your mobile number</p>

      <div className={styles.otpInputs}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            autoFocus={i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={styles.otpInput}
          />
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.resendContainer}>
        {FORM_MESSAGES.OTP_NOT_RECEIVED}{' '}
        <button
          type="button"
          onClick={() => setOtp(Array(OTP_CONFIG.LENGTH).fill(''))}
          className={styles.resendButton}
        >
          {FORM_MESSAGES.RESEND_OTP}
        </button>
      </div>

      <FormNav onBack={onBack} onContinue={handleContinue} showBack />
    </div>
  );
};
