import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
//import IngredientTable component
import {
  AssistantTable,
  AssistantFormScreen,
} from "../../../modules/assistant/screens";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS = [
  {
    name: "tableA",
    title: "Asistentes",
    icon: "user",
    component: AssistantTable,
  },
  {
    name: "AddA",
    title: "Agregar/Editar",
    icon: "plus-circle",
    component: AssistantFormScreen,
  },

];

export const AssistantNavigator = () => (
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
