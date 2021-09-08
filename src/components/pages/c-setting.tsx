import React from 'react';
import { appState } from '../../appstate';
import { pubSubService } from '../../pubsub';
import { CSettingMenu, CSettingMenuItem } from '../c-setting-menu/c-setting-menu';

export function CSettingMenuM(args: {}) {
    function navigateTo(destination: string) {
        pubSubService.emit({ id: 'navigate', to: destination, contentPage: true });
      }
  let csettingmenuItems: CSettingMenuItem[] = [
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
    <CSettingMenu items={csettingmenuItems} />
  );
}
