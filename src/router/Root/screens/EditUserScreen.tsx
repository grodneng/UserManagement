// *** NPM  ***
import React, { useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// *** OTHER ***
import useValidation from '../../../hooks/useValidation';
import { EditUserScreenNavigationProp, EditUserScreenRouteProp } from '../RootNavigation';
import { User } from './UsersScreen';

// *** TYPES ***
interface IProps {
    navigation: EditUserScreenNavigationProp
    route: EditUserScreenRouteProp
}

const EditUserScreen = (props: IProps): JSX.Element => {
    // *** PROPS ***
    const { navigation, route } = props

    // *** USE STATE ***
    const [username, setUserName] = useState(route.params.username);
    const [login, setLogin] = useState(route.params.login);
    const [password, setPassword] = useState(route.params.password);

    // USE VALIDATION HOOK
    const { validateFields, validateWithServer } = useValidation(login, password, '', { checkConfirmPassword: false });

    // *** HEADER CONFIGURATION ***
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: '600', paddingLeft: 10, fontSize: 16 }}>
                        {route.params.username.length > 20 ? `${route.params.username.slice(0, 20)}...}` : route.params.username}
                    </Text>
                </View>

            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => editUserHanler()}>
                    <Ionicons name="checkmark-outline" size={25} color="white" />
                </TouchableOpacity>
            ),
        })
    })


    // *** EDIT USER HANDLER ***
    const editUserHanler = async () => {
        if (!validateFields()) return;

        const isValidOnServer = await validateWithServer();
        if (!isValidOnServer) return;

        const storedUsers = await AsyncStorage.getItem('users');
        let users = storedUsers ? JSON.parse(storedUsers) : [];

        const userIndex = users.findIndex((user: User) => user.username === route.params.username);
        if (userIndex === -1) {
            Alert.alert('Error', 'User not found.');
            return;
        }

        users[userIndex] = { ...users[userIndex], username, login, password };

        await AsyncStorage.setItem('users', JSON.stringify(users));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Название"
                value={username}
                onChangeText={setUserName}
                placeholderTextColor="#A5A5A6"
                style={styles.input}
            />
            <TextInput
                placeholder="Логин"
                value={login}
                onChangeText={setLogin}
                placeholderTextColor="#A5A5A6"
                style={[styles.input, styles.inputMargin]}
            />
            <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#A5A5A6"
                style={[styles.input, styles.inputMargin]}
            />
        </View>
    )
}

// *** STYLES ***
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#141517',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontWeight: '600',
        paddingLeft: 10,
        fontSize: 16,
    },
    input: {
        borderBottomWidth: 1,
        fontSize: 20,
        color: '#A5A5A6',
        padding: 5,
        borderColor: 'white',
    },
    inputMargin: {
        marginTop: 30,
    },
});

export default EditUserScreen