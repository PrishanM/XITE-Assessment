/*
 * Developed by Prishan Maduka on 3/29/22, 3:46 PM
 * Last modified 3/29/22, 3:46 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import {appColors} from "./Colors";
import {fontDimensions,componentDimensions} from "./Dimensions";
import {Platform} from "react-native";
import {FONT_WEIGHT} from "../utils/Constants";

/**
 *
 * @param color - COLOR from Colors.js
 * @param fontWeight - FONT_WEIGHT_BOLD, FONT_WEIGHT_LIGHT, FONT_WEIGHT_MEDIUM, FONT_WEIGHT_REGULAR, FONT_WEIGHT_SEMI_BOLD
 * @param fontSize - Font Dimensions from Dimensions.js
 * @returns {{fontFamily: string, color: string, fontSize: number}}
 */
export function getFontStyle(color=appColors.blackColor,fontWeight='Roboto-Regular',fontSize=fontDimensions.fontMidSmall){

    return {
        color : color,
        fontFamily : fontWeight === FONT_WEIGHT.FONT_WEIGHT_BOLD ? 'Roboto-Bold' :
                fontWeight === FONT_WEIGHT.FONT_WEIGHT_MEDIUM ? 'Roboto-Medium' :
                        'Roboto-Regular',
        fontSize: fontSize
    }
}

export const viewStyles = {
    parentViewStyle : {
        flex:1,
        backgroundColor:appColors.primaryColor,
        justifyContent:'center',
        alignItems:'center'
    }
}
