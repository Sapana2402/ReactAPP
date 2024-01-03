import React from 'react';
import {StyleSheet} from 'react-native';
import Home from './src/Home';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
