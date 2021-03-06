/*
 * Developed by Prishan Maduka on 3/29/22, 5:49 PM
 * Last modified 3/29/22, 5:49 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React from "react";
import {Image, StyleSheet, TouchableOpacity, View,StatusBar} from "react-native";
import {appColors} from "../styles/Colors";
import {componentDimensions, statusBarHeight} from "../styles/Dimensions";
import {Actions} from "react-native-router-flux";

const NavigationBar = () => {

    return(
        <View style={{alignItems:'stretch',justifyContent:'center'}}>

            <View style={{ backgroundColor:  appColors.blackColor , height:statusBarHeight}}>
                <StatusBar translucent backgroundColor={'transparent'}
                           barStyle={'light-content'} />
            </View>

            <View style={[navBarStyle.mainViewStyle,{backgroundColor: appColors.primaryColorDark}]}>

                <View style={navBarStyle.logoContainer}>

                    <Image source={require('../assets/images/xite_logo_transparent.png')}
                           style={navBarStyle.navigationLogo}
                           resizeMode={'contain'} />

                </View>

                <TouchableOpacity style={navBarStyle.refreshLogo} onPress={()=>{Actions.refresh({key: Math.random()})}}>

                    <Image source={require('../assets/images/refresh.png')}
                           style={navBarStyle.refreshLogo}
                           resizeMode={'contain'} />

                </TouchableOpacity>

            </View>


        </View>
    )

}

export default NavigationBar;

const navBarStyle = StyleSheet.create({
    mainViewStyle : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        paddingHorizontal : componentDimensions.viewPadding,
        height : componentDimensions.navBarHeight
    },
    navigationLogo : {
        height : componentDimensions.smallLogoSize,
        width : componentDimensions.smallLogoSize
    },
    logoContainer : {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: componentDimensions.cellSize,
        flex:1
    },
    refreshLogo : {
        height:componentDimensions.xSmallIconSize,
        width:componentDimensions.xSmallIconSize
    }

})
