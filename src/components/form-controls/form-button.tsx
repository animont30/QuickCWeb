import React, { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaInfoCircle } from 'react-icons/fa';
import { pubSubService } from '../../pubsub';
import './form-group.scss';

interface FormButtonProps {
  label: string;
  helpText?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  buttonType?: 'navigate-forward' | 'navigate-backward' | 'menu';
}

export function FormButton({ label, onClick, icon, helpText, buttonType }: FormButtonProps) {
  const [showHelpText, setShowHelpText] = useState(false);
  const hasHelpText = !!helpText;
  const hasLabelText = !!label;


  function toggleShowHelpText() {
    setShowHelpText(!showHelpText);
  }

  function buttonClicked() {
    if (onClick) onClick();
  }

  return (

    <div className={`safe101-form-button safe101-style-${buttonType || 'default'}`} >
      {
        hasHelpText
          ? <div className={`safe101-form-field-help-icon ${showHelpText ? 'active' : ''}`} onClick={() => toggleShowHelpText()}><FaInfoCircle /></div>
          : null
      }
      <div className="safe101-form-button-caption-row" onClick={() => buttonClicked()}>
      { hasLabelText ? <span>{label}</span> : null }
        <span>
          {icon}
        </span>
      </div>
      {
        showHelpText
          ? <div className="safe101-form-button-help-row">
            <div className={`safe101-form-field-help `}>{helpText}</div>

          </div>
          : null
      }
    </div>
  );
}

