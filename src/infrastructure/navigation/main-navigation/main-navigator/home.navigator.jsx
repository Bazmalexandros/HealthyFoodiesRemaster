import { createStackNavigator } from "@react-navigation/stack";
const HomeStack = createStackNavigator();
import { HomeScreen } from "../../../../modules/main/home/screens";

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
