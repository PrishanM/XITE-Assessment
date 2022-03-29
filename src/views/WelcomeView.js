/*
 * Developed by Prishan Maduka on 3/29/22, 3:04 PM
 * Last modified 3/29/22, 3:04 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React, {useEffect,useRef} from 'react';
import {View,Animated,StyleSheet} from 'react-native';
import {Actions} from "react-native-router-flux";
import {viewStyles} from "../styles/AppStyles";

const WelcomeView = () => {

    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        setTimeout(()=>{
            Actions.home();
        },2600)
    },[])

    const onLoad = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();
    };

    return(
        <View style={viewStyles.parentViewStyle}>

            <Animated.Image
                source={require('../assets/images/icon_logo.webp')}
                resizeMode='contain'
                onLoad={onLoad}
                style={[welcomeStyles.logoStyle,{
                    opacity : opacity
                }]}
            />

        </View>
    )
}

export default WelcomeView;

const welcomeStyles = StyleSheet.create({
    logoStyle : {
        height : '25%',
        width : '70%'
    }
})
