import React from 'react';
import { AppRegistry, View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';
import BooksScreen from './components/BooksScreen';
import BookDetailScreen from './components/BookDetailScreen';
import AddBookScreen from './components/AddBookScreen';
import EditBookScreen from './components/EditBookScreen';
// import RegistrationScreen from './components/RegistrationScreen';
import GeneralScreen from "./components/GeneralScreen";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import { ApolloProvider } from 'react-apollo';
import {ApolloLink, concat, from} from "apollo-link";
import { setContext } from "apollo-link-context";
import Storage from  './src/services/storageService';
import { RegistrationScreen } from "./src/screens";

import { ApolloProvider } from '@apollo/react-hooks';
import {ThemeProvider } from 'react-native-elements';
import {NavigationContainer} from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {styles} from "./src/screens/RegistrationScreen/styles";
import {LinearGradient} from "expo-linear-gradient";
import { IconBigSearch } from './src/assets/icons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', overflow:'visible' }}>
            <LinearGradient
                style={{flex: 1, width: '100%',overflow:'visible' }}
                colors={['#EDE8F7', '#F2F2F2']}
            >
                <View style={{height:70, width: '100%'}}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1 }}
                            >
                                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        style={{position: 'absolute', alignSelf: 'center', top:-35}}
                        onPress={()=> {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: state.routes[0].key,
                            });
                            navigation.navigate(state.routes[0].name);
                        }}
                    >
                        <IconBigSearch/>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}


// {
//   Register: {
//     screen: RegistrationScreen,
//   },
//   General: {screen: GeneralScreen},
//   Book: { screen: BooksScreen },
//   BookDetails: { screen: BookDetailScreen },
//   AddBook: { screen: AddBookScreen },
//   EditBook: { screen: EditBookScreen },
// }


const authMiddleware = setContext(async (req, { headers }) => {
  const token =  await Storage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});

const httpLink = new HttpLink({ uri: 'https://cryptic-stream-90985.herokuapp.com/' });


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink])
});

// const MyRootComponent = createCompatNavigatorFactory;

const HomeStackScreen = () => {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} >
            <Tab.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Tab.Screen name="GeneralScreen" component={GeneralScreen} />
        </Tab.Navigator>
    )
};

const HomeStackScreen2 = () => {
    return (
        <Tab.Navigator
            tabBar={props => <MyTabBar {...props}/>}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{backgroundColor: "black", height: 40}}
        >
            <Tab.Screen name="GeneralScreen" component={GeneralScreen} style={{backgroundColor: "black", height: 40}} />
            <Tab.Screen name="RegistrationScreen" component={RegistrationScreen} style={{backgroundColor: "black", height: 40}} />
        </Tab.Navigator>
    )
};

const App = () => (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Register"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#EDE8F7',
                    height: Platform.select({ ios: 0, android: 56 }),
                  }
                }}
            >
              <Stack.Screen
                  name="Register"
                  component={HomeStackScreen2}
                  options={{ title: 'Register', backgroundColor: '#EDE8F7'}}
              />
              <Stack.Screen
                  name="GeneralScreen"
                  component={GeneralScreen}
                  options={{ title: 'GeneralScreen',backgroundColor: 'white', }}
              />
              <Stack.Screen
                  name="BooksScreen"
                  component={BooksScreen}
                  options={{ title: 'BooksScreen' }}
              />
              <Stack.Screen
                  name="BookDetailScreen"
                  component={BookDetailScreen}
                  options={{ title: 'BookDetailScreen' }}
              />
              <Stack.Screen
                  name="AddBookScreen"
                  component={AddBookScreen}
                  options={{ title: 'AddBookScreen' }}
              />
              <Stack.Screen
                  name="EditBookScreen"
                  component={EditBookScreen}
                  options={{ title: 'EditBookScreen' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
        </SafeAreaProvider>
      </ApolloProvider>
);

AppRegistry.registerComponent('MyApp', () => App);

export default App;