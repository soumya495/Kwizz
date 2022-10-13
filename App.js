import {StatusBar, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Categories from './screens/Categories';
import Difficulty from './screens/Difficulty';
import Quiz from './screens/Quiz';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from './AppContext';

// https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple&encode=url3986

const App = () => {
  useLayoutEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Difficulty" component={Difficulty} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
