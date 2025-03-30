// *** NPM ***
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme, Text } from "react-native-paper"

// *** OTHER ***
import { UsersScreenNavigationProp } from '../RootNavigation';

// *** TYPES ***
export interface User {
    username: string;
    login: string;
    password: string;
}

interface IProps {
    navigation: UsersScreenNavigationProp;
}

const UsersScreen = ({ navigation }: IProps): JSX.Element => {
    // *** THEME ***
    const { colors } = useTheme();

    // *** USE STATE ***
    const [users, setUsers] = useState<User[]>([]);
    const isFocused = useIsFocused();

    // *** FETCH USERS FROM STORAGE ***
    useEffect(() => {
        const fetchUsers = async () => {
            const storedUsers = await AsyncStorage.getItem('users');
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            }
        };

        if (isFocused) fetchUsers();
    }, [isFocused]);

    // *** DELETE USER HANDLER ***
    const deleteUserHandler = async (username: string) => {
        Alert.alert('Delete User', `Are you sure you want to delete user: ${username}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    const filteredUsers = users.filter(user => user.username !== username);
                    setUsers(filteredUsers);
                    await AsyncStorage.setItem('users', JSON.stringify(filteredUsers));
                },
                style: 'destructive',
            },
        ]);
    };

    // *** USER ITEM COMPONENT ***
    const UserItem = ({ user }: { user: User }) => (
        <View style={styles.userItem}>
            <Text style={styles.userLogin}>{user.login}</Text>
            <View style={styles.userActions}>
                <TouchableOpacity
                    style={styles.iconSettingButton}
                    onPress={() =>
                        navigation.navigate('EditUserScreen', {
                            username: user.username,
                            login: user.login,
                            password: user.password,
                        })
                    }>
                    <Feather name='settings' color="white" size={21} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconDeleteButton} onPress={() => deleteUserHandler(user.username)}>
                    <Feather name='trash-2' color="#A5A5A6" size={21} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, {backgroundColor: colors.background }]}>
            {users.length === 0 ? (
                <Text style={styles.emptyText}>Пользователи отсутсвуют</Text>
            ) : (
                <FlatList
                    data={users}
                    renderItem={({ item }) => <UserItem user={item} />}
                    keyExtractor={(item) => item.username}
                />
            )}
        </View>
    );
};

// *** STYLES ***
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        marginTop: 15,
    },
    userItem: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userLogin: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        maxWidth: '75%',
    },
    userActions: {
        flexDirection: 'row',
    },
    iconSettingButton: {
        padding: 5,
        marginRight: 10
    },
    iconDeleteButton: {
        padding: 5,
    }
});

export default UsersScreen;
