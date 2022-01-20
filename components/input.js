import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
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
        var newTasks = [...props.list, { key: props.list.length + 1, task: inputVal, status: false }];
        storeData(newTasks).then(props.setList(newTasks));
    };

    return(
        <View style={styles.inputContainer}>
            <TextInput
                onChangeText={(val) => setInputVal(val)}
                placeholder='Enter new task'
                placeholderTextColor='#7e7e7e'
                style={styles.inputField} />
            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={addNewTask}
            >
                <MaterialIcons
                    name='add'
                    size={'175%'}
                    color={'white'}
                    style={styles.addButton}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 0.7,
        flexDirection: 'row',
        backgroundColor: 'yellow'
    },
    inputField: {
        flex: 9,

        margin: 3,
        paddingHorizontal: 10,

        borderRadius: 50,

        color: 'white',
        backgroundColor: '#2e2e2e'
    },
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        marginHorizontal: 3,

    },
    addButton: {
        padding: 2,
        
        borderRadius: '100%',

        backgroundColor: '#3e3e3e',
    },
});