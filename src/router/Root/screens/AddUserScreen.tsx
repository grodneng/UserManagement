// *** IMPORTS ***
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { AddUserScreenNavigationProp } from '../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './UsersScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useValidation from '../../../hooks/useValidation';

// *** TYPES ***
interface IProps {
    navigation: AddUserScreenNavigationProp;
}

const AddUsersScreen = ({ navigation }: IProps): JSX.Element => {
    const [username, setUserName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { validateFields, validateWithServer } = useValidation(
        login,
        password,
        confirmPassword,
        {
            checkConfirmPassword: true,
        }
    );

    // *** HEADER CONFIGURATION ***
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => addUserHandler()}>
                    <Ionicons name="checkmark-outline" size={25} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, username, login, password, confirmPassword]);

    // *** ADD USER HANDLER ***
    const addUserHandler = async () => {
        if (!validateFields()) return;

        const isValidOnServer = await validateWithServer();
        if (!isValidOnServer) return;

        const storedUsers = await AsyncStorage.getItem('users');
        let users = storedUsers ? JSON.parse(storedUsers) : [];

        if (users.find((user: User) => user.username === username)) {
            Alert.alert('Error', 'User with this login already exists');
            return;
        }

        const newUser: User = { username, login, password };
        users.push(newUser);
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
            <TextInput
                placeholder="Повтор пароля"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#A5A5A6"
                style={[styles.input, styles.inputMargin]}
            />
        </View>
    );
};

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

export default AddUsersScreen;