import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Image, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Rating, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import Moment from "moment";
import { connect } from "react-redux";
import { updateReservation } from "../actions/reservation";

const mapStateToProps = (state, newProps) => {
  return {
    reservation: state.reservation.reservation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateReservation: reservation => {
      dispatch(updateReservation(reservation));
    }
  };
};

class HotelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDate: new Date(),
      checkOutDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      )
    };
  }

  _pickDate = (type, value) => {
    let { reservation } = this.props;
    if (type === "checkIn")
      reservation = { ...reservation, checkInDate: Moment(value) };
    else {
      const checkOutDate = Moment(value);
      const diff_in_time = checkOutDate.diff(reservation.checkInDate, "days");
      let price = reservation.price;
      if (diff_in_time > 1) price = parseInt(reservation.price) * diff_in_time;
      reservation = {
        ...reservation,
        checkOutDate: checkOutDate,
        night_numbers: diff_in_time === 0 ? 1 : diff_in_time,
        price
      };
    }
    this.props.onUpdateReservation(reservation);
  };

  _selectRooms = () => {
    const { reservation } = this.props;

    if (reservation.checkInDate == "")
      Alert.alert(
        "Reservation Date",
        "You should pick a reservation date for the check in and check out before selecting a room",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    else if (reservation.checkOutDate == "")
      Alert.alert(
        "Reservation Date",
        "You should pick a reservation date for the check in and check out before selecting a room",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    else this.props.navigation.navigate("CheckRooms");
  };

  render() {
    const { reservation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: reservation.hotel.pic_url_2 }}
            style={{
              height: 150,
              width: "100%"
            }}
          />
          <View style={styles.info}>
            <View style={styles.row}>
              <Text style={styles.title}>{reservation.hotel.name}</Text>
              <Rating
                imageSize={15}
                readonly
                startingValue={reservation.hotel.rating}
                style={{ paddingTop: 5 }}
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.date}>
                  Pick for {reservation.night_numbers} night
                  {reservation.night_numbers === 1 ? "" : "s"} (
                  {reservation.checkInDate === ""
                    ? ""
                    : Moment(reservation.checkInDate).format("ll")}{" "}
                  -{" "}
                  {reservation.checkOutDate === ""
                    ? ""
                    : Moment(reservation.checkOutDate).format("ll")}
                  )
                </Text>
                <Text style={styles.price}>€{reservation.price}</Text>
              </View>
              <View style={[styles.row, { marginTop: 20 }]}>
                <Icon
                  name="map-marker"
                  size={14}
                  color="#000"
                  style={{ marginRight: 15 }}
                />
                <Text style={styles.adress}>{reservation.hotel.address}</Text>
              </View>
              <View style={[styles.row, { marginTop: 10 }]}>
                <Icon
                  name="subway"
                  size={14}
                  color="#000"
                  style={{ marginRight: 15 }}
                />
                <Text style={styles.adress}>{reservation.hotel.location}</Text>
              </View>
              <View style={[styles.row, { marginTop: 10 }]}>
                <Icon
                  name="star"
                  size={14}
                  color="#000"
                  style={{ marginRight: 15 }}
                />
                <Text style={styles.adress}>
                  8,9 - Fabulous location! (based on 560 location ratings)
                </Text>
              </View>

              <View style={[styles.row, { marginTop: 50 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateCheck}>Check-in</Text>
                  <DatePicker
                    style={{ width: 140 }}
                    date={reservation.checkInDate}
                    mode="date"
                    placeholder={
                      reservation.checkInDate === ""
                        ? "Pick a date"
                        : Moment(reservation.checkInDate).format("ll")
                    }
                    format="ll"
                    minDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                      dateInput: {
                        alignItems: "flex-start",
                        borderWidth: 0
                      },
                      dateText: styles.dateCheckIn,
                      placeholderText: styles.dateCheckIn
                    }}
                    onDateChange={date => {
                      this._pickDate("checkIn", date);
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateCheck}>Check-in</Text>
                  {reservation.checkInDate !== "" && (
                    <DatePicker
                      style={{ width: 140 }}
                      date={reservation.checkOutDate}
                      mode="date"
                      placeholder={
                        reservation.checkOutDate === ""
                          ? "Pick a date"
                          : Moment(reservation.checkOutDate).format("ll")
                      }
                      format="ll"
                      minDate={
                        reservation.checkInDate
                          ? reservation.checkInDate
                          : new Date()
                      }
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          alignItems: "flex-start",
                          borderWidth: 0
                        },
                        dateText: styles.dateCheckIn,
                        placeholderText: styles.dateCheckIn
                      }}
                      onDateChange={date => {
                        this._pickDate("checkOut", date);
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={{ flex: 1, marginTop: 40 }}>
                <Text style={styles.reviewsTitle}>
                  What guests loved the most:
                </Text>
                <View style={{ flex: 1, marginTop: 20 }}>
                  <Text style={styles.reviewDesc}>
                    "Very modern property tucked away so no noise from traffic
                    or people. The room was very large with superior bed and
                    modern up to date bathroom. No faults"
                  </Text>
                  <View style={[styles.row, { marginTop: 15 }]}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        padding: 11,
                        paddingLeft: 14,
                        backgroundColor: "red"
                      }}
                    >
                      <Text style={{ ...styles.guestFStyle, color: "#fff" }}>
                        G
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.guestFStyle}>Greg</Text>
                      <View style={[styles.row, { marginTop: 10 }]}>
                        <Image
                          source={require("../assets/UK.png")}
                          style={{
                            height: 8,
                            width: 18,
                            marginTop: 1
                          }}
                        />
                        <Text style={styles.guestCountryStyle}>
                          United Kingdom
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* //Second review */}
                <View style={{ flex: 1, marginTop: 30 }}>
                  <Text style={styles.reviewDesc}>
                    "Excellent location and friendly staff, this hotel was
                    perfect for our weekend away"
                  </Text>
                  <View style={[styles.row, { marginTop: 15 }]}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        padding: 11,
                        paddingLeft: 14,
                        backgroundColor: "red"
                      }}
                    >
                      <Text style={{ ...styles.guestFStyle, color: "#fff" }}>
                        A
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.guestFStyle}>Amani</Text>
                      <View style={[styles.row, { marginTop: 10 }]}>
                        <Image
                          source={require("../assets/UK.png")}
                          style={{
                            height: 8,
                            width: 18,
                            marginTop: 1
                          }}
                        />
                        <Text style={styles.guestCountryStyle}>
                          United Kingdom
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* //end  */}
                {/* //Third review */}
                <View style={{ flex: 1, marginTop: 30 }}>
                  <Text style={styles.reviewDesc}>
                    "Beautiful location, quiet, comfortable. Amazing value for
                    money. friendly staff, clean and hygienic appliences. Loved
                    the bathroom and shower place."
                  </Text>
                  <View style={[styles.row, { marginTop: 15 }]}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        padding: 11,
                        paddingLeft: 14,
                        backgroundColor: "red"
                      }}
                    >
                      <Text style={{ ...styles.guestFStyle, color: "#fff" }}>
                        S
                      </Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.guestFStyle}>Susan</Text>
                      <View style={[styles.row, { marginTop: 10 }]}>
                        <Image
                          source={require("../assets/UK.png")}
                          style={{
                            height: 8,
                            width: 18,
                            marginTop: 1
                          }}
                        />
                        <Text style={styles.guestCountryStyle}>
                          United Kingdom
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* //end  */}
              </View>
            </View>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Button
              title="Select rooms"
              containerStyle={{ width: "auto" }}
              buttonStyle={styles.button}
              titleStyle={styles.textButton}
              type="solid"
              onPress={this._selectRooms.bind(this)}
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
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row"
  },
  info: {
    flex: 1,
    padding: 15,
    paddingLeft: 30
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginRight: 7
  },
  date: {
    fontSize: 13,
    color: "#000"
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5
  },
  adress: {
    fontSize: 15,
    color: "#000"
  },
  dateCheck: {
    fontSize: 14,
    color: "#000"
  },
  dateCheckIn: {
    fontSize: 17,
    color: "#00AAFF",
    fontWeight: "bold"
  },
  reviewsTitle: {
    fontSize: 17,
    color: "#000",
    fontWeight: "bold"
  },
  reviewDesc: {
    fontSize: 13,
    color: "#000"
  },
  guestFStyle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold"
  },
  guestCountryStyle: {
    fontSize: 10,
    color: "#000",
    marginLeft: 5
  },
  button: {
    backgroundColor: "#2756a1",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    height: 50
    //textAlign:'center'
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails);
