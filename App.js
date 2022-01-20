import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import Banner from './components/banner';
import Body from './components/body';
import Input from './components/input';

export default function App() {
    const [ready, setReady] = useState(false);
    const [tasks, setTasks] = useState(
/*         [
            { key: 1, task: "ABC", status: false},
            { key: 2, task: "XYZ", status: false},
            { key: 3, task: "LALALL", status: true},
            { key: 4, task: "SomeThing.....", status: false},
        ]  */
    );

    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem('@tasker');
            if(data !== null)
                setTasks(JSON.parse(data))
            else
                setTasks([]);
        } catch (error) {
            console.log(error)
        }
    };

/*     useEffect(() => {
        setTasks(getData)
    }, []); */

    const handleSetTask = (newState) => {
        setTasks(newState);
    };

    if(!ready) {
        return (
            <AppLoading
                startAsync={getData}
                onFinish={() => setReady(true)}
                onError={console.warn}
            />
        )
    }
    else return(
        <View style={styles.mainContainer}>
            <StatusBar style="white" backgroundColor='black' />
            <Banner />
            <Body list={tasks} setList={handleSetTask}/>
            <Input list={tasks} setList={handleSetTask}/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
});