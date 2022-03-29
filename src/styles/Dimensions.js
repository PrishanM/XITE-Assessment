/*
 * Developed by Prishan Maduka on 3/29/22, 3:25 PM
 * Last modified 3/29/22, 3:25 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, Platform, StatusBar} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";

export const {width, height}= Dimensions.get('window');
export const statusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export const fontDimensions = {
    //Font Sizes
    fontXSmall : RFValue(8),
    fontXMidSmall : RFValue(9),
    fontSmall : RFValue(10),
    fontMidSmall : RFValue(12),
    fontMidMedium : RFValue(14),
    fontMedium : RFValue(16),
    fontLarge : RFValue(18),
    fontXLarge : RFValue(20),
    fontXXL : RFValue(24),
    fontXXXL : RFValue(30),

    // Font Weights
    lightWeight : '200',
    regularWeight : '400',
    mediumWeight : '500',
    condensedBold : '700',
    boldWeight : '800'
}

export const componentDimensions = {
    viewPadding : '6%',
    logoHeight : 0.35*height,
    backIconSize : RFValue(20),
    xSmallIconSize : RFValue(20),
    smallLogoSize : RFValue(34),
    cellSize : RFValue(40),
    buttonHeight : RFValue(45),
    inputHeight : RFValue(50),
    navBarHeight : RFValue(64)
}
