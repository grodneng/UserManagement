import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './router/Root/RootNavigation';
import { PaperProvider } from 'react-native-paper';
import combinedDefaultTheme from './theme';


const App = (): JSX.Element => {
  return (
    <PaperProvider theme={combinedDefaultTheme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
