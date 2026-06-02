import React from "react";
import { LAYOUT_LABELS } from "../../constants/constants";
import styles from "./LoginLayout.module.css";
import illustration from "../../assets/illustration.png";

interface Props {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export const LoginLayout: React.FC<Props> = ({
  children,
  currentStep,
  totalSteps,
}) => {
  const progress = currentStep / totalSteps;
  const showProgress = currentStep > 1;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div>
            <p className={styles.subtitle}>{LAYOUT_LABELS.STARTED}</p>
            <h1 className={styles.title}>{LAYOUT_LABELS.CREATE_ACCOUNT}</h1>
            <p className={styles.description}>{LAYOUT_LABELS.FOLLOW_STEPS}</p>
          </div>
          <div className={styles.spacer} />
          <img src={illustration} alt="" className={styles.illustration} />
        </div>

        {showProgress && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}

        <div className={styles.card}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
