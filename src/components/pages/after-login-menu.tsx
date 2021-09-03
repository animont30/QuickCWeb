import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pubSubService } from '../../pubsub';
import { FormGroup } from '../form-controls/form-group';
import { FormInput, FormInputRef } from '../form-controls/form-input';
import { FormButton } from '../form-controls/form-button';
import { FaBackward, FaArrowRight, FaSpinner, FaCheck } from 'react-icons/fa';
import { ScrollingPage } from '../form-controls/scrolling-page';
import { AfterLoginMenu, AfterLoginMenuItem } from '../after-login-menu/after-login-menu';


export function AfterLoginMainM(args: {}) {

  function navigateTo(destination: string) {
    pubSubService.emit({ id: 'navigate', to: destination, contentPage: true });
  }

  let afterLoginMenuItmes: AfterLoginMenuItem[] = [
    { caption: 'About Company', contentId: 'looping-menu-2'},
    { caption: 'Feedback this App', contentId: 'looping-menu-8' },
    { caption: 'Privacy Policy', contentId: 'controls-example' },
    { caption: 'Terms & Condition', contentId: 'controls-example' },  
  ];

  return (
    <AfterLoginMenu items={afterLoginMenuItmes} />
  );
}

