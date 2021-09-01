import React, { useCallback, useEffect, useState } from 'react';
import { FaExclamation, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { pubSubService } from '../../pubsub';
import './form-group.scss';
import cImage from '../../images/cpeople_logo.png'


interface FormInputProps {
  label: string;
  helpText?: string | React.ReactNode;
  data?: FormInputRef;
  errorText?: string | React.ReactNode;
  name: string;
  value: string;
  onChange: (e: any) => void;
}

export class FormInputRef {
  public value: () => string = () => '';
}

export function FormInputLooping({ label, helpText, data, errorText, name, value, onChange }: FormInputProps) {

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
            ? <div className={`safe101-form-field-help-icon ${showHelpText ? 'active' : ''}`} onClick={() => toggleShowHelpText()}><img src={cImage} style={{ width: '25px'}} /></div>
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
      {/* <input ref={ref => { if (data) { data.value = () => ref ? ref.value : '' } }}></input> */}
      <input type="text" name={name} value={value} onChange={onChange} />

    </div>
  );
}

