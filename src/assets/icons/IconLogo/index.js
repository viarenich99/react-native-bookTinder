import React from "react";
import {Image, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon: {
        marginTop: 30,
        marginBottom: 40,
    }
});

export default () => <Image source={require('./logo.png')} style={styles.icon}/>

