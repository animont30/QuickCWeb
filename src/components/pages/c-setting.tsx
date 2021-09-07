import React from 'react';
import { appState } from '../../appstate';
import { pubSubService } from '../../pubsub';
import { LoopingNavMenu, NavMenuItem } from '../looping-nav-menu/looping-nav-menu';

export function CSettingMenu(args: {}) {
    function navigateTo(destination: string) {
        pubSubService.emit({ id: 'navigate', to: destination, contentPage: true });
      }
  let menuItems: NavMenuItem[] = [
    { caption: 'Permission', contentId: '' },
    { caption: 'Notification', contentId: '' },
    { caption: 'User Name', contentId: '' },
    { caption: 'cSetting', contentId: '' },
    { caption: 'SAFE Change', contentId: '' },
    { caption: 'cAPP Change', contentId: '' },
    { caption: 'cMyLIBRARY', contentId: '' },
    { caption: 'cSAFE Logo', contentId: '' },
  ];
  return (
    <LoopingNavMenu items={menuItems} />
  );
}
