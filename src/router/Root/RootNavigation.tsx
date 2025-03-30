// *** NPM ***
import { Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from "react-native-paper"

// *** OTHER ***
import UsersScreen from './screens/UsersScreen';
import AddUserScreen from './screens/AddUserScreen';
import EditUserScreen from './screens/EditUserScreen';

// *** TYPES ***
export type TNavigationStackProps = {
  UsersScreen: undefined;
  AddUserScreen: undefined;
  EditUserScreen: {
    username: string;
    login: string;
    password: string;
  }
};

// *** NAVIGATION CREATION ***
const Stack = createNativeStackNavigator<TNavigationStackProps>();

// *** NAVIGATION PROPS ***
export type UsersScreenNavigationProp = NativeStackNavigationProp<TNavigationStackProps, 'UsersScreen'>;
export type AddUserScreenNavigationProp = NativeStackNavigationProp<TNavigationStackProps, 'AddUserScreen'>;
export type EditUserScreenNavigationProp = NativeStackNavigationProp<TNavigationStackProps, 'EditUserScreen'>;
export type EditUserScreenRouteProp = RouteProp<TNavigationStackProps, 'EditUserScreen'>;

// *** HEADER CONFIGURATION ***
const renderHeaderLeftForUsersScreen = (navigation: UsersScreenNavigationProp) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity>
      <Ionicons name="menu" size={25} color="#fff" />
    </TouchableOpacity>
    <Text style={{ color: 'white', fontWeight: '600', paddingLeft: 10, fontSize: 16 }}>Пользователи</Text>
  </View>
);

const renderHeaderRightForUsersScreen = (navigation: UsersScreenNavigationProp) => (
  <TouchableOpacity onPress={() => navigation.navigate('AddUserScreen')}>
    <Ionicons name="add-outline" size={25} color="white" />
  </TouchableOpacity>
);

const renderHeaderLeftForAddUserScreen = (navigation: AddUserScreenNavigationProp) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={25} color="#fff" />
    </TouchableOpacity>
    <Text style={{ color: 'white', fontWeight: '600', paddingLeft: 10, fontSize: 16 }}>Добавление пользователя</Text>
  </View>
);

// *** ROOT NAVIGATION ***
const RootNavigation = (): JSX.Element => {
  // *** THEME ***
  const { colors } = useTheme()

  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      {/* Users Screen */}
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={({ navigation }: { navigation: UsersScreenNavigationProp }) => ({
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerLeft: () => renderHeaderLeftForUsersScreen(navigation),
          headerRight: () => renderHeaderRightForUsersScreen(navigation),
        })}
      />
      {/* Add User Screen */}
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={({ navigation }: { navigation: AddUserScreenNavigationProp }) => ({
          title: '',
          headerStyle: { backgroundColor: colors.background },
          headerLeft: () => renderHeaderLeftForAddUserScreen(navigation),
        })}
      />
      {/* Edit User Screen */}
      <Stack.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={({ navigation }: { navigation: EditUserScreenNavigationProp }) => ({
          title: '',
          headerStyle: { backgroundColor: colors.background },
        })}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
