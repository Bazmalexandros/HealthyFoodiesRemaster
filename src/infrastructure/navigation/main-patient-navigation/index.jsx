import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
//Stacks para crear las vistas de cada módulo
import { HomeNavigator, SettingsNavigator } from "./main-navigator";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS = [
  {
    name: "HomeP",
    title: "Inicio",
    icon: "home",
    component: HomeNavigator,
  },
  {
    name: "HomeP",
    title: "Progreso",
    icon: "home",
    component: HomeNavigator,
  },
  {
    name: "SettingsB",
    title: "Configuración",
    icon: "cog",
    component: SettingsNavigator,
  },
];

export const PatientMainNavigator = () => (
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
            <FontAwesome name={option.icon} size={size} color={color} />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);
