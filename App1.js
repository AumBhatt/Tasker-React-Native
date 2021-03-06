import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import {
  useFonts,
  Raleway_100Thin,
  Raleway_300Light,
  Raleway_400Regular
} from "@expo-google-fonts/raleway";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppLoading from 'expo-app-loading';




export default function App() {

  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_300Light,
    Raleway_400Regular
  });
  let [tasks, setTasks] = useState(
/*     [
      { key: 1, task: "ABC", status: false},
      { key: 2, task: "XYZ", status: false},
      { key: 3, task: "LALALL", status: true},
      { key: 4, task: "SomeThing.....", status: false},
      
    ] */
  );

  const [temp, setTemp] = useState('');

  useEffect(() => {
    setTasks(retrieveData);
  }, []);


  const changeTaskStatus = async (itemKey) => {
    setTasks(
      tasks.map( (item) => (
          item = { key: item.key, task: item.task, status: (item.key === itemKey) ? !item.status : item.status}
        )
      )
    );
    storeData(tasks);
  };

  const removeTask = (itemKey) => {
      setTasks(
        tasks.filter((item) => item.key !== itemKey)
      );
      storeData(tasks);
  };

  const displayList = ({ item }) => (
    <View style={[styles.itemContainer, (item.status)?styles.taskComplete:styles.taskIncomplete]}>
      <TouchableOpacity onPress={() => changeTaskStatus(item.key)}>
        <Icon
          style={styles.icons}
          name={[(item.status)?"check-box":"check-box-outline-blank"]}
          size={30} 
          color="#fff" />
      </TouchableOpacity>
      <Text style={styles.listItem}>{item.task}</Text>
      <TouchableOpacity onPress={() => removeTask(item.key)}>
        <Icon style={styles.icons} name="close" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@tasker_data', JSON.stringify(value))
    }
    catch (e) {
      console.log(e.message);
    }
  };

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('@tasker_data');
      if(data !== null)
        return JSON.parse(data);
      else
        return [];
    } catch (error) {
      throw error;
    }
  };
  if(!fontsLoaded)
    return <AppLoading />
  else return (
    <View style={styles.container}>

      <StatusBar backgroundColor='black' style='light' translucent={false} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tasker</Text>
      </View>

      <View style={styles.body}>
      <Text>
          Hooray!! No tasks todo.
      </Text>
        <View style={styles.tasksContainer}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.key}
            renderItem={displayList}
          ></FlatList>
        </View>
        
        <View style={styles.inputContainer}>
          
          <TextInput
            keyboardType='ascii-capable'
            placeholder='Enter Todo....'
            placeholderTextColor='#aaa'
            defaultValue=''
            style={styles.textBox}
            onChangeText={(val) => {
              setTemp(val)
            }}
          />
          
          <View style={styles.addBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                var newTask = { key: tasks.length+1, task: temp, status: false};
                if(temp !== '') {
                  (tasks.length) ? setTasks([...tasks, newTask]) : setTasks([newTask]);
                  // setTasks(tasks.concat({ key: tasks.length+1, task: temp, status: false}));
                  storeData(tasks);
                }
            }}>
              <Icon style={styles.icons} name="add" size={35} color="#000" />
            </TouchableOpacity>
          </View>
        
        </View>
      
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#000'
  },
  headerContainer: {
    width: '100%',
    top: 0,
  },
  headerText: {
    marginHorizontal: 10,


    color: 'white',
    
    fontFamily: 'Raleway_100Thin',
    fontWeight: '100',
    fontSize: 40,
  },
  body: {
    flex: 1,
    width: '100%',
    marginTop: 10,


  },

  icons: {
    marginHorizontal: 3
  },
  taskComplete: {
    backgroundColor: '#10ac84'
  },
  taskIncomplete: {
      backgroundColor: '#131313'
  },
  tasksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },
  itemContainer:{
    flex: 1,
    zIndex: 10,
    width: (Dimensions.get('window').width)*0.95,
    maxWidth: 470,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginVertical: 10,
    padding: 15,

    borderRadius: 5,

  },
  listItem: {
    width: '70%',
    
    marginHorizontal: 5,

    fontSize: 22.5,
    textAlign: 'left',
    textAlignVertical: 'center',

    color: 'white',
    fontFamily: 'Raleway_300Light'
    
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,


    backgroundColor: '#000'
  },

  textBox: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',

    borderRadius: 100,
    margin: 5,
    padding: 10,

    fontFamily: 'Raleway_300Light',

    color: 'white',
    backgroundColor: '#232323'
  },

  addBtnContainer: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 5,

    borderRadius: 500,

    backgroundColor:'#aaa'
  },
});
