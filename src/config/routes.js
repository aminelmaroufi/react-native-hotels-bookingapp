import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../pages/Home';
import HotelDetails from '../pages/HotelDetails';
import CheckRooms from '../pages/CheckRooms';
import Account from '../pages/Account';
import Overview from '../pages/Overview';
import Book from '../pages/Book';
import Resume from '../pages/Resume';

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'Hotels',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    HotelDetails: {
      screen: HotelDetails,
      navigationOptions: ({navigation}) => ({
        title: 'Hotel Details',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    CheckRooms: {
      screen: CheckRooms,
      navigationOptions: ({navigation}) => ({
        title: 'Choose Rooms',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        title: 'Your personal info',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    Overview: {
      screen: Overview,
      navigationOptions: ({navigation}) => ({
        title: 'Overview',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    Book: {
      screen: Book,
      navigationOptions: ({navigation}) => ({
        title: 'Book',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    Resume: {
      screen: Resume,
      navigationOptions: ({navigation}) => ({
        title: 'Resume',
        headerStyle: {
          backgroundColor: '#2756a1',
        },
        headerLeft: null,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppRoute = createAppContainer(MainNavigator);

export default AppRoute;
