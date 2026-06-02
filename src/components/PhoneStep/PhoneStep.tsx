import React, { useState } from "react";
import {
  PHONE_CONFIG,
  FORM_LABELS,
} from "../../constants/constants";
import { validatePhone } from "../../utils/validators";
import { cleanPhoneInput } from "../../utils/formatters";
import { FormNav } from "../FormNav/FormNav";
import styles from "./PhoneStep.module.css";

interface PhoneStepProps {
  onNext: (p: string) => void;
  onBack: () => void;
}

export const PhoneStep: React.FC<PhoneStepProps> = ({ onNext, onBack }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleContinue = () => {
    const validation = validatePhone(phone);
    if (!validation.valid) {
      setError(validation.error || "");
      return;
    }
    onNext(phone);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Enter your mobile number</h2>

      <label className={styles.label}>
        {FORM_LABELS.MOBILE_NUMBER}
        <span className={styles.required}>*</span>
      </label>
      <div
        className={styles.inputWrapper}
        data-error={!!error}
        data-focused={focused}
      >
        <div className={styles.prefix}>
          <span className={styles.flag}>{PHONE_CONFIG.COUNTRY_FLAG}</span>
          <span className={styles.code}>{PHONE_CONFIG.COUNTRY_CODE}</span>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 9.75L12 15L16.5 9.75"
              stroke="#8292A1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <input
          type="tel"
          placeholder={PHONE_CONFIG.PLACEHOLDER}
          autoFocus
          value={phone}
          onChange={(e) => {
            setPhone(cleanPhoneInput(e.target.value));
            setError("");
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.input}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <FormNav onBack={onBack} onContinue={handleContinue} showBack />
    </div>
  );
};
