import React, { useCallback, useEffect, useState } from 'react';
import { appState, Pane } from '../../appstate';
import { pubSubService } from '../../pubsub';
import { LoginPage } from '../login-page/login-page';
import { LoopingNavMenu, NavMenuItem } from '../looping-nav-menu/looping-nav-menu';
import { ControlsDemoPage } from '../pages/controls-demo';
import { MainMenu } from '../pages/main-menu';
import { SafeMenu } from '../pages/safe-menu';
import { WelcomePage } from '../welcome-page/welcome-page';
import bgImage from '../../images/101_bg-dark.png'

let menuItems2: NavMenuItem[] = [
  { caption: 'A. First Item', contentId: '' },
  { caption: 'B. Second Item', contentId: '' },
];

let menuItems6: NavMenuItem[] = [
  { caption: 'A. First Item', contentId: '' },
  { caption: 'B. Second Item', contentId: '' },
  { caption: 'C. Third Item', contentId: '' },
  { caption: 'D. Fourth ', contentId: '' },
  { caption: 'E. Fifth', contentId: '' },
  { caption: 'F. Sixth', contentId: '' },
  { caption: 'G. Seventh', contentId: '' },
  { caption: 'H. Eighth Item', contentId: '' },
];
export function BrowserDisplayArea() {

  const [contentId, setContentId] = useState('');
  const [contentPage, setContentPage] = useState(false);

  useEffect(() => {
    const subscription = pubSubService.notifications().subscribe((value) => {
      if (value.id === 'navigation-changed') {
        const pane = appState.navigation.navigationStack[appState.navigation.navigationStack.length - 1]
        setContentId(pane.contentId);
        setContentPage(pane.contentPage);
      } else if (value.id === 'navigate-back') {
        setContentId('');
        setContentPage(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    }

  }, []);

  function renderPane(pane: Pane, index: number) {
    if (pane.contentPage) {
      let paneContent = <div></div>
      if (pane.contentId === 'welcome') {
        paneContent = <WelcomePage />
      } else if (pane.contentId === 'login') {
        paneContent = <LoginPage />
      } else if (pane.contentId === 'safe-menu') {
        paneContent = <SafeMenu />
      } else if (pane.contentId === 'looping-menu-2') {
        paneContent = <LoopingNavMenu items={menuItems2} />
      } else if (pane.contentId === 'looping-menu-8') {
        paneContent = <LoopingNavMenu items={menuItems6} />
      } else if (pane.contentId === 'main-menu') {
        paneContent = <MainMenu />
      } else if (pane.contentId === 'controls-example') {
        paneContent = <ControlsDemoPage />
      } else {
        paneContent = <div>pane {pane.paneId} {pane.contentId} index {index}</div>
      }

      return <div key={pane.paneId} className="sliding-nav-pane"
        style={{ gridRow: 1, gridColumn: 1 + index, width: '60%', margin: '2% 0 2% 0' }}
      >
        {paneContent}

      </div>
    } else {
      return (
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img className="image-fly-in" src={bgImage} style={{ width: '100%' }} />
        </div>
      );
    }
  }

  return renderPane({ paneId: '0', contentId: contentId, contentPage: contentPage }, 0);
}

