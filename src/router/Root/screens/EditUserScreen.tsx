// *** NPM ***
import React, { useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, useTheme, ActivityIndicator } from "react-native-paper"

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
    // *** THEME ***
    const { colors } = useTheme();

    // *** PROPS ***
    const { navigation, route } = props

    // *** USE STATE ***
    const [username, setUserName] = useState(route.params.username);
    const [login, setLogin] = useState(route.params.login);
    const [password, setPassword] = useState(route.params.password);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    // USE VALIDATION HOOK
    const { validateFields, validateWithServer } = useValidation(
        username.trim(),
        login.trim(),
        password.trim(),
        '',
        { checkConfirmPassword: false },
        setIsLoading);

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

        users[userIndex] = {
            ...users[userIndex],
            username: username.trim(),
            login: login.trim(),
            password: password.trim()
        };

        await AsyncStorage.setItem('users', JSON.stringify(users));
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {isLoading && <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />}
            <TextInput
                placeholder="Название"
                value={username}
                onChangeText={setUserName}
                underlineColor='white'
                textColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                style={[styles.input, { backgroundColor: colors.background }]}
            />
            <TextInput
                placeholder="Логин"
                value={login}
                onChangeText={setLogin}
                underlineColor='white'
                textColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                style={[styles.input, styles.inputMargin, { backgroundColor: colors.background }]}
            />
            <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showConfirmPassword}
                underlineColor='white'
                textColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                textContentType={'oneTimeCode'}
                autoComplete="off"
                right={
                    <TextInput.Icon
                        icon={showConfirmPassword ? 'eye-off' : 'eye'}
                        color={'white'}
                        size={20}
                        onPress={() => setShowConfirmPassword(prev => !prev)}
                    />
                }
                style={[styles.input, styles.inputMargin, { backgroundColor: colors.background }]}
            />
        </View>
    )
}

// *** STYLES ***
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
    headerTitle: {
        color: 'white',
        fontWeight: '600',
        paddingLeft: 10,
        fontSize: 16,
    },
    input: {
        fontSize: 18,
        color: 'white',
        borderColor: 'white',
        height: 45,
    },
    inputMargin: {
        marginTop: 30,
    },
});

export default EditUserScreen