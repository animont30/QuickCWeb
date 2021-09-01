import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pubSubService } from '../../pubsub';
import { FormGroup } from '../form-controls/form-group';
import { FormInput, FormInputRef } from '../form-controls/form-input';
import { FormButton } from '../form-controls/form-button';
import { FaBackward, FaArrowRight, FaSpinner, FaCheck } from 'react-icons/fa';
import { ScrollingPage } from '../form-controls/scrolling-page';
import { LoopingNavMenu, NavMenuItem } from '../looping-nav-menu/looping-nav-menu';


export function MainMenu(args: {}) {

  function navigateTo(destination: string) {
    pubSubService.emit({ id: 'navigate', to: destination, contentPage: true });
  }

  let menuItems: NavMenuItem[] = [
    { caption: 'About Company', contentId: 'looping-menu-2'},
    { caption: 'Feedback this App', contentId: 'looping-menu-8' },
    { caption: 'Privacy Policy', contentId: 'controls-example' },
    { caption: 'Terms & Condition', contentId: 'controls-example' },
  
  ];

  return (
    <LoopingNavMenu items={menuItems} />
  );
}

