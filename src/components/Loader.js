/*
 * Developed by Prishan Maduka on 3/30/22, 1:56 PM
 * Last modified 3/30/22, 1:56 PM
 * Copyright (c) 2022. All rights reserved Prishan Maduka
 */

import React from 'react';
import {Modal, View, StyleSheet, ActivityIndicator} from 'react-native';
import {appColors} from '../styles/Colors';

const Loader = (props) => {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={props.loading}>

            <View style={styles.modalBackground}>

                <ActivityIndicator
                    color={appColors.secondaryColor}
                    size={'large'}
                    animating={props.loading} />

            </View>
        </Modal>
    )
}

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    }
});
