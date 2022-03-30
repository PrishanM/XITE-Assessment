/*
 * Developed by Prishan Maduka on 3/31/22, 2:50 AM
 * Last modified 3/31/22, 2:50 AM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React from 'react';
import { Image, Text,View,StyleSheet} from 'react-native';
import {componentDimensions, fontDimensions} from "../styles/Dimensions";
import {appColors} from "../styles/Colors";

const VideoCardItem = ({musicItem,index}) => (
    <View style={{flexDirection: 'row',height:componentDimensions.musicCardHeight,backgroundColor:appColors.primaryColorDark,width:'100%',borderWidth:1,borderRadius:componentDimensions.borderRadius,borderColor:appColors.secondaryColor,marginBottom:20}}>
        <Image source={{uri:musicItem.image_url}}
               style={{height:(componentDimensions.musicCardHeight-3),width:178,borderBottomLeftRadius:componentDimensions.borderRadius,borderTopLeftRadius:componentDimensions.borderRadius}}
               resizeMode={'cover'} />

               <View style={{flex:1,paddingVertical:componentDimensions.marginSmall,paddingHorizontal:componentDimensions.marginMedium}}>
                    <Text style={{fontWeight:'bold',fontSize:fontDimensions.fontMidSmall,color:appColors.secondaryColor}}>
                        {musicItem.title}
                    </Text>
                   <Text style={{fontSize:fontDimensions.fontSmall,color:appColors.grayColorVariant2}}>
                       {'by '+musicItem.artist}
                   </Text>
               </View>
    </View>
);

export default VideoCardItem;
