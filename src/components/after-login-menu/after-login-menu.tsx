import React, { useCallback, useEffect, useState } from 'react';
import { appState } from '../../appstate';
import { pubSubService } from '../../pubsub';
import './after-nav-menu.scss';


export interface AfterLoginMenuItem {
  caption: string;
  contentId: string;
}



function navigateTo(destination: string) {
  if (destination === 'logout') {
    appState.setLoggedInUser(null);
  } else {
    pubSubService.emit({ id: 'navigate', to: destination, contentPage: true });
  }
}

function AfterLoginMenuItem(keyPrefix: string, items: AfterLoginMenuItem[]) {
  return items.map((item, index) => (
    <div className="NavMenuItemOuter" key={`${keyPrefix}-${index}`}>
      <div className="NavMenuItem" onClick={() => navigateTo(item.contentId)}>
        <div>
          {item.caption}
        </div>
        <div style={{ fontSize: '0.5em', opacity: 0.5 }}>{`${keyPrefix}-${index}`}</div>
      </div>
    </div>
  ));
}

interface Panel {

}

export function AfterLoginMenu(args: { items: AfterLoginMenuItem[] }) {

  let [panels, setPanels] = useState([
    {},
  ]);

  const [menuNode, setMenuNode] = useState(null as (HTMLDivElement | null))

  const menuRefCallback = useCallback((node: HTMLDivElement | null) => {

    setMenuNode(node);

    return () => {
    }
  }, []);

  useEffect(() => {

    // if we have a menu node, set up some event handlers to look for scrolling and animation
    menuNode?.addEventListener('scroll', scrollEventHandler, false)

    if (menuNode) {
      scrollUpdate();
    }

    return () => {
      menuNode?.removeEventListener('scroll', scrollEventHandler);
    };

    function setScrollPos(pos: number) {
      if (menuNode) {
        menuNode.scrollTop = pos
      }
    }

    function scrollUpdate() {
      // if we're nearing the end of the panels, add some more.
      if (menuNode) {
        let pagesChanged = false;
        // make sure there are enough nodes to fill the screen
        if (scrollableHeight() < viewHeight() + menuGroupHeight() * 6) {
          // we should never have a vertical height to cover so very many panels, so stop it here so teh browser doesn't end up 
          // with 100's of panels due to some css layout issue, which can easily happen if overflow's aren't set up correctly on parent divs
          if (panels.length < 20) {
            setPanels(panels.concat([{}, {}]));
            pagesChanged = true;
          }
        }

        // if we scroll close to the bottom, jump up a couple of menus worth
        if (getScrollPos() > scrollableHeight() - viewHeight() - menuGroupHeight() * 2) {
          setScrollPos(getScrollPos() - menuGroupHeight() * 2);
          pagesChanged = true;
        }

        // if we scroll close to the top, jump down a couple of menus worth
        if (getScrollPos() < menuGroupHeight()) {
          setScrollPos(getScrollPos() + menuGroupHeight() * 2);
          pagesChanged = true;
        }

        updateRotations();

        if (pagesChanged) {
          setTimeout(() => {
            // updateRotations();

          }, 1);
        }
      }
    }

    function scrollEventHandler() {
      window.requestAnimationFrame(scrollUpdate)
    }

    function getScrollPos() {
      if (menuNode) {
        return (menuNode.scrollTop || 0) - (menuNode.clientTop || 0)
      } else {
        return 0;
      }
    }

    function menuGroupHeight() {
      if (menuNode) {
        let itemElement = menuNode.querySelector(".NavMenuGroup") as (HTMLDivElement | null)
        if (itemElement) {
          return itemElement.offsetHeight;
        }
      }

      return 0;

    }

    function updateRotations() {
      if (menuNode) {
        let menuRect = menuNode.getBoundingClientRect();

        if (menuRect.height > 10) {
          let menuMiddle = 0.5 * (menuRect.bottom + menuRect.top);
          for (let menuItem of menuNode.querySelectorAll('div.NavMenuItem')) {
            let menuItemHtml = menuItem as HTMLDivElement;
            let itemRect = menuItem.getBoundingClientRect();
            let itemMiddle = 0.5 * (itemRect.bottom + itemRect.top);
            let scale = 100 - Math.round(100 * Math.abs(itemMiddle - menuMiddle) / menuRect.height);
            if (scale < 10) scale = 10;
            if (scale > 100) scale = 100;


            let translateZ = Math.round(100 * Math.abs(itemMiddle - menuMiddle) / menuRect.height);
            if (translateZ < 0) translateZ = 0;
            if (translateZ > 100) translateZ = 100;

            let translateY = Math.round(100 * (itemMiddle - menuMiddle) / menuRect.height);
            if (translateY < -100) translateY = -100;
            if (translateY > 100) translateY = 100;


            const maxRotation = 85;
            let rotate = -(100 * (itemMiddle - menuMiddle) / menuRect.height);
            if (rotate < -maxRotation) rotate = -maxRotation;
            if (rotate > maxRotation) rotate = maxRotation;


            translateY = 0.8 * -Math.sin(rotate / 180 * Math.PI) * Math.abs(menuMiddle - itemMiddle);
            translateZ = 200 * Math.abs(Math.sin(rotate / 180 * Math.PI));

            rotate = 0.1 * Math.round(10 * rotate);
            let rotateSmooth = rotate;
            if (Math.abs(rotate) < 3) rotate = 0;


            let opacity = 1.1 - 0.01 * Math.round(100 * Math.abs(itemMiddle - menuMiddle) / menuRect.height);


            // menuItemHtml.style.transform = `scale(${scale/100})`;
            menuItemHtml.style.transform = `rotate3d(1,0,0,${rotate}deg) translate3d(0,${translateY}px,${-translateZ}px)`;
            menuItemHtml.style.opacity = `${opacity}`;

            let shine = (rotateSmooth * 20) + 250;
            if (shine > 255) shine = 255;
            if (shine < 0) shine = 0;
            let shineOpac = Math.abs(rotateSmooth * 4);
            if (shineOpac > 100) shineOpac = 100;
            if (shineOpac < 0) shineOpac = 0;
            shineOpac = shineOpac * 0.5;
            // menuItemHtml.style.backgroundImage = `linear-gradient(${rotateSmooth}deg, transparent,rgb(255,255,255-${Math.abs(rotateSmooth)}) ${Math.abs(rotateSmooth + 10)}%, transparent)`;
            menuItemHtml.style.backgroundImage = `linear-gradient(${rotateSmooth}deg, transparent,rgba(${shine},${shine},${shine}, ${shineOpac / 100}) ${shineOpac}%, transparent)`;

            menuItem.setAttribute('sdfsdf', 'aaaa');
          }
        }
      }
    }

    function scrollableHeight() {
      return menuNode ? menuNode.scrollHeight : 0;
    }

    function viewHeight() {
      return menuNode ? menuNode.offsetHeight : 0;
    }

  }, [menuNode, panels]);


  return (
    <div className="LoopingNavMenu" ref={menuRefCallback}>
      <div>
        {
          panels.map((panel, index) => (
            <div className="NavMenuGroup" key={`panel-${index}`}>
              {AfterLoginMenuItem(`panel-${index}`, args.items)}
            </div>
          ))
        }
      </div>
    </div>
  );
}

