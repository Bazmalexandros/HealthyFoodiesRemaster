import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import MealsPlanNavigator from "./meals-plan-navigator";
import { colors } from "../../theme/colors";
//import IngredientTable component
import {
  MealPlanFormScreen,
} from "../../../modules/mealPlan/screens";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS = [
  {
    name: "tableR",
    title: "Comidas Menu",
    icon: "book",
    component: MealsPlanNavigator,
  },
  {
    name: "AddR",
    title: "Agregar/Editar",
    icon: "plus-circle",
    component: MealPlanFormScreen,
  },
];

export const MealPlanNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.brand.hf,
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    }}
  >
    {TAB_OPTIONS.map((option) => (
      <Tab.Screen
        key={option.name}
        name={option.title}
        component={option.component}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={option.icon} size={size} color={color} />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);
