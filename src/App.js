import {createSwitchNavigator, createStackNavigator} from 'react-navigation';
// import LoginScreen from './views/login/home'
// import RegisterScreen from './views/register/home'
import DrawerNav from './navigation/drawer';
import Initializing from './views/Initializing';
const AppContainer = createSwitchNavigator(
  {
    Initialize: {screen: Initializing},
    // Unauthorized: {
    //     screen: createStackNavigator({
    //         LoginScreen,
    //         RegisterScreen,
    //     },
    //     {
    //         //headerMode: 'none',
    //         mode: 'modal',
    //         cardStyle: {
    //             backgroundColor: "transparent",
    //             opacity: 0.99,
    //         },
    //         tabBarOptions: {
    //             tabBarVisible: false
    //         },
    //         tabBar: {
    //             visible: false
    //         }
    //     })
    // },
    Authorized: {screen: DrawerNav},
  },
  {initialRouteName: 'Initialize', headerMode: 'none'},
);

export default AppContainer; // createAppContainer(AppContainer)

try {
  console.disableYellowBox = true;
  console.clear();
  // eslint-disable-next-line no-empty
} catch (e) {}
