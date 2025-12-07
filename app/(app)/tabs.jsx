
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./main";
import Perfil from "./perfil";


const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="main">
      <Tab.Screen name="main" component={Main}></Tab.Screen>
      <Tab.Screen name="perfil" component={Perfil}></Tab.Screen>
    </Tab.Navigator>
  );
}
