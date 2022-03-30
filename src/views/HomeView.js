/*
 * Developed by Prishan Maduka on 3/29/22, 3:04 PM
 * Last modified 3/29/22, 3:04 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React, {useEffect, useRef, useState} from 'react';
import {View,Animated,StyleSheet,BackHandler,Platform,FlatList,Text,Image,TouchableOpacity} from 'react-native';
import {Actions} from "react-native-router-flux";
import {viewStyles} from "../styles/AppStyles";
import NavigationBar from "../components/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {getMusicVideosList, resetMusicList} from "../redux/actions/MusicAction";
import Loader from "../components/Loader";
import {componentDimensions, fontDimensions} from "../styles/Dimensions";
import AutocompleteTags from "react-native-autocomplete-tags";
import {appColors} from "../styles/Colors";
import { Searchbar } from 'react-native-paper';
import VideoCardItem from "../components/VideoCardItem";

const HomeView = () => {

    const dispatch = useDispatch();

    const [genres,setGenres] = useState([]);
    const [musicVideos,setMusicVideos] = useState([]);
    const [tags,setTags] = useState([{id:-1,name:'All Genres'}]);
    const [searchQuery,setSearchQuery] = useState('');

    const fetchingData = useSelector(state => state.musicReducer.fetchingData);
    const musicVideosList = useSelector(state => state.musicReducer.musicVideosList);
    const retrievingVideosError = useSelector(state => state.musicReducer.retrievingVideosError);

    useEffect(()=>{
        dispatch(getMusicVideosList());
        BackHandler.addEventListener('androidBackPress',backPressed);
        return () => {
            dispatch(resetMusicList());
            BackHandler.removeEventListener('androidBackPress', backPressed);
        }
    },[]);

    const backPressed = () => {
        if(Platform.OS === 'android' && Actions.currentScene === 'home'){
            BackHandler.exitApp();
        }
    }

    useEffect(()=>{
        if(musicVideosList){
            if(musicVideosList.genres && musicVideosList.genres.length){
                setGenres(musicVideosList.genres);
            }
            if(musicVideosList.videos && musicVideosList.videos.length){
                setMusicVideos(musicVideosList.videos);
            }
        }
    },[musicVideosList]);

    useEffect(()=>{
        if(retrievingVideosError){

        }
    },[retrievingVideosError]);

    const renderTag = (tag) => {
        return(
            <TouchableOpacity style={styles.tagStyle}
                              onPress={()=>{
                                  setTags(tags.filter(genreItem => genreItem !== tag))
                              }}>
                <Text style={styles.tagText}>
                    {tag.name}
                </Text>
                <Image source={require('../assets/images/cancel.png')}
                       style={styles.imageStyle}
                       resizeMode={'contain'} />
            </TouchableOpacity>
        )
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    }

    return(
        <View style={[viewStyles.parentViewStyle,{alignItems: 'stretch'}]}>

            <NavigationBar />

            <Loader loading={fetchingData} />


            <View style={{flex:1,padding:componentDimensions.viewPadding}} >

                <Searchbar
                    style={styles.searchBarStyle}
                    inputStyle={styles.searchBarInputStyle}
                    placeholder="Search Songs"
                    placeholderTextColor={appColors.primaryColor}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon={({size, color, direction})=>(
                        <Image source={require('../assets/images/search.png')}
                               style={styles.imageStyle} />
                    )}
                    iconColor={appColors.primaryColor}
                    clearIcon={require('../assets/images/cancel.png')}
                />

                <View style={{flexDirection:'row',zIndex: 2000,marginVertical:componentDimensions.marginXXXL}}>

                    <Image source={require('../assets/images/filter.png')}
                           resizeMode={'contain'}
                           style={[styles.imageStyle,{marginRight:componentDimensions.marginMedium,marginTop:(componentDimensions.cellSizeSmall - componentDimensions.supplementaryIconSize + componentDimensions.marginMedium )/2}]} />

                    <View style={{flex:1}}>

                        <AutocompleteTags tags={tags}
                                          containerStyle={[styles.autoCompleteContainerStyle,{borderColor : tags.length ? 'transparent' : appColors.secondaryColor}]}
                                          renderTag={renderTag}
                                          onSuggestionPress={(suggestion)=>{
                                              if(!tags.length){
                                                  setTags([suggestion]);
                                              } else if(!tags.find(genreItem => genreItem.name === suggestion.name)){
                                                  setTags(tagList=>[...tagList,suggestion]);
                                              }
                                          }}
                                          onChangeTags={(allTags)=>{
                                              //console.log('tt',allTags);
                                              //setTags(allTags);
                                          }}
                                          labelExtractor={(item)=>item.name}
                                          suggestions={genres}
                                          inputProps={{placeholder:tags.length ? (tags.length === 1 && tags[0].id === -1 ? 'Search genres ...' :'') : 'Type Here to Filter Genre',placeholderTextColor:appColors.grayColorVariant5,selectionColor:appColors.grayColorVariant5}}
                                          inputStyle={{height:componentDimensions.cellSizeSmall,fontSize:fontDimensions.fontSmall}}
                                          allowCustomTags={false} flatListStyle={{maxHeight:2000}}/>

                    </View>

                </View>

                <FlatList data={musicVideos}
                          renderItem={({item,index})=><VideoCardItem musicItem={item} index={index}/>}
                          keyExtractor={musicItem=>musicItem.id} />





            </View>

        </View>
    )

}

export default HomeView;

const styles = StyleSheet.create({
    autoCompleteContainerStyle : {
        backgroundColor:'transparent',
        borderRadius:25,
        borderWidth:1,
        padding:4,
        zIndex: 2000,
    },
    tagStyle : {
        height:componentDimensions.cellSizeSmall,
        borderRadius: (componentDimensions.cellSizeSmall)/2,
        backgroundColor: appColors.secondaryColor,
        paddingHorizontal:componentDimensions.marginMedium,
        alignItems:'center',
        justifyContent:'center',
        margin:componentDimensions.marginXSmall,
        flexDirection:'row'
    },
    tagText : {
        color:appColors.primaryColor,
        marginRight:componentDimensions.marginMidXSmall,
        fontSize:fontDimensions.fontSmall
    },
    imageStyle : {
        height : componentDimensions.supplementaryIconSize,
        width : componentDimensions.supplementaryIconSize
    },
    searchBarInputStyle : {
        height:componentDimensions.cellSizeMedium,
        fontSize: fontDimensions.fontMidMedium,
        alignSelf:'center',
        color:appColors.primaryColor
    },
    searchBarStyle : {
        backgroundColor:appColors.grayColorVariant2,
        height:componentDimensions.cellSizeMedium,
        borderRadius:(componentDimensions.cellSizeMedium/2)
    }
})

