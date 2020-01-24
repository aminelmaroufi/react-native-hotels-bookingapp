import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import { getHotels, selectHotel } from "../actions/reservation";

const mapStateToProps = (state, newProps) => {
  return {
    hotels: state.reservation.hotels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetHotels: hotels => {
      dispatch(getHotels());
    },
    onSelectHotel: hotel => {
      dispatch(selectHotel(hotel));
    }
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onGetHotels();
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.hotelRow}
        onPress={() => this.selectHotel(item)}
      >
        <Image
          source={{ uri: item.pic1_url }}
          style={{
            height: 190,
            width: 130
          }}
        />
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.name}</Text>
            <Rating
              imageSize={13}
              readonly
              startingValue={item.rating}
              style={{ paddingTop: 3 }}
            />
          </View>
          <View style={styles.row}>
            <Icon
              name="map-marker"
              size={13}
              color="#000"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.adress}>{item.short_address}</Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              position: "absolute",
              bottom: 5,
              right: 10
            }}
          >
            <Text style={styles.room}>{item.type}</Text>
            <Text style={styles.price}>€{item.rooms[0].price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  selectHotel = item => {
    this.props.onSelectHotel(item);
    this.props.navigation.navigate("HotelDetails");
  };

  render() {
    const { hotels } = this.props;
    console.log("hotels:", hotels);
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={hotels}
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
    padding: 10
  },
  hotelRow: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#f4ab49"
  },
  row: {
    flexDirection: "row",
    padding: 10
  },
  info: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    marginRight: 7
  },
  adress: {
    fontSize: 14,
    color: "#000"
  },
  room: {
    fontSize: 12,
    color: "#000"
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
