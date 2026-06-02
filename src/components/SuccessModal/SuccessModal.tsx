import React from 'react';
import { MODAL_CONFIG, FORM_MESSAGES, COLORS } from '../../constants/constants';
import { capitalize, formatFullName } from '../../utils/formatters';
import styles from './SuccessModal.module.css';

interface Props {
  isOpen: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<Props> = ({
  isOpen,
  firstName,
  lastName,
  phone,
  accountType,
  onClose,
}) => {
  if (!isOpen) return null;

  const rows = [
    { k: MODAL_CONFIG.SUMMARY_LABEL_ACCOUNT_TYPE, v: capitalize(accountType) },
    { k: MODAL_CONFIG.SUMMARY_LABEL_EMAIL, v: MODAL_CONFIG.SUMMARY_VALUE_EMAIL },
    {
      k: MODAL_CONFIG.SUMMARY_LABEL_NAME,
      v: formatFullName(
        firstName,
        lastName,
        MODAL_CONFIG.SUMMARY_VALUE_NAME_DEFAULT,
      ),
    },
    {
      k: MODAL_CONFIG.SUMMARY_LABEL_MOBILE,
      v: phone || MODAL_CONFIG.SUMMARY_VALUE_PHONE_DEFAULT,
    },
  ];

  return (
    <div className={styles.overlay}>
      <div
        className={styles.backdrop}
        onClick={onClose}
        role="presentation"
      />
      <div className={styles.modal}>
        <div className={styles.checkmarkContainer}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L19 7"
              stroke={COLORS.PRIMARY}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className={styles.title}>{FORM_MESSAGES.ACCOUNT_SET}</h2>
        <p className={styles.subtitle}>{FORM_MESSAGES.ACCOUNT_SUMMARY}</p>

        <div className={styles.table}>
          {rows.map(({ k, v }) => (
            <div key={k} className={styles.tableRow}>
              <span className={styles.tableLabel}>{k}</span>
              <span className={styles.tableValue}>{v}</span>
            </div>
          ))}
        </div>

        <div className={styles.securityBadge}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={styles.securityIcon}
          >
            <path
              d="M8 1L3 3.5v4c0 3 2.2 5.5 5 5.5s5-2.5 5-5.5v-4L8 1z"
              stroke={COLORS.PRIMARY}
              strokeWidth="1.2"
            />
            <path
              d="M5.5 8l2 2 3-3"
              stroke={COLORS.PRIMARY}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.securityText}>
            {FORM_MESSAGES.SECURITY_MESSAGE}
          </span>
        </div>

        <button type="button" onClick={onClose} className={styles.button}>
          {FORM_MESSAGES.GO_TO_DASHBOARD}
        </button>
      </div>
    </div>
  );
};
