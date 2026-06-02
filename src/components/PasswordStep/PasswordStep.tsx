import React, { useState } from 'react';
import { FORM_LABELS, PASSWORD_CONFIG } from '../../constants/constants';
import { validatePassword } from '../../utils/validators';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { FormNav } from '../FormNav/FormNav';
import styles from './PasswordStep.module.css';

interface PasswordStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({
  onNext,
  onBack,
}) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const validationErrors = validatePassword(
      password,
      confirm,
      PASSWORD_CONFIG.MIN_LENGTH,
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onNext();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Password for your account</h2>
      <div className={styles.inputGroup}>
        <PasswordInput
          label={FORM_LABELS.PASSWORD}
          value={password}
          placeholder="Enter new password"
          onChange={(v) => {
            setPassword(v);
            setErrors((p) => ({ ...p, pw: '' }));
          }}
          error={errors.pw}
          hint={`Must be atleast ${PASSWORD_CONFIG.MIN_LENGTH} characters`}
        />
        <PasswordInput
          label={FORM_LABELS.CONFIRM_PASSWORD}
          value={confirm}
          placeholder="Confirm password"
          onChange={(v) => {
            setConfirm(v);
            setErrors((p) => ({ ...p, cf: '' }));
          }}
          error={errors.cf}
          hint="Both passwords must match"
        />
      </div>
      <FormNav onBack={onBack} onContinue={handleContinue} showBack />
    </div>
  );
};
