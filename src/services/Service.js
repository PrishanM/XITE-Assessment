/*
 * Developed by Prishan Maduka on 3/29/22, 3:00 PM
 * Last modified 3/29/22, 3:00 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import Axios from "axios";
import {REQUEST_CONFIG} from "../utils/Constants";


const dispatchSuccess = (dispatch,actionType,data) => {
    dispatch({
        type: actionType,
        payload: data,
    });
};

const dispatchFailed = (dispatch, actionType , error) => {
    dispatch({
        type: actionType,
        payload: error,
    });
};

export const httpGET = (url,actionTypes,logTag) => {
    return async dispatch => {

        dispatch({type:actionTypes.ACTION_REQUEST});

        Axios.get(url,REQUEST_CONFIG)
            .then(response => {

                if(response.status === 200 ){
                    dispatchSuccess(dispatch,actionTypes.ACTION_SUCCESS,response.data);
                } else {
                    console.log(logTag + ' Error',' Error');
                    dispatchFailed(dispatch,actionTypes.ACTION_FAILED,'ERROR');
                }
            })
            .catch(error=>{
                if(error.response){
                    console.log('ERROR RESPONSE ' + logTag ,error.response);
                    dispatchFailed(dispatch,actionTypes.ACTION_FAILED,error.response.toString());
                } else {
                    console.log('ERROR RESPONSE ' + logTag ,error);
                    dispatchFailed(dispatch,actionTypes.ACTION_FAILED,'ERR_INTERNAL_SERVER');
                }
            })

    }

}

export const httpPOST = (url,actionTypes,logTag,data) => {
    console.log('REQUEST BODY ' + logTag ,data);
    return async dispatch => {
        dispatch({type:actionTypes.ACTION_REQUEST});

        Axios.post(url,data,REQUEST_CONFIG)
            .then(response => {
                console.log('SUCCESS RESPONSE ' + logTag ,response);
                if(response.status === 200 ){
                    dispatchSuccess(dispatch,actionTypes.ACTION_SUCCESS,response.data);
                } else {
                    console.log(logTag + ' Error',' Error');
                    dispatchFailed(dispatch,actionTypes.ACTION_FAILED,'ERROR');
                }
            })
            .catch(error=>{
                console.log('Error ' + logTag ,error);
                dispatchFailed(dispatch,actionTypes.ACTION_FAILED,'ERR_INTERNAL_SERVER');
            })

    }

}
