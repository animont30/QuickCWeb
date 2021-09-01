import React, { useCallback, useEffect, useState } from 'react';
import { BrowserView, isBrowser, isMobileOnly } from 'react-device-detect';
import { appState, Pane } from '../../appstate';
import { pubSubService } from '../../pubsub';
import { LoginPage } from '../login-page/login-page';
import { LoopingNavMenu, NavMenuItem } from '../looping-nav-menu/looping-nav-menu';
import { NavigationFooter } from '../navigation-footer/navigation-footer';
import { ControlsDemoPage } from '../pages/controls-demo';
import { MainMenu } from '../pages/main-menu';
import { SafeMenu } from '../pages/safe-menu';
import { WelcomePage } from '../welcome-page/welcome-page';
import './sliding-navigation-area.scss';


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
export function SlidingNavigationArea(args: {}) {

  const [panes, setPanes] = useState([] as Pane[]);
  const [activePaneIndex, setActivePaneIndex] = useState(0);

  // set this to less than 100 to make debugging scrolling and things easier.
  const paneWidthPercent = 100;

  useEffect(() => {

    if (panes.length === 0) {
      refreshPanes();
    }
    // setTimeout(() => {setActivePaneIndex(1)}, 2000);
    // setTimeout(() => {setActivePaneIndex(2)}, 5000);
    // setTimeout(() => {setActivePaneIndex(1)}, 8000);

    const subscription = pubSubService.notifications().subscribe((value) => {
      if (value.id === 'navigation-changed') {
        refreshPanes();
      }

    });

    return () => {
      subscription.unsubscribe();
    }


  }, [panes, activePaneIndex]);

  function refreshPanes() {
    setPanes(appState.navigation.navigationStack.map(src => ({
      paneId: src.paneId,
      contentId: src.contentId,
      contentPage: src.contentPage
    })));
    if (!appState.navigation.isLatestPaneContent() || isMobileOnly) {
      setActivePaneIndex(appState.navigation.activePaneIndex);
    }
  }

  function renderPane(pane: Pane, index: number) {

    let paneContent = <div></div>
    var all: any = document.getElementsByClassName('app-main-area');
    if (pane.contentId === 'welcome') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'visible';
        all[i].style.height = '100vh';
      }
      paneContent = <WelcomePage />
    } else if (pane.contentId === 'login') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <LoginPage />
    } else if (pane.contentId === 'safe-menu') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <SafeMenu />
    } else if (pane.contentId === 'looping-menu-2') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <LoopingNavMenu items={menuItems2} />
    } else if (pane.contentId === 'looping-menu-8') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <LoopingNavMenu items={menuItems6} />
    } else if (pane.contentId === 'main-menu') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <MainMenu />
    } else if (pane.contentId === 'controls-example') {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <ControlsDemoPage />
    } else {
      for (var i = 0; i < all.length; i++) {
        all[i].style.overflow = 'hidden';
        all[i].style.height = '80vh';
      }
      paneContent = <div>pane {pane.paneId} {pane.contentId} index {index}</div>
    }
      

    return <div key={pane.paneId} className="sliding-nav-pane"
      style={{ gridRow: 1, gridColumn: 1 + index }}
    >
      {paneContent}

    </div>
  }

  function renderPanes() {
    return panes.map((pane, index) => renderPane(pane, index));

  }


  return (
    <div className="sliding-nav-area"
      style={{
        transform: `translate(${-activePaneIndex * paneWidthPercent}%,0)`,
        transition: 'transform 400ms',
        overflow: 'visible',
        gridTemplateRows: '100%',
      }}>
      <div className="sliding-nav-area"
        style={{
          overflow: 'hidden',
          width: `${panes.length * paneWidthPercent}%`,
          gridTemplateColumns: `repeat(${panes.length}, minmax(0, 1fr))`,
          gridTemplateRows: '100%',
        }}>
        {renderPanes()}
      </div>

    </div>
  );
}

