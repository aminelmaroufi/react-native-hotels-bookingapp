import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, Text, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Icon
            name="check"
            size={80}
            color="#00AAFF"
            style={{marginBottom: 15}}
          />
          <Text style={styles.textStyle}> Congratulations!!</Text>
          <Text style={styles.textStyle}>
            {' '}
            Your booking was successfully creaed{' '}
          </Text>
          <Text style={{...styles.textStyle, textAlign: 'center'}}>
            You'll receive an email contain more details about your reservation
          </Text>
          <Text style={styles.textStyle}>Have fun :)</Text>
        </View>
        <Button
          title={'Take a new book'}
          containerStyle={{width: 'auto'}}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
          type="solid"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#2756a1',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Resume;
