import React from "react";
import {Image, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon: {
        marginTop: 'auto',
    }
});

export default () => <Image source={require('./IconWaves.png')} style={styles.icon}/>