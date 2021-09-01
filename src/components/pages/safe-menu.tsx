import React from 'react';
import { appState } from '../../appstate';
import { LoopingNavMenu, NavMenuItem } from '../looping-nav-menu/looping-nav-menu';

export function SafeMenu(args: {}) {
  function logout() {
    appState.setLoggedInUser(null);
  }
  let menuItems: NavMenuItem[] = [
    { caption: 'Leave Safe', contentId: 'logout'},
    { caption: 'C FYI', contentId: '' },
    { caption: 'App FYI', contentId: '' },
    { caption: 'Change Safe', contentId: 'logout' },
    { caption: 'Change App', contentId: 'logout' }
  ];
  return (
    <LoopingNavMenu items={menuItems} />
  );
}

