import React, { useCallback, useEffect, useState } from 'react';
import { FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import './form-group.scss';

interface FormInputProps {
  label: string;
  helpText?: string | React.ReactNode;
  data?: FormInputRef;
  errorText?: string | React.ReactNode
}

export class FormInputRef {
  public value: () => string = () => '';
}

export function FormMemoInput({ label, helpText, data, errorText }: FormInputProps) {

  const [showHelpText, setShowHelpText] = useState(false);

  const hasHelpText = !!helpText;
  const hasErrors = !!errorText;

  function toggleShowHelpText() {
    setShowHelpText(!showHelpText);
  }

  return (
    <div className={`safe101-form-input ${hasErrors ? 'safe101-form-field-has-errors' : ''}`}>
      <div className="safe101-form-input-labelrow" >
        {
          hasErrors
            ? <div className={`safe101-form-field-error-icon ${showHelpText ? 'active' : ''}`}><FaExclamationCircle /></div>
            : null
        }

        <label>{label}</label>

        {
          hasHelpText
            ? <div className={`safe101-form-field-help-icon ${showHelpText ? 'active' : ''}`} onClick={() => toggleShowHelpText()}><FaInfoCircle /></div>
            : null
        }
      </div>
      {
        showHelpText && hasHelpText
          ? <div className={`safe101-form-field-help `}>{helpText}</div>
          : null
      }
      {
        errorText
          ? <div className={`safe101-form-field-error `}>{errorText}</div>
          : null
      }
      <textarea ref={ref => { if (data) { data.value = () => ref ? ref.value : '' } }}></textarea>
    </div>
  );
}

