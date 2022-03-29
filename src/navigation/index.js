/*
 * Developed by Prishan Maduka on 3/29/22, 3:03 PM
 * Last modified 3/29/22, 3:03 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React, {useEffect} from 'react';
import {Actions, Router, Scene} from 'react-native-router-flux';
import WelcomeView from '../views/WelcomeView';
import HomeView from '../views/HomeView';

const views = Actions.create(
    <Scene key={'root'}>
        <Scene key={'welcome'}
               initial={true}
               hideNavBar={true}
               component={WelcomeView}/>

        <Scene key={'home'}
               hideNavBar={true}
               component={HomeView}/>
    </Scene>
)

const Root = () => {

    useEffect(()=>{
        console.log('XXXXXX')
    },[])

    return (
        <Router scenes={views} getSceneStyle={() => ({backgroundColor: 'white'})}/>
    )

}

export default Root;
