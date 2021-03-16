import React, {useState, useEffect } from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  useStore,
} from 'framework7-react';

import cordovaApp from '../js/cordova-app';

import routes from '../js/routes';
import store from '../js/store';

const app = () => {
  // Login screen demo data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const device = getDevice();
  
     useEffect(() => {
       
        store.dispatch('getHomeData');
        store.dispatch('setAllowedCountries');
        
      }, []);
   
    
    
  // Framework7 Parameters
  const f7params = {
    name: 'Hotbargains', // App name
      theme: 'auto', // Automatic theme detection


      id: 'com.kriti.Hotbargains', // App bundle ID
      // App store
      store: store,
      // App routes
      routes: routes,


      // Input settings
      input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
      lazy: {
        placeholder:"Loading",
        threshold: 0,
        sequential: false,
      },
  };
  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  
  const switchTabClick = (selector) => {
    const $ = f7.$;
     
        if (selector=="home")
            $(".tab-link-highlight").transform("translate3d(0%, 0px, 0px)");
        else if (selector=="catalog")
            $(".tab-link-highlight").transform("translate3d(100%, 0px, 0px)");
        else if(selector=="settings")
            $(".tab-link-highlight").transform("translate3d(200%, 0px, 0px)");
            
            
        $(".view-tab-btn").removeClass("tab-link-active");
        $("#link-view-"+selector).addClass("tab-link-active");
        
        
  }
  
  const onTabShow =(tab) =>{
  
    if (tab.id=="view-home")
        switchTabClick("home");
    else if (tab.id=="view-catalog")
        switchTabClick("catalog");
    else if (tab.id=="view-settings")
        switchTabClick("settings");
  
  }
    
    

  
    
  f7ready(() => {
    // Init cordova APIs (see cordova-app.js)
    if (f7.device.cordova) {
      cordovaApp.init(f7);
      store.dispatch('cordovaApp',cordovaApp);
    }
    
    // Call F7 APIs here
  });

  return (
    <App { ...f7params } >

        


        {/* Views/Tabs container */}
        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs */}
          <Toolbar tabbar labels bottom>
            <Link className="view-tab-btn" id="link-view-home" tabLink="#view-home" animate={false} ignoreCache={true} tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="f7:house_fill" text="Home" />
            <Link className="view-tab-btn" id="link-view-catalog"  tabLink="#view-catalog" animate={false} ignoreCache={true} iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill" iconMd="f7:square_list_fill" text="Catalog" />
            <Link className="view-tab-btn" id="link-view-settings"  tabLink="#view-settings" animate={false} ignoreCache={true} iconIos="f7:person_alt" iconAurora="f7:person_alt" iconMd="f7:person_alt" text="Account" />
          </Toolbar>

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="view-home" name="home" main tab tabActive url="/" onTabShow={onTabShow}  />

          {/* Catalog View */}
          <View id="view-catalog" name="catalog" tab url="/catalog/1/All Categories/" onTabShow={onTabShow}  />

          {/* Settings View */}
          <View id="view-settings" name="settings" tab url="/settings/" onTabShow={onTabShow} />

        </Views>

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      
    </App>
  )
}
export default app;