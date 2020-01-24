import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Rating, Button } from "react-native-elements";
import Moment from "moment";
import { connect } from "react-redux";

const mapStateToProps = (state, newProps) => {
  return {
    reservation: state.reservation.reservation,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { reservation, user } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require("../assets/1.jpeg")}
            style={{
              height: 90,
              width: 80
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View
              style={{
                height: 18,
                width: 44,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 4,
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Text style={styles.tag}>Hotels</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{reservation.hotel.title}</Text>
              <Rating
                imageSize={15}
                readonly
                startingValue={4}
                style={{ paddingTop: 5 }}
              />
            </View>
            <Text style={styles.adress}>{reservation.hotel.address}</Text>
          </View>
        </View>
        <View style={{ ...styles.row, marginTop: 30 }}>
          <Text style={styles.checkIn}>Check-in</Text>
          <Text style={styles.checkInValue}>
            {Moment(reservation.checkInDate).format("ll")}
          </Text>
        </View>
        <View style={{ ...styles.row, marginTop: 20 }}>
          <Text style={styles.checkIn}>Check-out</Text>
          <Text style={styles.checkInValue}>
            {Moment(reservation.checkOutDate).format("ll")}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ ...styles.row, marginTop: 30 }}>
            <Text style={{ ...styles.textStyle }}>Total price for</Text>
            <Text style={styles.boldText}>1 room</Text>
            <Text style={styles.boldText}>
              {reservation.night_numbers} night
            </Text>
          </View>
          <Text style={styles.price}>€{reservation.price}</Text>
        </View>
        <View style={{ flex: 1, marginTop: 30 }}>
          <Text style={{ ...styles.roomStyle }}>{reservation.room.title}</Text>
          <View style={[styles.row, { marginTop: 30 }]}>
            <Icon
              name="user-circle"
              size={14}
              color="#000"
              style={{ marginTop: 1, marginRight: 15 }}
            />
            <View style={styles.row}>
              <Text
                style={{ ...styles.textStyle, fontSize: 15, marginRight: 5 }}
              >
                Booking for
              </Text>
              <Text style={styles.nameStype}>
                {user.firstName + " " + user.lastName}
              </Text>
            </View>
          </View>
          <View style={[styles.row, { marginTop: 15 }]}>
            <Icon
              name="users"
              size={14}
              color="#000"
              style={{ marginTop: 1, marginRight: 15 }}
            />
            <Text style={{ ...styles.textStyle, fontSize: 15 }}>2 adults</Text>
          </View>
          <View style={[styles.row, { marginTop: 15 }]}>
            <Icon
              name="bed"
              size={14}
              color="#000"
              style={{ marginTop: 1, marginRight: 15 }}
            />
            <Text style={{ ...styles.nameStype, fontSize: 15 }}>
              1 large bed
            </Text>
          </View>
          <View style={[styles.row, { marginTop: 30 }]}>
            <Icon
              name="ban"
              size={14}
              color="#000"
              style={{ marginTop: 1, marginRight: 15 }}
            />
            <Text style={{ ...styles.boldText, fontSize: 15 }}>
              Non-refundable
            </Text>
          </View>
          <View style={[styles.row, { marginTop: 15 }]}>
            <Icon
              name="credit-card"
              size={14}
              color="#000"
              style={{ marginTop: 1, marginRight: 15 }}
            />
            <Text style={{ ...styles.boldText, fontSize: 15 }}>
              Pay in advance
            </Text>
          </View>
        </View>
        <Button
          title={"Final Step"}
          containerStyle={{ width: "auto" }}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
          type="solid"
          onPress={() => this.props.navigation.navigate("Book")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  },
  row: {
    flexDirection: "row"
  },
  tag: {
    fontSize: 12,
    color: "#000"
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginRight: 5,
    marginBottom: 10
  },
  adress: {
    fontSize: 15,
    color: "#000"
  },
  checkIn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000"
  },
  checkInValue: {
    fontSize: 16,
    color: "#000",
    position: "absolute",
    right: 5
  },
  textStyle: {
    fontSize: 13,
    color: "#000"
  },
  boldText: {
    fontSize: 13,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 5
  },
  price: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
    marginTop: 10
  },
  button: {
    backgroundColor: "#2756a1",
    borderRadius: 10,
    width: "100%",
    height: 50,
    marginTop: 100
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  roomStyle: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold"
  },
  nameStype: {
    color: "#00AAFF",
    fontSize: 15,
    marginTop: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
