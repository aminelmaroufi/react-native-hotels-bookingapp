import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import {connect} from 'react-redux';
import {addCard} from '../actions/auth';

const mapStateToProps = (state, newProps) => {
  return {
    reservation: state.reservation.reservation,
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCard: card => {
      dispatch(addCard(card));
    },
  };
};

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedCard: null,
      payType: 'later',
      card: {
        name: '',
        number: '',
        expireDate: '',
      },
      errorMessages: {
        name: {
          valid: null,
          message: '',
        },
        number: {
          valid: null,
          message: '',
        },
        expireDate: {
          valid: null,
          message: '',
        },
      },
      isValid: false,
    };
  }

  updateFields(key, value) {
    let {card} = this.state;

    if (key === 'number')
      value = value
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    card[key] = value;
    this.validateFields(key, card);
  }

  validateFields(key, card) {
    let {errorMessages} = this.state;
    const {name, number, expireDate} = card;
    const visaRegEx = /^(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})([- ]?)\d{4}\1\d{4}\1\d{4}$/.test(
      number,
    );

    switch (key) {
      case 'name': {
        if (!name) {
          errorMessages.name.valid = false;
          errorMessages.name.message = 'Card Name is required !';
        } else {
          errorMessages.name.valid = true;
          errorMessages.name.message = '';
        }
        break;
      }
      case 'number': {
        if (!number) {
          errorMessages.number.valid = false;
          errorMessages.number.message = 'Card number is required !';
        } else if (!visaRegEx) {
          errorMessages.number.valid = false;
          errorMessages.number.message = 'Card number is invalid !';
        } else {
          errorMessages.number.valid = true;
          errorMessages.number.message = '';
        }
        break;
      }
      case 'expireDate': {
        if (!expireDate) {
          errorMessages.expireDate.valid = false;
          errorMessages.expireDate.message = 'Expire date is required !';
        } else {
          errorMessages.expireDate.valid = true;
          errorMessages.expireDate.message = '';
        }
        break;
      }
      default:
        return;
    }

    if (name && number && expireDate) {
      this.setState({card, errorMessages, isValid: true});
    } else {
      this.setState({card, errorMessages, isValid: false});
    }
  }

  _saveCard = () => {
    const {isValid, card} = this.state;
    let {selectedCard} = this.state;

    if (isValid) {
      selectedCard = card;
      selectedCard.secure_num = card.number.split(' ')[0] + '************';
      this.setState({selectedCard, modalVisible: false});
    }
  };

  _bookNow = () => {
    const {isValid, selectedCard} = this.state;

    if (isValid) {
      this.props.onAddCard(selectedCard);
      this.props.navigation.navigate('Resume');
    } else
      Alert.alert(
        'Booking error',
        'You should add a credit catd before completing your booking',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
  };

  render() {
    const {reservation, user} = this.props;
    const {
      modalVisible,
      card,
      isValid,
      errorMessages,
      selectedCard,
      payType,
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.qst}> When would you like to pay? </Text>

        <View style={{flex: 1, marginTop: 15}}>
          <Text style={styles.textStyle}> Pay later </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => this.setState({payType: 'later'})}>
              <Image
                source={require('../assets/amex.png')}
                style={{
                  height: 50,
                  width: 40,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../assets/visa.jpg')}
                style={{
                  height: 25,
                  width: 40,
                  marginTop: 13,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../assets/mastercard.jpg')}
                style={{
                  height: 25,
                  width: 40,
                  marginTop: 13,
                }}
              />
            </TouchableOpacity>
            {payType === 'later' && (
              <Icon
                name="check"
                size={17}
                color="green"
                style={{position: 'absolute', top: 20, right: 10}}
              />
            )}
          </View>
        </View>
        {/* //pay now */}
        <View style={{flex: 1, marginTop: 30}}>
          <Text style={styles.textStyle}> Pay now </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => this.setState({payType: 'now'})}>
              <Image
                source={require('../assets/amex.png')}
                style={{
                  height: 50,
                  width: 40,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../assets/visa.jpg')}
                style={{
                  height: 25,
                  width: 40,
                  marginTop: 13,
                  marginRight: 10,
                }}
              />
              <Image
                source={require('../assets/mastercard.jpg')}
                style={{
                  height: 25,
                  width: 40,
                  marginTop: 13,
                }}
              />
            </TouchableOpacity>
            {payType === 'now' && (
              <Icon
                name="check"
                size={17}
                color="green"
                style={{position: 'absolute', top: 20, right: 10}}
              />
            )}
          </View>
        </View>
        <Text style={{...styles.textStyle, lineHeight: 20, marginTop: 25}}>
          {' '}
          The property will charge you the full amount after you book. This
          booking is non-refundable.
        </Text>

        <View style={{flex: 1, marginTop: 35}}>
          <Text style={{...styles.textStyle, fontWeight: 'bold'}}>
            Your reservation guarantee
          </Text>
          <View style={{...styles.row, marginTop: 30}}>
            <Icon
              name="credit-card"
              size={13}
              color="#000"
              style={{marginRight: 10}}
            />
            <Text style={{...styles.textStyle}}>
              Your credit card is needed to guarantee your booking.
            </Text>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 25}}>
          <Text style={styles.qst}> How do you want to pay? </Text>
          <Button
            title="Select a payment method"
            containerStyle={{width: 250}}
            iconComponent={Icon}
            icon={{
              name: 'plus-square',
              type: 'font-awesome',
              size: 17,
              color: '#00AAFF',
              marginRight: 15,
            }}
            //  backgroundColor="#ff5d62"

            buttonStyle={styles.buttonPayStyle}
            titleStyle={styles.textButtonPay}
            onPress={() => this.setState({modalVisible: true})}
          />

          {selectedCard && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 15,
              }}>
              <Image
                source={require('../assets/visa.jpg')}
                style={{
                  height: 20,
                  width: 30,
                  marginRight: 10,
                }}
              />
              <Text style={styles.qst}> {selectedCard.secure_num} </Text>
            </View>
          )}
        </View>
        <View style={{flex: 1, marginTop: 25}}>
          <Text
            style={{...styles.textStyle, fontWeight: 'bold', marginBottom: 5}}>
            {user.firstName + ' ' + user.lastName}
          </Text>
          <Text style={{...styles.textStyle, marginBottom: 3}}>
            {user.email}
          </Text>
          <Text style={{...styles.textStyle, marginBottom: 3}}> France </Text>
          <Text style={styles.textStyle}> {user.phone} </Text>
        </View>
        <View style={{flex: 1, marginTop: 30}}>
          <Text style={{...styles.qst, marginBottom: 15}}>
            {reservation.hotel.title}
          </Text>
          <View style={{...styles.row, marginTop: 10}}>
            <Text style={styles.checkIn}>Check-in</Text>
            <Text style={styles.checkInValue}>
              {Moment(reservation.checkInDate).format('ll')}
            </Text>
          </View>
          <View style={{...styles.row, marginTop: 20}}>
            <Text style={styles.checkIn}>Check-out</Text>
            <Text style={styles.checkInValue}>
              {Moment(reservation.checkOutDate).format('ll')}
            </Text>
          </View>
          <Text style={{...styles.textStyle, marginTop: 30}}>
            1 night, 1 room, 2 adults
          </Text>
          <View style={{flex: 1, marginTop: 30}}>
            <Text style={{...styles.textStyle}}>Total price</Text>
            <Text style={{...styles.priceStyle}}>€{reservation.price}</Text>
          </View>
        </View>
        <Button
          title={'Book now'}
          containerStyle={{width: 'auto'}}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
          type="solid"
          onPress={this._bookNow.bind(this)}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <View style={{height: 60, alignItems: 'center', marginTop: 35}}>
              <View style={{...styles.row}}>
                <Image
                  source={require('../assets/amex.png')}
                  style={{
                    height: 50,
                    width: 40,
                    marginRight: 10,
                  }}
                />
                <Image
                  source={require('../assets/visa.jpg')}
                  style={{
                    height: 25,
                    width: 40,
                    marginTop: 13,
                    marginRight: 10,
                  }}
                />
                <Image
                  source={require('../assets/mastercard.jpg')}
                  style={{
                    height: 25,
                    width: 40,
                    marginTop: 13,
                  }}
                />
              </View>
            </View>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Card Number"
                  placeholderTextColor="#000"
                  keyboardType="phone-pad"
                  inputContainerStyle={{borderBottomWidth: 1}}
                  inputStyle={styles.textInput}
                  onChangeText={text => this.updateFields('number', text)}
                  value={card.number}
                />
                {errorMessages.number.valid === false && (
                  <View style={styles.errorContainer}>
                    <Icon
                      name="exclamation-triangle"
                      color={'#ff375d'}
                      size={8}
                      style={styles.errorIcon}
                    />
                    <Text style={styles.errorStyle}>
                      {errorMessages.number.message}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.inputContainer}>
                <DatePicker
                  style={{width: 140}}
                  date={card.expireDate}
                  mode="date"
                  placeholder={
                    card.expireDate === ''
                      ? 'Pick a date'
                      : Moment(card.expireDate).format('ll')
                  }
                  format="ll"
                  minDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      alignItems: 'flex-start',
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: '#000',
                      marginLeft: 10,
                    },
                    dateText: styles.expireDate,
                    placeholderText: styles.expireDate,
                  }}
                  onDateChange={date => {
                    this.updateFields('expireDate', date);
                  }}
                />
                {errorMessages.expireDate.valid === false && (
                  <View style={styles.errorContainer}>
                    <Icon
                      name="exclamation-triangle"
                      color={'#ff375d'}
                      size={8}
                      style={styles.errorIcon}
                    />
                    <Text style={styles.errorStyle}>
                      {errorMessages.expireDate.message}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Card Name"
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  inputContainerStyle={{borderBottomWidth: 1}}
                  inputStyle={styles.textInput}
                  onChangeText={text => this.updateFields('name', text)}
                  value={card.name}
                  onSubmitEditing={e => this._saveCard()}
                />
                {errorMessages.name.valid === false && (
                  <View style={styles.errorContainer}>
                    <Icon
                      name="exclamation-triangle"
                      color={'#ff375d'}
                      size={8}
                      style={styles.errorIcon}
                    />
                    <Text style={styles.errorStyle}>
                      {errorMessages.name.message}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{flex: 1, marginTop: 100}}>
                <Button
                  title={'Use this card'}
                  containerStyle={{width: 'auto'}}
                  buttonStyle={styles.button}
                  titleStyle={styles.textButton}
                  type="solid"
                  disabled={!isValid}
                  onPress={this._saveCard.bind(this)}
                />
                <TouchableHighlight
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                  style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.textCancelModal}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
  },
  qst: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textStyle: {
    color: '#000',
    fontSize: 13,
  },
  buttonPayStyle: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginBottom: 10, //20 ios
    width: '100%',
    height: 50,
  },
  textButtonPay: {
    color: '#00AAFF',
    fontSize: 16,
    fontWeight: '600',
  },
  checkIn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  checkInValue: {
    fontSize: 16,
    color: '#000',
    position: 'absolute',
    right: 5,
  },
  priceStyle: {
    fontSize: 27,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2756a1',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginTop: 100,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    marginTop: 15,
  },
  inputContainer: {
    marginBottom: 25,
  },
  textInput: {
    fontSize: 16,
  },
  textCancelModal: {
    color: '#32b471',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  expireDate: {
    fontSize: 16,
    color: '#000',
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingLeft: 10,
  },
  errorIcon: {
    paddingTop: 4,
  },
  errorStyle: {
    fontSize: 12,
    marginLeft: 3,
    color: '#ff375d',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
