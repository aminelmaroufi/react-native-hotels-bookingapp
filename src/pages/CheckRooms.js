import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Image,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Rating, Button } from "react-native-elements";
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

class CheckRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>non-refundable</Text>

            <View style={[styles.row, { marginTop: 15 }]}>
              <Icon
                name="group"
                size={12}
                color="#000"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.groupStyle}>Price for 2 adults</Text>
            </View>
          </View>
          <Image
            source={{ uri: item.room_pic_url }}
            style={{
              height: 70,
              width: 60,
              marginTop: 10
            }}
          />
        </View>
        <View style={[styles.row, { marginTop: 15 }]}>
          <Icon
            name="compress"
            size={12}
            color="#000"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.groupStyle}>Room size 20 m²</Text>
        </View>
        <View style={[styles.row, { marginTop: 15 }]}>
          <Icon
            name="coffee"
            size={12}
            color="#2756a1"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.foodStyle}>{item.advantage}</Text>
        </View>
        <View style={[styles.row, { marginTop: 30 }]}>
          <View style={[styles.row, { marginRight: 10 }]}>
            <Icon
              name="wifi"
              size={12}
              color="#2756a1"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.foodStyle}>Free WIFI</Text>
          </View>
          <View style={[styles.row, { marginRight: 10 }]}>
            <Icon
              name="bath"
              size={12}
              color="#2756a1"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.foodStyle}>Bath</Text>
          </View>
          <View style={[styles.row, { marginRight: 10 }]}>
            <Icon
              name="code"
              size={12}
              color="#2756a1"
              style={{ marginRight: 5, marginTop: 2 }}
            />
            <Text style={styles.foodStyle}>Air conditioning</Text>
          </View>
          <View style={[styles.row, { marginRight: 15 }]}>
            <Icon
              name="shower"
              size={12}
              color="#2756a1"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.foodStyle}>Private bathroom</Text>
          </View>
        </View>
        <Text style={styles.price}>€{item.price}</Text>
        <View style={{ flex: 1, marginTop: 30 }}>
          <Button
            title="Select"
            containerStyle={{ width: "auto" }}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            type="solid"
            onPress={() => this._selectRoom(item)}
          />
        </View>
      </View>
    );
  };

  _selectRoom = room => {
    let { reservation } = this.props;
    const price = parseInt(reservation.night_numbers) * room.price;
    reservation = { ...reservation, price, room };
    this.props.onUpdateReservation(reservation);
    this.props.navigation.navigate("Account");
  };

  render() {
    const { reservation } = this.props;
    const { rooms } = reservation.hotel;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={rooms}
          numColumns={1}
          keyExtractor={item => item._id}
          renderItem={item => this._renderItem(item)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  item: {
    flex: 1,
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: "#f4ab49",
    marginBottom: 25
  },
  row: {
    flexDirection: "row"
  },
  title: {
    fontSize: 17,
    color: "#2756a1",
    fontWeight: "bold"
  },
  subTitle: {
    fontSize: 12,
    color: "#000",
    marginTop: 5
  },
  groupStyle: {
    fontSize: 13,
    color: "#000"
  },
  foodStyle: {
    fontSize: 13,
    color: "#2756a1"
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginTop: 30
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#2756a1"
  },
  textButton: {
    color: "#2756a1",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckRooms);
