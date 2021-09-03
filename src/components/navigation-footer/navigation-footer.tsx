import React, { Component, useCallback, useEffect, useState } from 'react';
import './navigation-footer.scss';
import { FaBackward, FaArrowLeft } from 'react-icons/fa';
import { pubSubService } from '../../pubsub';
import { appState } from '../../appstate';
import { appendFileSync } from 'fs';
import { MobileView } from 'react-device-detect';
import BottomButtons from '../bottom-buttons/BottomButtons';
import c from '../../images/cpeople_logo.png'
import { LoginPage } from '../login-page/login-page';
export function NavigationFooter(args: {}) {

  const [safeName, setSafeName] = useState('');
  const [hasSafeOpened, setHasSafeOpened] = useState(false);
  const [hasBackNavigationAvailable, sethasBackNavigationAvailable] = useState(false);

  const hasAnything = hasSafeOpened || hasBackNavigationAvailable;

  function navigateBack() {
    pubSubService.emit({ id: 'navigate-back' });
  }

  function openSafeMenu() {
    if (appState.getActivePane() === 'safe-menu') {
      pubSubService.emit({ id: 'navigate-back' });
    } else {
      appState.navigateTo('safe-menu', false);
      sethasBackNavigationAvailable(false);
    }
  }

  useEffect(() => {

    const subscription = pubSubService.notifications().subscribe((value) => {
      if (value.id === 'navigate' && value.to === 'login') {
        sethasBackNavigationAvailable(false);
      }
      if (value.id === 'navigation-changed') {
        setHasSafeOpened(!!appState.loggedInUser.safeName);
        sethasBackNavigationAvailable(appState.navigation.hasPreviousPane());
        setSafeName(appState.loggedInUser.safeName);
      }
    });

    return () => {
      subscription.unsubscribe();
    }


  }, []);

  if (hasSafeOpened || hasBackNavigationAvailable) {
    return (
      <div className={`safe101-navigation-footer ${hasSafeOpened && hasBackNavigationAvailable ? 'footer-multi' : ''}`} style={{ transform: `translate(0,${hasAnything ? '0' : '8em'}` }}>
        <div onClick={() => openSafeMenu()} className={`safe101-footer-button safe101-style-menu ${hasSafeOpened ? 'safe101-enabled' : 'safe101-disabled'}`}>
          {
            hasSafeOpened
              ? <div>
                {safeName}
              </div>
              : null
          }
        </div>
        <div onClick={() => navigateBack()} className={`safe101-footer-button  safe101-style-navigate-backward ${hasBackNavigationAvailable ? 'safe101-enabled' : 'safe101-disabled'}`}>
          {
            hasBackNavigationAvailable
              ? <div>
                <FaArrowLeft size="2em" />
              </div>
              : null
          }

        </div>

        <MobileView>
          <div className="safe101-safe-area"></div>
        </MobileView>

      </div>
    );
  }  
  // else if (pane.contentId === 'login'){

  // }
  else {
    return null
  }
}

