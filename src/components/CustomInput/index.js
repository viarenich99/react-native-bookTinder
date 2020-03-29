import { Input } from 'react-native-elements';
import React from "react";

export const CustomInput = (props) => {
    const {value, onChangeText, leftIcon, secureTextEntry = false, placeholder} = props;

    return (<Input
        placeholder={placeholder}
        leftIcon={leftIcon}
        inputContainerStyle={{
            borderBottomColor: 'white',
            borderColor: 'white',
            borderBottomWidth: 2,
            paddingBottom: 0,
        }}
        leftIconContainerStyle={{
            paddingRight:10
        }}
        inputStyle= {{
            fontSize: 16,
            color: '#503E9D',
        }}
        containerStyle={{
            width: '80%',
            marginBottom: 28,
        }}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
    />)


};