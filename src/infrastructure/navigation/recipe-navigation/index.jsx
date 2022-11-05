import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import RecipesNavigator from "./recipes-navigator";
import { colors } from "../../theme/colors";
//import IngredientTable component
import { RecipeFormScreen } from "../../../modules/recipe/screens";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS = [
  {
    name: "tableR",
    title: "Recetas Menu",
    icon: "book",
    component: RecipesNavigator,
  },
  {
    name: "AddR",
    title: "Agregar/Editar",
    icon: "plus-circle",
    component: RecipeFormScreen,
  },
];

export const RecipeNavigator = () => (
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
