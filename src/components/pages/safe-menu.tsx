import React from 'react';
import { appState } from '../../appstate';
import { LoopingNavMenu, NavMenuItem } from '../looping-nav-menu/looping-nav-menu';

export function SafeMenu(args: {}) {
  function logout() {
    appState.setLoggedInUser(null);
  }
  let menuItems: NavMenuItem[] = [
    { caption: 'CMyBob', contentId: '' },
    { caption: 'Image', contentId: '' },
    { caption: 'User Name', contentId: '' },
    { caption: 'cSetting', contentId: 'c-setting-menu' },
    { caption: 'SAFE Change', contentId: '' },
    { caption: 'cAPP Change', contentId: '' },
    { caption: 'cMyLIBRARY', contentId: '' },
    { caption: 'cSAFE Logo', contentId: '' },
  ];
  return (
    <LoopingNavMenu items={menuItems} />
  );
}

