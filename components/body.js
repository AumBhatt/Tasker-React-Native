import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
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
        props.setList(
            props.list.map((item) => (
                item = { key: item.key, task: item.task, status: (item.key === itemKey) ? !item.status : item.status }
            ))
        );
    };

    const removeTask = (itemKey) => {
        props.setList(
            props.list.filter((item) => item.key !== itemKey)
        );
    };

    const displayTasks = ({ item }) => (
        <TouchableOpacity
            style={styles.taskItem}
            onPress={() => changeTaskStatus(item.key)}
        >
            <MaterialIcon
                name={(item.status) ? 'check-box' : 'check-box-outline-blank'}
                color={'white'}
                size="150%"
            />
            <Text style={styles.taskText}>{item.task}</Text>
            <TouchableOpacity
                onPress={() => {removeTask(item.key)}}
            >
                <MaterialIcon
                    name='close'
                    color={'white'}
                    size="150%"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
    return (
        <View style={styles.bodyContainer}>
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
        backgroundColor: 'green'
    },
    taskItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        margin: 10,
        padding: 2,
        paddingVertical: 3,

        backgroundColor: 'blue'
    },
    taskText: {
        width: '100%',

        margin: 5,

        fontSize: 'larger',
        color: 'white',
        backgroundColor: 'red'
    },
});