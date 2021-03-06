import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const storeData = async (data) => {
    try {
        AsyncStorage.setItem('@tasker', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
};

export default function body(props) {
    const changeTaskStatus = (itemKey) => {
        var newTasks = props.list.map((item) => (
                            item = { key: item.key, task: item.task, status: (item.key === itemKey) ? !item.status : item.status }
                        ));
        
        storeData(newTasks).then(props.setList(newTasks));
    };

    const removeTask = (itemKey) => {
        var newTasks = props.list.filter((item) => item.key !== itemKey);
        storeData(newTasks).then(props.setList(newTasks));
    };

    const displayTasks = ({ item }) => (
        <TouchableOpacity
            style={[styles.taskItem, (item.status) ? styles.taskComplete : styles.taskIncomplete ]}
            onPress={() => changeTaskStatus(item.key)}
        >
            <MaterialIcon
                name={(item.status) ? 'check-box' : 'check-box-outline-blank'}
                color={'white'}
                size={22}
            />
            <Text style={styles.taskText}>{item.task}</Text>
            <TouchableOpacity
                onPress={() => {removeTask(item.key)}}
            >
                <MaterialIcon
                    name='close'
                    color={'white'}
                    size={22}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
    return (
        <View style={styles.bodyContainer}>
            <Text style={
                [
                    styles.noTasksMessage, 
                    {opacity: ((props.list.length === 0) ? 1 : 0)}
                ]}>Hooray!!! No pending tasks....</Text>
            <FlatList
                data={props.list}
                keyExtractor={(item) => item.key}
                renderItem={displayTasks}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 9,
        justifyContent: 'center',
        maxHeight: (Dimensions.get('window').height)*0.85,

    },
    taskItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        margin: 10,
        marginHorizontal: 15,
        padding: 10,

        borderRadius: 10, 

    },
    taskText: {
        width: '80%',
        height: '100%',

        padding: 5,

        fontSize: 22,
        fontFamily: 'Raleway_300Light',
        color: 'white',
    },

    taskComplete: {
        backgroundColor: '#10ac84'
    },
    taskIncomplete: {
        backgroundColor: '#131313'
    },
    noTasksMessage: {
        position: 'absolute',
        width: '100%',
        top: '50%',

        textAlign: 'center',
        textAlignVertical: 'center',

        fontFamily: 'Raleway_400Regular',
        color: '#3e3e3e',
    },
});