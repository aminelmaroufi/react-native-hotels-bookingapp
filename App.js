import React, { Component } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import { createAppContainer } from "react-navigation";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

import AppRoute from "./src/config/routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <AppRoute />;
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "red"
  },
  spinner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2756a1",
    zIndex: 999,
    opacity: 0.5
  }
});

export default App;
