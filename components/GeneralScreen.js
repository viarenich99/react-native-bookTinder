import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import { useQuery } from "@apollo/react-hooks";

const GET_ME = gql`
    query me {
        me {
            id,
            name,
            email,
            password,
        }
    }
`;

function GeneralScreen(props) {
 const {loading, error, data } = useQuery(GET_ME);
 console.log(data,'data');
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
    if (error) console.log(error,'error');
    if(data) console.log(data,'me');
    return (
        <Text>{data.me.name}</Text>
    )
}

// class GeneralScreen extends Component {
//     static navigationOptions = {
//         title: 'General Screen',
//     };
//
//     state = {};
//
//     render() {
//         return (
//                 <Query query={GET_ME}>
//                     {({loading, error, data }) => {
//                         if (loading) return(
//                             <View style={styles.activity}>
//                                 <ActivityIndicator size="large" color="#0000ff"/>
//                             </View>
//                         );
//                         if (error) return(
//                             <View style={styles.activity}>
//                                 <Text>`Error! ${error.message}`</Text>
//                             </View>
//                         );
//                         if (error) console.log(error,'error');
//                         if(data) console.log(data,'me');
//                         return (
//                             <Text>{data.me.name}</Text>
//                         )
//                     }}
//                 </Query>
//         )
//     }
// }


const styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default GeneralScreen;