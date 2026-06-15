import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CloudExplRootNavigator} from './src/cloudExplNav/CloudExplRootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <CloudExplRootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
