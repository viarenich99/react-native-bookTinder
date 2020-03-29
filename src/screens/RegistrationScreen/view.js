import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ImageBackground, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import { Storage }  from '../../index';
import { useMutation } from "@apollo/react-hooks";
import { CustomInput } from '../../components';
import {
    IconUser,
    IconLogo,
    IconAt,
    IconPassword,
    IconWaves,
} from '../../assets/icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { CREATE_ACCOUNT } from './qqls';
import { styles } from "./styles";

function RegistrationScreen(props) {
    const [createUser, { loading, error, data } ] = useMutation(CREATE_ACCOUNT);
    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    if (loading) return(
        <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    );
    if (error) return(
        <View style={styles.activity}>
            <Text>`Error! ${error.message}`</Text>
        </View>
    );

    const onPress = () => {
        createUser({
            variables: {
                name,
                email,
                password,
            }
        }).then( res => {
            const token = res.data.createUser.token;
            if(token) {
                Storage.setItem('token', token).then( r => props.navigation.navigate('GeneralScreen', {}));
            }

        }).catch(err=>{
            Storage.removeItem('token');
            console.log(err,'err');
        })
    }

    return (
        <SafeAreaConsumer>
            {
                ()=>
                    <View style={styles.View} >
                        <LinearGradient
                            style={styles.LinearGradient}
                            colors={['#EDE8F7', '#F2F2F2']}
                        >
                            <IconLogo/>
                            <CustomInput
                                placeholder = 'Логин'
                                leftIcon = {<IconUser/>}
                                onChangeText = {text => onChangeName(text)}
                                value = {name}
                            />
                            <CustomInput
                                placeholder = 'E-mail'
                                leftIcon = {<IconAt/>}
                                onChangeText = {text => onChangeEmail(text)}
                                value = {email}
                            />
                            <CustomInput
                                placeholder = 'Пароль'
                                leftIcon = {<IconPassword/>}
                                onChangeText={text => onChangePassword(text)}
                                value={password}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity
                                style={styles.submitLogin}
                                onPress={onPress}
                            >
                                <Text style={styles.loginText}>Регистрация</Text>
                            </TouchableOpacity>
                            <IconWaves/>
                        </LinearGradient>
                    </View>
            }
        </SafeAreaConsumer>
    )
}

export default RegistrationScreen;