/*
 * Developed by Prishan Maduka on 3/29/22, 2:58 PM
 * Last modified 3/29/22, 2:58 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import {actionTypes} from "../ActionTypes";

const initialState = {
    fetchingData : false,
    musicVideosList : null,
    retrievingVideosError : ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.getMusicListRequest.ACTION_REQUEST :
            return {
                ...state,
                fetchingData: true,
                musicVideosList: null,
                retrievingVideosError: ''
            }
        case actionTypes.getMusicListRequest.ACTION_SUCCESS :
            return {
                ...state,
                fetchingData: false,
                musicVideosList: action.payload
            }
        case actionTypes.getMusicListRequest.ACTION_FAILED :
            return {
                ...state,
                fetchingData: false,
                retrievingVideosError: action.payload
            }
        case actionTypes.getMusicListRequest.ACTION_RESET :
            return {
                ...state,
                fetchingData: false,
                musicVideosList: null,
                retrievingVideosError: ''
            }
        default:
            return state;
    }
}

