import { createStackNavigator } from "@react-navigation/stack";
const HomeStack = createStackNavigator();
import {
  HomeScreen,
  RecipeDetailScreen,
} from "../../../../modules/patientMain/home/screens";

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Recipe" component={RecipeDetailScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
