/*
 * Developed by Prishan Maduka on 3/29/22, 3:53 PM
 * Last modified 3/29/22, 3:53 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as StoreProvider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import cfgStore, {persistore} from './redux/store/ConfigureStore';
import Root from "./navigation";
import RNUxcam from 'react-native-ux-cam';

const store = cfgStore();

const App = () =>  {

  useEffect(()=>{
      SplashScreen.hide();
      RNUxcam.startWithKey('5kn17zhf2mfonl2');
  },[])

  return (
      <SafeAreaView style={{flex:1}}>
        <StoreProvider store={store}>

          <PersistGate loading={null} persistor={persistore}>

            <Root/>

          </PersistGate>

        </StoreProvider>
      </SafeAreaView>
  );
};

export default App;
