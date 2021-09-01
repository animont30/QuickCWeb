import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { LoopingNavMenu, NavMenuItem } from './components/looping-nav-menu/looping-nav-menu';
import { SlidingNavigationArea } from './components/sliding-navigation-area/sliding-navigation-area';
import { NavigationFooter } from './components/navigation-footer/navigation-footer';
import { BrowserView, isMobileOnly, MobileView } from 'react-device-detect';
import { BrowserDisplayArea } from './components/browser-display-area/browser-display-area';
import { pubSubService } from './pubsub';

function App() {
  if (isMobileOnly) {
    return (
      <div className="App">
        <div className="app-main-area">
          <SlidingNavigationArea></SlidingNavigationArea>
        </div>
        <div className="app-footer">
          <NavigationFooter></NavigationFooter>
        </div>
      </div>);

  } else {
    return (
      <div className="App">
        <div style={{ display: 'flex', height: '100vh' }}>
          <div style={{ width: '25%', borderRight: 'solid 5px white'}}>
            <div className="app-main-area">
              {/* wheel is here */}
              <SlidingNavigationArea ></SlidingNavigationArea>
            </div>
            <div className="app-footer" style={{ position: 'absolute', bottom: 2, left: 0, width: '19.6%' }}>
              <NavigationFooter></NavigationFooter>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
            <BrowserDisplayArea></BrowserDisplayArea>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
