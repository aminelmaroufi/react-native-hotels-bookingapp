//import {name as appName} from './app.json';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import App from './App';

const store = configureStore();

export default class Route extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('hotel_booking_mobileapp', () => Route);
