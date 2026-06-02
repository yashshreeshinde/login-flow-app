import { useState } from 'react';
import { FORM_STEPS } from './constants/constants';
import { LoginLayout } from './components/LoginLayout/LoginLayout';
import { AccountTypeStep } from './components/AccountTypeStep/AccountTypeStep';
import { PhoneStep } from './components/PhoneStep/PhoneStep';
import { OTPStep } from './components/OTPStep/OTPStep';
import { NameStep } from './components/NameStep/NameStep';
import { PasswordStep } from './components/PasswordStep/PasswordStep';
import { SuccessModal } from './components/SuccessModal/SuccessModal';
import './styles/theme.css';

interface FormData {
  accountType: string;
  phone: string;
  firstName: string;
  lastName: string;
}

const INITIAL_FORM_DATA: FormData = {
  accountType: 'personal',
  phone: '',
  firstName: '',
  lastName: '',
};

export default function App() {
  const [step, setStep] = useState(FORM_STEPS.ACCOUNT_TYPE);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL_FORM_DATA);

  const goToNextStep = () => {
    setStep((s) => Math.min(s + 1, FORM_STEPS.TOTAL));
  };

  const goToPreviousStep = () => {
    setStep((s) => Math.max(s - 1, FORM_STEPS.ACCOUNT_TYPE));
  };

  const updateForm = (data: Partial<FormData>) => {
    setForm((f) => ({ ...f, ...data }));
  };

  const handleReset = () => {
    setIsSuccess(false);
    setStep(FORM_STEPS.ACCOUNT_TYPE);
    setForm(INITIAL_FORM_DATA);
  };

  return (
    <>
      <LoginLayout currentStep={step} totalSteps={FORM_STEPS.TOTAL}>
        {step === FORM_STEPS.ACCOUNT_TYPE && (
          <AccountTypeStep
            onNext={(accountType) => {
              updateForm({ accountType });
              goToNextStep();
            }}
            onBack={goToPreviousStep}
          />
        )}
        {step === FORM_STEPS.PHONE && (
          <PhoneStep
            onNext={(phone) => {
              updateForm({ phone });
              goToNextStep();
            }}
            onBack={goToPreviousStep}
          />
        )}
        {step === FORM_STEPS.OTP && (
          <OTPStep
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        {step === FORM_STEPS.NAME && (
          <NameStep
            onNext={(firstName, lastName) => {
              updateForm({ firstName, lastName });
              goToNextStep();
            }}
            onBack={goToPreviousStep}
          />
        )}
        {step === FORM_STEPS.PASSWORD && (
          <PasswordStep
            onNext={() => setIsSuccess(true)}
            onBack={goToPreviousStep}
          />
        )}
      </LoginLayout>
      <SuccessModal
        isOpen={isSuccess}
        firstName={form.firstName}
        lastName={form.lastName}
        phone={form.phone}
        accountType={form.accountType}
        onClose={handleReset}
      />
    </>
  );
}
