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
    { caption: 'Favorite Group1', contentId: 'looping-menu-2'},
    { caption: 'cBoBs', contentId: 'looping-menu-2' },
    { caption: 'cChats', contentId: 'looping-menu-2' },
    { caption: 'cTexts', contentId: 'looping-menu-2' },  
    { caption: 'cDocuments', contentId: 'looping-menu-2' },
    { caption: 'cPhotos', contentId: 'looping-menu-2' },
    { caption: 'cVideos', contentId: 'looping-menu-2' },
    { caption: 'cAudios', contentId: 'looping-menu-2' }, 
    { caption: 'cLinks', contentId: 'looping-menu-2' }, 
    { caption: 'cBoB Groups', contentId: 'looping-menu-2' },
    { caption: 'cRecycle Bin', contentId: 'looping-menu-2' },
    { caption: 'QUICKc Logo', contentId: 'looping-menu-2' },
  ];

  return (
    <AfterLoginMenu items={afterLoginMenuItmes} />
  );
}

