import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
//import IngredientTable component
import {
  PatientTable,
  PatientFormScreen,
  PatientMealFormScreen,
} from "../../../modules/patient/screens";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS = [
  {
    name: "tableP",
    title: "Pacientes",
    icon: "user",
    component: PatientTable,
  },
  {
    name: "AddP",
    title: "Agregar/Editar",
    icon: "plus-circle",
    component: PatientFormScreen,
  },
  {
    name: "mealPlanP",
    title: "Asignar Plan",
    icon: "book",
    component: PatientMealFormScreen,
  },
];

export const PatientNavigator = () => (
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
