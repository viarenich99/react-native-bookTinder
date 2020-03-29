import React from "react";
import {Image, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon: {
        minWidth:25,
        maxWidth:25
    }
});

export default () => <Image source={require('./password.png')} style={styles.icon}/>