import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { pubSubService } from '../../pubsub';
import { FormButton } from '../form-controls/form-button';
import { FormGroup } from '../form-controls/form-group';
import './welcome-page.scss';
import bgImage from '../../images/101_bg-dark.png'
import cImage from '../../images/cpeople_logo.png'


export function WelcomePage(args: {}) {

  function loginClick() {
    pubSubService.emit({ id: 'navigate', to: 'login', contentPage: false });
  }

  return (
    <div className="safe101-page-welcome">
      <div className="safe101-welcome-title">
        <div className="rotate-fade-right">
          <img src={cImage} style={{ width: '25px' }} />
        </div>
        <div className="rotate-fade-left">
          Bob
        </div>
      </div>
      <div className="safe101-welcome-subtitle" >
        Powered by
      </div>
      <div style={{ width: '100%', padding: '1em', perspective: '500px', textAlign: 'center' }}>
        <img className="image-fly-in" src={bgImage} style={{ width: '80%' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <FormGroup className="login-button-fade-in">
          <FormButton buttonType="navigate-forward" label="" onClick={() => loginClick()} icon={<FaArrowRight />}></FormButton>
        </FormGroup>
      </div>
    </div>
  );
}

