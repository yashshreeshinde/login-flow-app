import React, { useState } from "react";
import { ACCOUNT_TYPES, COLORS } from "../../constants/constants";
import { PersonalIcon } from "../Icons/PersonalIcon";
import { BusinessIcon } from "../Icons/BusinessIcon";
import { FormNav } from "../FormNav/FormNav";
import styles from "./AccountTypeStep.module.css";

interface AccountTypeStepProps {
  onNext: (t: string) => void;
  onBack: () => void;
}

export const AccountTypeStep: React.FC<AccountTypeStepProps> = ({
  onNext,
  onBack,
}) => {
  const [selected, setSelected] = useState("personal");

  return (
    <div className={styles.container}>
      <p className={styles.question}>
        To join us tell us{" "}
        <span className={styles.questionBold}>what type of account</span>
        <br />
        you are opening
      </p>

      <div className={styles.list}>
        {ACCOUNT_TYPES.map(({ id, label }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              className={styles.button}
              data-selected={isSelected}
            >
              <div className={styles.icon}>
                {id === "personal" ? (
                  <PersonalIcon color={isSelected ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY} />
                ) : (
                  <BusinessIcon color={isSelected ? COLORS.PRIMARY : COLORS.TEXT_PRIMARY} />
                )}
              </div>
              <span className={styles.label}>{label}</span>
              {isSelected && (
                <div className={styles.checkmark}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <FormNav onBack={onBack} onContinue={() => onNext(selected)} showBack />
    </div>
  );
};
