import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import UsersScreen from './UsersScreen';
import AddUserScreen from './AddUserScreen';
import EditUserScreen from './EditUserScreen'
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type TNavigationStackProps = {
  UsersScreen: undefined;
  AddUserScreen: undefined;
  EditUserScreen: undefined
};

const Stack = createNativeStackNavigator<TNavigationStackProps>();

export type UsersScreenNavigationProp = NativeStackNavigationProp<TNavigationStackProps, 'UsersScreen'>;
export type AddUserScreenNavigationProp = NativeStackNavigationProp<TNavigationStackProps, 'AddUserScreen'>;
export type EditUserScreenNavigationProp = NativeStackNavigationProp<TNavigationStackProps, 'EditUserScreen'>;


const RootNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={({ navigation }: { navigation: UsersScreenNavigationProp }) => ({
          title: '',
          headerStyle: { backgroundColor: '#141517' },  // Цвет фона
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('AddUserScreen')}>
                <Ionicons name="menu" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: '600', paddingLeft: 10, fontSize: 16 }}>Пользователи</Text>
            </View>

          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddUserScreen')}>
              <Ionicons name="add-outline" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}></Stack.Screen>
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={({ navigation }: { navigation: AddUserScreenNavigationProp }) => ({
          title: '',
          headerStyle: { backgroundColor: '#141517' },
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: '600', paddingLeft: 10, fontSize: 16 }}>Добавление пользователя</Text>
            </View>

          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddUserScreen')}>
              <Ionicons name="checkmark-outline" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}></Stack.Screen>
      <Stack.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={({ navigation }: { navigation: EditUserScreenNavigationProp }) => ({
          title: '',
          headerStyle: { backgroundColor: '#141517' },
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: '600', paddingLeft: 10, fontSize: 16 }}>Добавление пользователя</Text>
            </View>

          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddUserScreen')}>
              <Ionicons name="checkmark-outline" size={25} color="white" />
            </TouchableOpacity>
          ),
        })}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigation;