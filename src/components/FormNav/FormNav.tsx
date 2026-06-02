import React from 'react';
import { FORM_LABELS } from '../../constants/constants';
import styles from './FormNav.module.css';

interface Props {
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  showBack?: boolean;
}

export const FormNav: React.FC<Props> = ({
  onBack,
  onContinue,
  continueLabel = FORM_LABELS.CONTINUE,
  showBack = true,
}) => (
  <div className={styles.container}>
    {showBack && onBack ? (
      <button
        type="button"
        onClick={onBack}
        className={styles.buttonBack}
      >
        {FORM_LABELS.BACK}
      </button>
    ) : (
      <div className={styles.spacer} />
    )}
    <button type="button" onClick={onContinue} className={styles.buttonPrimary}>
      {continueLabel}
    </button>
  </div>
);
