import React, { useState } from 'react';
import { FORM_LABELS } from '../../constants/constants';
import { validateName } from '../../utils/validators';
import { Input } from '../Input/Input';
import { FormNav } from '../FormNav/FormNav';
import styles from './NameStep.module.css';

interface NameStepProps {
  onNext: (f: string, l: string) => void;
  onBack: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({ onNext, onBack }) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const validationErrors = validateName(first, last);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onNext(first.trim(), last.trim());
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What is your name?</h2>
      <div className={styles.inputGroup}>
        <Input
          label={FORM_LABELS.FIRST_NAME}
          placeholder="First"
          autoFocus
          value={first}
          error={errors.first}
          onChange={(e) => {
            setFirst(e.target.value);
            setErrors((p) => ({ ...p, first: '' }));
          }}
        />
        <Input
          label={FORM_LABELS.LAST_NAME}
          placeholder="Last Name"
          value={last}
          error={errors.last}
          onChange={(e) => {
            setLast(e.target.value);
            setErrors((p) => ({ ...p, last: '' }));
          }}
        />
      </div>
      <FormNav onBack={onBack} onContinue={handleContinue} showBack />
    </div>
  );
};
