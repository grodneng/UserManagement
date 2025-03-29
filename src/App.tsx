import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './router/Root/RootNavigation';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
