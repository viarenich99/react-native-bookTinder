import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    TextInput,
    Text,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import Storage from '../src/services/storageService';

// {
//     name: "valery",
//         email: "v@g.com",
//     IconPassword: "Qwerty123"
// }

const CREATE_ACCOUNT = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(
            data: {
                name: $name,
                email: $email,
                password: $password   
            }
        ) {
            token
            user {
                id
                name
                email
                password
            }
        }
    }
`;


class RegistrationScreen extends Component {
    static navigationOptions = {
        title: 'REGISTRATION SCREEN',
    };

    state = {};

    render() {
        return (
                <Mutation mutation={CREATE_ACCOUNT} s>
                    {(createUser, { loading, error }) => {
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
                        return (
                            <View style={styles.View}>
                                <TouchableOpacity
                                    style={styles.submitLogin}
                                    title="Log In"
                                    onPress={() => {
                                        createUser({
                                            variables: {
                                                name: "valerycc",
                                                email: "m0dsaswdasdasqwddawd0@g.com",
                                                password: "Qwerty123"}
                                        }).then( res => {
                                            console.log(res,'res');
                                            const token = res.data.createUser.token;
                                            console.log(token,'token');
                                            Storage.setItem('token', token, () => {

                                            }).then( r =>this.props.navigation.navigate('General', {}));

                                        }).catch(err=>console.log(err));
                                    }}
                                >
                                    <Text style={styles.loginText}>Login In</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    }
                </Mutation>
        )
    }
}

const styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitLogin: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFDFD',
        borderRadius: 50,
        width:205,
        height:50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
    },
    loginText: {
        color: '#503E9D',
        fontWeight: "600",
        fontSize: 24,
        lineHeight: 29,
    },
    View: {
        alignItems: 'center',
        flex: 1,
        marginBottom: 20,
        padding: 5,
    }
});

export default RegistrationScreen;