import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import MainHome from './elements/Home/MainHome'
import MainSetting from './elements/Setting/MainSetting'

const Tab = createBottomTabNavigator();
export default class App extends React.Component {
    render() { 
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={stylesNavigation}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={MainHome} />
                    <Tab.Screen name="Settings" component={MainSetting} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const stylesNavigation = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
            iconName = focused
                ? 'home'
                : 'home-outline';
        } else if (route.name === 'Settings') {
            iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted-square';
        }

        // You can return any component that you like here!
        return <MCIcons name={iconName} size={size} color={color} />;
    },
})