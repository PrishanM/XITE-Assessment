/*
 * Developed by Prishan Maduka on 3/29/22, 3:04 PM
 * Last modified 3/29/22, 3:04 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React, {useEffect, useState} from 'react';
import {View,Animated,StyleSheet,BackHandler,Platform,Text,Image,TouchableOpacity} from 'react-native';
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
import { Button, Paragraph, Dialog} from 'react-native-paper';

const HomeView = () => {

    const dispatch = useDispatch();

    const [genres,setGenres] = useState([]);
    const [musicVideos,setMusicVideos] = useState([]);
    const [tags,setTags] = useState([{id:-1,name:'All Genres'}]);
    const [searchQuery,setSearchQuery] = useState('');
    const [searchedData,setSearchedData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    const [initialLoad,setInitialLoad] = useState(true);
    const [visibleErrorDialog,setVisibleErrorDialog] = useState(false);

    const fetchingData = useSelector(state => state.musicReducer.fetchingData);
    const musicVideosList = useSelector(state => state.musicReducer.musicVideosList);
    const retrievingVideosError = useSelector(state => state.musicReducer.retrievingVideosError);

    const scrollY = React.useRef(new Animated.Value(0)).current;

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
                setSearchedData(musicVideosList.videos);
                setFilteredData(musicVideosList.videos);
            }
        }
    },[musicVideosList]);

    useEffect(()=>{
        if(retrievingVideosError){
            setVisibleErrorDialog(true);
        }
    },[retrievingVideosError]);

    useEffect(()=>{
        if(initialLoad){
            setInitialLoad(false);
        } else if(tags.length === 1 && tags[0].id === -1){
            setFilteredData(searchedData);
        } else {
            let filteredResult = searchedData.filter(searchedItem => tags.some(genre=>genre.id === searchedItem.genre_id));
            console.log('TAGS changed',tags);
            console.log('FILTERED',filteredResult);
            setFilteredData(filteredResult);
        }

    },[tags]);

    const renderTag = (tag) => {
        return(
            <TouchableOpacity style={styles.tagStyle}
                              onPress={()=>{
                                  if(tag.id !== -1){
                                      if(tags.length === 1){
                                          setTags([{id:-1,name:'All Genres'}]);
                                      } else {
                                          setTags(tags.filter(genreItem => genreItem !== tag));
                                      }
                                  }

                              }}>
                <Text style={styles.tagText}>
                    {tag.name}
                </Text>

                {
                    tag.id !== -1 &&
                        <Image source={require('../assets/images/cancel.png')}
                               style={styles.imageStyle}
                               resizeMode={'contain'} />
                }

            </TouchableOpacity>
        )
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        let searchResults = musicVideos.filter( video =>
            (typeof video.title === 'string' && (video.title.toLowerCase()).includes(query.toLowerCase()))
                ||
            (typeof video.artist === 'string' && (video.artist.toLowerCase()).includes(query.toLowerCase()))
        );
        setSearchedData(searchResults);
        setFilteredData(searchResults);
        setTags([{id:-1,name:'All Genres'}]);
    }

    const onUpdateFilters = () => {

    }

    return(
        <View style={[viewStyles.parentViewStyle,{alignItems: 'stretch'}]}>

            <NavigationBar />

            <Loader loading={fetchingData} />

            <Dialog visible={visibleErrorDialog}
                    onDismiss={()=>{
                        setVisibleErrorDialog(false);
                    }} style={{width:'80%',alignSelf: 'center'}}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Error loading data. Please try again later.</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>{
                        setVisibleErrorDialog(false);
                    }} labelStyle={{color:appColors.secondaryColor}}>
                        GOT IT
                    </Button>
                </Dialog.Actions>
            </Dialog>


            <View style={{flex:1,padding:componentDimensions.viewPadding}} >

                <Searchbar
                    style={styles.searchBarStyle}
                    inputStyle={styles.searchBarInputStyle}
                    placeholder="Search Songs"
                    placeholderTextColor={appColors.primaryColor}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    icon={()=>(
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
                                              if(!tags.length || (tags.length === 1 && tags[0].id === -1)){
                                                  setTags([suggestion]);
                                              }else if(!tags.find(genreItem => genreItem.name === suggestion.name)){
                                                  setTags(tagList=>[...tagList,suggestion]);
                                              }
                                          }}
                                          onChangeTags={(allTags)=>{
                                              console.log('tt',allTags);
                                          }}
                                          labelExtractor={(item)=>item.name}
                                          suggestions={genres}
                                          inputProps={{placeholder:tags.length ? (tags.length === 1 && tags[0].id === -1 ? 'Search genres ...' :'') : 'Type Here to Filter Genre',placeholderTextColor:appColors.grayColorVariant5,selectionColor:appColors.grayColorVariant5}}
                                          inputStyle={{height:componentDimensions.cellSizeSmall,fontSize:fontDimensions.fontSmall}}
                                          allowCustomTags={false}
                                          flatListStyle={{maxHeight:2000}}/>

                    </View>

                </View>

                {
                    !initialLoad && !filteredData.length ?

                        <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
                            <Text style={{fontSize:fontDimensions.fontSmall, color:appColors.grayColorVariant2}}>
                                {'No Data Found!'}
                            </Text>
                        </View>

                        :

                        <Animated.FlatList data={filteredData}
                                           onScroll={Animated.event(
                                               [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                               { useNativeDriver: true }
                                           )}
                                           renderItem={({item})=>(
                                               <VideoCardItem musicItem={item}
                                                              genre={genres.find(genre => genre.id === item.genre_id)}/>
                                           )}
                                           keyExtractor={musicItem=>musicItem.id} />
                }





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

