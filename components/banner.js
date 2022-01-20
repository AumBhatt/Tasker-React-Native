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

export default function banner() {
    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>Tasker</Text>
            <TouchableOpacity
                style={styles.deleteAllBtn}
            >
                <MaterialIcon
                    name='delete'
                    size={'100%'}
                />
                <Text>Clear</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    bannerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

        backgroundColor: 'red',
    },
    bannerText: {
        margin: 5,

        color: 'white',
        backgroundColor: 'blue',
    },
    deleteAllBtn: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',

        margin: 5,
        padding: 5,

        borderWidth: 1,
        borderColor: 'white',
    },
});