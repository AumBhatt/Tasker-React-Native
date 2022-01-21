import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const storeData = async (data) => {
    try {
        AsyncStorage.setItem('@tasker', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
};

export default function input(props) {
    const [inputVal, setInputVal] = useState('');

    const addNewTask = () => {
        if(inputVal !== '') {
            var newTasks = [...props.list, { key: props.list.length + 1, task: inputVal, status: false }];
            storeData(newTasks).then(props.setList(newTasks)).then(setInputVal(''));
        }
    };

    return(
        <View style={styles.inputContainer}>
            <TextInput
                onChangeText={(val) => setInputVal(val)}
                value={inputVal}
                placeholder='Enter new task'
                placeholderTextColor='#7e7e7e'
                style={styles.inputField} />
            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={addNewTask}
            >
                <MaterialIcons
                    name='add'
                    size={25}
                    color={'white'}
                    style={styles.addButton}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        zIndex: 999,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputField: {
        flex: 9,

        margin: 3,
        padding: 10,

        borderRadius: 50,

        color: 'white',
        backgroundColor: '#2e2e2e'
    },
    addButtonContainer: {
        width: 40,
        height: 40, 
        alignItems: 'center',
        justifyContent: 'center',

        margin: 3,

        borderRadius: 500,

        backgroundColor: '#3e3e3e',

    },
});