/*
 * Developed by Prishan Maduka on 3/31/22, 2:50 AM
 * Last modified 3/31/22, 2:50 AM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React, {useEffect, useRef} from 'react';
import { Image, Text,View,StyleSheet,Animated} from 'react-native';
import {componentDimensions, fontDimensions} from "../styles/Dimensions";
import {appColors} from "../styles/Colors";

const ANIMATION_DURATION = 700;

const VideoCardItem = (props) => {

    let animated = useRef(new Animated.Value(0));

    useEffect(()=>{

        animated.current.setValue(0);

        Animated.timing(animated.current, {
            toValue: 1,
            useNativeDriver: true,
            duration: ANIMATION_DURATION,
        }).start();
    },[]);

    const rowStyles = [
        musicItemStyles.row,
        {
            opacity: animated.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, componentDimensions.musicCardHeight],
                extrapolate: 'clamp',
            }),
        },
        {
            transform: [
                { scale: animated.current },
                {
                    rotate: animated.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['35deg', '0deg'],
                        extrapolate: 'clamp',
                    })
                }
            ],
        },
    ];

    return (
        <Animated.View style={rowStyles}>
            <Image source={{uri:props.musicItem.image_url}}
                   style={musicItemStyles.videoThumb}
                   resizeMode={'cover'} />

            <View style={musicItemStyles.detailContainer}>
                <Text style={musicItemStyles.titleText}>
                    {props.musicItem.title}
                </Text>
                <Text style={musicItemStyles.artistText}>
                    {'by '+props.musicItem.artist}
                </Text>

                <View style={musicItemStyles.releaseDateContainer}>

                    <Text style={{fontSize:fontDimensions.fontSmall,color:appColors.grayColorVariant5}}>
                        {'Released on : '}
                    </Text>
                    <Text style={musicItemStyles.releaseYearText}>
                        {props.musicItem.release_year}
                    </Text>

                    {/*<View style={{flex:1,height:'100%',justifyContent:'flex-end'}}>
                           <Text style={{fontSize:fontDimensions.fontSmall,color:appColors.grayColorVariant5,fontWeight:'bold'}}>
                               {'Released on:'}
                           </Text>
                           <Text style={{fontSize:fontDimensions.fontSmall,color:appColors.grayColorVariant5,fontWeight:'bold'}}>
                               {musicItem.release_year}
                           </Text>
                       </View>*/}


                    {/*<Text style={{height:28,borderRadius:15,backgroundColor:color,textAlign:'center',textAlignVertical:'center',paddingHorizontal:10,fontSize:fontDimensions.fontXSmall,width:genre && genre.name && genre.name.length < 7 ? 50 : null,fontWeight:'bold',fontStyle:'italic'}}>
                           {genre && genre.name ? genre.name : 'Other'}
                       </Text>*/}

                </View>
            </View>

            <Text style={[musicItemStyles.genreView,{width:props.genre && props.genre.name && props.genre.name.length < 7 ? 50 : null}]}>
                {props.genre && props.genre.name ? props.genre.name : 'Other'}
            </Text>
        </Animated.View>
    );
}

export default VideoCardItem;

const musicItemStyles = StyleSheet.create({
    row : {
        flexDirection: 'row',
        height:componentDimensions.musicCardHeight,
        backgroundColor:appColors.primaryColorDark,
        width:'100%',
        borderWidth:1,
        borderRadius:componentDimensions.borderRadius,
        borderColor:appColors.secondaryColor,
        marginBottom:componentDimensions.marginXXXL
    },
    videoThumb : {
        height:(componentDimensions.musicCardHeight-3),
        width:178,
        borderBottomLeftRadius:componentDimensions.borderRadius,
        borderTopLeftRadius:componentDimensions.borderRadius
    },
    detailContainer : {
        flex:1,
        paddingVertical:componentDimensions.marginSmall,
        paddingHorizontal:componentDimensions.marginMedium,
        justifyContent:'space-between'
    },
    titleText : {
        fontWeight:'bold',
        fontSize:fontDimensions.fontMidSmall,
        color:appColors.secondaryColor
    },
    artistText : {
        fontSize:fontDimensions.fontSmall,
        color:appColors.grayColorVariant2
    },
    releaseDateContainer : {
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    releaseYearText : {
        fontSize:fontDimensions.fontSmall,
        color:appColors.grayColorVariant2,
        fontWeight:'bold',
        fontStyle:'italic'
    },
    genreView:{
        height:28,
        borderRadius:15,
        backgroundColor:appColors.genreVariant1,
        textAlign:'center',
        textAlignVertical:'center',
        paddingHorizontal:10,
        fontSize:fontDimensions.fontXSmall
        ,fontWeight:'bold',
        fontStyle:'italic',
        position:'absolute',
        bottom:8,
        left:8
    }
});
