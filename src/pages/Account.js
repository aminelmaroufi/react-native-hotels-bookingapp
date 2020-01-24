import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { saveAccount } from "../actions/auth";

const mapStateToProps = (state, newProps) => {
  return {
    reservation: state.reservation.reservation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveAccount: account => {
      dispatch(saveAccount(account));
    }
  };
};
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      },
      errorMessages: {
        firstName: {
          valid: null,
          message: ""
        },
        lastName: {
          valid: null,
          message: ""
        },
        email: {
          valid: null,
          message: ""
        },
        phone: {
          valid: null,
          message: ""
        }
      },
      isValid: false
    };
  }

  updateFields(key, value) {
    let { account } = this.state;
    account[key] = value;
    this.validateFields(key, account);
  }

  validateFields(key, account) {
    let { errorMessages } = this.state;
    const { firstName, lastName, email, phone } = account;
    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    const phoneValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      phone
    );

    switch (key) {
      case "firstName": {
        if (!firstName) {
          errorMessages.firstName.valid = false;
          errorMessages.firstName.message = "First Name is required !";
        } else {
          errorMessages.firstName.valid = true;
          errorMessages.firstName.message = "";
        }
        break;
      }
      case "lastName": {
        if (!lastName) {
          errorMessages.lastName.valid = false;
          errorMessages.lastName.message = "Last Name is required !";
        } else {
          errorMessages.lastName.valid = true;
          errorMessages.lastName.message = "";
        }
        break;
      }
      case "email": {
        if (!email) {
          errorMessages.email.valid = false;
          errorMessages.email.message = "Email is required !";
        } else if (!emailValid) {
          errorMessages.email.valid = false;
          errorMessages.email.message = "Email value is not valid !";
        } else {
          errorMessages.email.valid = true;
          errorMessages.email.message = "";
        }
        break;
      }
      case "phone": {
        if (!phone) {
          errorMessages.phone.valid = false;
          errorMessages.phone.message = "Phone is required !";
        } else if (!phoneValid) {
          errorMessages.phone.valid = false;
          errorMessages.phone.message = "Phone value is not valid !";
        } else {
          errorMessages.phone.valid = true;
          errorMessages.phone.message = "";
        }
        break;
      }
      default:
        return;
    }

    if (firstName && lastName && emailValid && phoneValid) {
      this.setState({ account, errorMessages, isValid: true });
    } else {
      this.setState({ account, errorMessages, isValid: false });
    }
  }

  _onSave = () => {
    const { isValid, account } = this.state;

    if (isValid) {
      this.props.onSaveAccount(account);
      this.props.navigation.navigate("Overview");
    }
  };

  render() {
    const { account, isValid, errorMessages } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="First Name"
              placeholderTextColor="#000"
              keyboardType="email-address"
              inputContainerStyle={{ borderBottomWidth: 1 }}
              inputStyle={styles.textInput}
              value={account.firstName}
              onChangeText={text => this.updateFields("firstName", text)}
              onSubmitEditing={e => this.refs.lastName.focus()}
            />
            {errorMessages.firstName.valid === false && (
              <View style={styles.errorContainer}>
                <Icon
                  name="exclamation-triangle"
                  color={"#ff375d"}
                  size={8}
                  style={styles.errorIcon}
                />
                <Text style={styles.errorStyle}>
                  {errorMessages.firstName.message}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              ref="lastName"
              placeholder="Last Name"
              placeholderTextColor="#000"
              keyboardType="email-address"
              inputContainerStyle={{ borderBottomWidth: 1 }}
              inputStyle={styles.textInput}
              value={account.lastName}
              onChangeText={text => this.updateFields("lastName", text)}
              onSubmitEditing={e => this.refs.email.focus()}
            />
            {errorMessages.lastName.valid === false && (
              <View style={styles.errorContainer}>
                <Icon
                  name="exclamation-triangle"
                  color={"#ff375d"}
                  size={8}
                  style={styles.errorIcon}
                />
                <Text style={styles.errorStyle}>
                  {errorMessages.lastName.message}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              ref="email"
              placeholder="Email Address"
              placeholderTextColor="#000"
              keyboardType="email-address"
              inputContainerStyle={{ borderBottomWidth: 1 }}
              inputStyle={styles.textInput}
              value={account.email}
              onChangeText={text => this.updateFields("email", text)}
              onSubmitEditing={e => this.refs.phone.focus()}
            />
            {errorMessages.email.valid === false && (
              <View style={styles.errorContainer}>
                <Icon
                  name="exclamation-triangle"
                  color={"#ff375d"}
                  size={8}
                  style={styles.errorIcon}
                />
                <Text style={styles.errorStyle}>
                  {errorMessages.email.message}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              ref="phone"
              placeholder="Phone Number"
              placeholderTextColor="#000"
              keyboardType="phone-pad"
              inputContainerStyle={{ borderBottomWidth: 1 }}
              inputStyle={styles.textInput}
              value={account.phone}
              onChangeText={text => this.updateFields("phone", text)}
              onSubmitEditing={e => this._onSave()}
            />
            {errorMessages.phone.valid === false && (
              <View style={styles.errorContainer}>
                <Icon
                  name="exclamation-triangle"
                  color={"#ff375d"}
                  size={8}
                  style={styles.errorIcon}
                />
                <Text style={styles.errorStyle}>
                  {errorMessages.phone.message}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1, marginTop: 100 }}>
            <Button
              title={isValid ? "Next Step" : "Add your info"}
              containerStyle={{ width: "auto" }}
              buttonStyle={styles.button}
              titleStyle={styles.textButton}
              type="solid"
              disabled={!isValid}
              onPress={this._onSave.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    paddingTop: 40
  },
  form: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    padding: 10
  },
  inputContainer: {
    marginBottom: 25
  },
  textInput: {
    fontSize: 16
  },
  button: {
    backgroundColor: "#2756a1",
    borderRadius: 10,
    width: "100%",
    height: 50
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  errorContainer: {
    flexDirection: "row",
    marginTop: 5,
    paddingLeft: 10
  },
  errorIcon: {
    paddingTop: 4
  },
  errorStyle: {
    fontSize: 12,
    marginLeft: 3,
    color: "#ff375d"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
