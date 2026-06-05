import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CloudExplRootNavigator} from './src/cloudExplNav/CloudExplRootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <CloudExplRootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
