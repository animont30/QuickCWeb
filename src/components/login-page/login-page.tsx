import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pubSubService } from '../../pubsub';
import { FormGroup } from '../form-controls/form-group';
import { FormInput, FormInputRef } from '../form-controls/form-input';
import { NavigationFooter } from '../navigation-footer/navigation-footer';
import { FormButton } from '../form-controls/form-button';
import BottomButtons from '../bottom-buttons/BottomButtons'
import './login-page.scss';
import { FaBackward, FaArrowRight, FaSpinner, FaCheck, FaInfoCircle, FaDivide } from 'react-icons/fa';
import { ScrollingPage } from '../form-controls/scrolling-page';
import { updateTypePredicateNodeWithModifier } from 'typescript';
import { appState } from '../../appstate';
import { FormInputLooping } from '../form-controls/form-input-looping';
import $ from 'jquery';
import axios from 'axios'

enum LoginState {
  None,
  LoggingIn,
  Success,
  Fail,
}

interface LoginErrors {
  safeName: string;
  memberName: string;
  pin: string;
}


export const LoginPage = (args: {}) => {

  const [loginState, setLoginState] = useState(LoginState.None);

  const [errors, setErrors] = useState({} as Partial<LoginErrors>);

  const LoginClick = () => {

    let loginValues = {
      safeName: formData.safeName,
      memberName: formData.memberName,
      pin: formData.pin
    };

    let newErrors = Object.assign({} as Partial<LoginErrors>, errors);
    if (!loginValues.safeName) {
      newErrors.safeName = "Please provide a Safe to login to";
    } else {
      newErrors.safeName = '';
    }
    if (!loginValues.memberName) {
      newErrors.memberName = "Please provide a member name";
    } else {
      newErrors.memberName = '';
    }
    if (!loginValues.pin) {
      newErrors.pin = "Please provide a pin to use for logging in";
    } else {
      newErrors.pin = '';
    }
    setErrors(newErrors);

    if (loginValues.safeName && loginValues.memberName && loginValues.pin) {
      if (loginState === LoginState.None) {
        setLoginState(LoginState.LoggingIn);
        setTimeout(() => {
          setLoginState(LoginState.None);
          appState.setLoggedInUser(loginValues);
        }, 1500);
      }
    }
    setTimeout(() => {
      updateRotations();
    }, 1);
    const loadusers = async (key: any) => {

      // const result = await axios.post("https://safe101.com.au/safe101-demo/api/loginApi/validate", {
      //   data:{

      //   },
      //   auth:{
      //     username: 'Dinah',
      //     password: '123456'
      //   }
      // }).then(

      // ).catch(){

      // }
      // setLoginState(result.data);
      // console.log(result.data)

      // const objUser={
      //   username: loginValues.safeName,
      //   memberName: loginValues.memberName,
      //   pin: loginValues.pin
      // }

      axios({
        method: 'post',
        url: "https://safe101.com.au/safe101-test/api/loginApi/validate",
        // headers: {}, 
        data: {
          "j_username": formData.memberName,
          "j_password": formData.pin
        },
      }).then((res) => {
        const response = JSON.parse(res.data);
        if (response.status.name === 'ERR') {
          //Err received
          // Show error message
        } else if (response.status.name === 'SUCCESS') {
          // Success received
          // Go to next fomr
          // if login is success then if block of 62 line fall here
          console.log('ares.data', res.data)
          
          if (loginState === LoginState.None) {
            setLoginState(LoginState.LoggingIn);
            setTimeout(() => {
              setLoginState(LoginState.None);
              appState.setLoggedInUser(loginValues);
            }, 1500);
          }
        }

        // this.setState({ initData: res.data })
        // console.log('this.state.initData',this.state.initData)
      })
        .catch((error) => {
          console.error('aerror', error)
        })
    };

    loadusers(1)

  }


  function renderLoginButton() {
    let icon: React.ReactNode;

    if (loginState === LoginState.LoggingIn) {
      icon = <FaSpinner className='icon-spin' />;
    } else if (loginState === LoginState.Success) {
      icon = <FaCheck />
    } else {
      icon = <FaArrowRight />
    }

    return <div style={{ margin: 0, }}><FormButton buttonType='navigate-forward' label={''} icon={icon} onClick={() => LoginClick()}></FormButton></div>
  }

  let [panels, setPanels] = useState([{}]);

  const [menuNode, setMenuNode] = useState(null as (HTMLDivElement | null))

  const menuRefCallback = useCallback((node: HTMLDivElement | null) => {

    setMenuNode(node);

    return () => {
    }
  }, []);

  useEffect(() => {

    $('.app-main-area').css('height', '90vh');
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

        // updateRotations();

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

    function scrollableHeight() {
      return menuNode ? menuNode.scrollHeight : 0;
    }

    function viewHeight() {
      return menuNode ? menuNode.offsetHeight : 0;
    }

  }, [menuNode, panels]);

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

  const [formData, setFormData] = useState({ safeName: '', memberName: '', pin: '' });

  function handleChange(e: any) {
    var updatedForm: any = formData;
    for (var prop in updatedForm) {
      if (e.target.name === prop) {
        console.log(prop, e.target.value)
        updatedForm[prop] = e.target.value;
      }
    }
    // changed here 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (

    <React.Fragment>
      <div className="LoopingNavMenu login-page" ref={menuRefCallback}>
        <ScrollingPage>
          <FormGroup>
            <div>
              {
                panels.map((panel, index) => (
                  <div className="NavMenuGroup" key={`panel-${index}`}>
                    <div className="NavMenuItemOuter" key={`${index}-0`}>
                      <div className="NavMenuItem" style={{ padding: 0 }}>
                        <FormInputLooping label={'Safe'} helpText="The name of the safe you want to log in to" errorText={errors.safeName} name="safeName" value={formData.safeName} onChange={handleChange}></FormInputLooping>
                      </div>
                    </div>
                    <div className="NavMenuItemOuter" key={`${index}-1`}>
                      <div className="NavMenuItem" style={{ padding: 0 }}>
                        <FormInputLooping label={'BoBer'} helpText="Your member name within that safe" errorText={errors.memberName} name="memberName" value={formData.memberName} onChange={handleChange}></FormInputLooping>
                      </div>
                    </div>
                    <div className="NavMenuItemOuter" key={`${index}-2`}>
                      <div className="NavMenuItem" style={{ padding: 0 }}>
                        <FormInputLooping label={'Password'} helpText="Your pin number/password." errorText={errors.pin} name="pin" value={formData.pin} onChange={handleChange}></FormInputLooping>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="NavMenuItemOuter no-background" key={`${index}-3`}>
                      <div className="NavMenuItem no-background" style={{ padding: 0 }}>
                        {renderLoginButton()}
                      </div>
                    </div>

                  </div>
                ))
              }
            </div>
          </FormGroup>
        </ScrollingPage>
        <div className="app-footer" style={{margin:'10px', background:'red' }}>
          <BottomButtons />
        </div>
      </div>

    </React.Fragment>


  );
}





