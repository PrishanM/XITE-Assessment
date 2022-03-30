/*
 * Developed by Prishan Maduka on 3/29/22, 2:58 PM
 * Last modified 3/29/22, 2:58 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import {appURLs} from "../../configurations/URLConfigurations";
import {httpGET} from "../../services/Service";
import {actionTypes} from "../ActionTypes";

export const getMusicVideosList = () => {

    const URL = appURLs.BASE_URL + appURLs.GET_VIDEOS_LIST;

    return httpGET(URL,actionTypes.getMusicListRequest,'REQUEST VIDEOS LIST');
}

export const resetMusicList = () => {
    return{
        type : actionTypes.getMusicListRequest.ACTION_RESET
    }
}

