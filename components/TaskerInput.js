import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TaskerInput() {
    return (
        <View style={styles.inputContainer}>
          
          <TextInput
            keyboardType='ascii-capable'
            placeholder='Enter Todo....'
            placeholderTextColor='#aaa'
            defaultValue=''
            style={styles.textBox}
            onChangeText={(val) => {
              setTemp({ key: tasks.length+1, task: val, status: false });
            }}
          />
          
          <View style={styles.addBtnContainer}>
            <TouchableOpacity
              onPress={() => {
              setTasks(tasks.concat(temp));
            }}>
              <Icon style={styles.icons} name="add" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        
        </View>
    );
}

const styles = StyleSheet.create({
    
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

  },

  textBox: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',

    borderRadius: 100,
    margin: 5,
    padding: 10,


    color: 'white',
    backgroundColor: '#333'
  },

  addBtnContainer: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 5,

    borderRadius: 500,

    backgroundColor:'#444'
  },
});