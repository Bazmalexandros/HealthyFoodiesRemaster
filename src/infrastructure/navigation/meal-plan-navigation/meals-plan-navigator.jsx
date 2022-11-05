import { createStackNavigator } from "@react-navigation/stack";
const HomeStack = createStackNavigator();
import {
  MealPlanTable,
  MealPlanDetailScreen,
} from "../../../modules/mealPlan/screens";

const MealsPlanNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Comidas" component={MealPlanTable} />
      <HomeStack.Screen
        name="Comidas-Detalles"
        component={MealPlanDetailScreen}
      />
    </HomeStack.Navigator>
  );
};

export default MealsPlanNavigator;
