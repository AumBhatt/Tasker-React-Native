import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const storeData = async (data) => {
    try {
        AsyncStorage.setItem('@tasker', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
};

export default function banner(props) {

    const emptyList = () => {
        storeData([]).then(props.setList([]));
    };

    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>
                Tasker
                <Text style={styles.bannerSubText}>
                    2.0
                    <Text style={{fontSize: 10, color: '#5e5e5e'}}> By Aum</Text>
                </Text>
            </Text>
            <TouchableOpacity
                style={styles.deleteAllBtn}
                onPress={emptyList}
            >
                <MaterialIcon
                    name='delete'
                    size={20}
                    color={'white'}
                />
                <Text style={styles.deleteText}>Clear</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    bannerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        

    },
    bannerText: {
        flex: 5,
        margin: 5,

        
        fontSize: 40,
        fontFamily: 'Raleway_100Thin',

        color: 'white',
    },
    bannerSubText: {
        fontSize: 20,
        fontFamily: 'Raleway_400Regular',
        fontWeight: '500',
        color: '#fff'
    },
    deleteAllBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',

        margin: 5,
        marginTop: 15,
        padding: 5,
        paddingHorizontal: 10,

        borderRadius: 100,
        borderWidth: 1,

        color: 'white',
        backgroundColor: '#131313'
    },
    deleteText: {
        fontSize: 15,
        fontFamily: 'Raleway_400Regular',
        color: 'white',
    },
});