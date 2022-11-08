import { useState, useContext, useEffect, Fragment } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Stacks para crear las vistas de cada módulo
import { MainNavigator } from "./main-navigation";
import { IngredientNavigator } from "./ingredient-navigation";
import { RecipeNavigator } from "./recipe-navigation";
import { MealPlanNavigator } from "./meal-plan-navigation";
import { PatientMainNavigator } from "./main-patient-navigation";
import { PatientNavigator } from "./patient-navigation";
import { AssistantNavigator } from "./assistant-navigation";
import { colors } from "../theme/colors";
import { CustomDrawer } from "../../components";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { getUserInfo } from "../../services/authentication/authentication.service";
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { user } = useContext(AuthenticationContext);
  const [role, setRole] = useState("");

  const retrieveUserData = async () => {
    const data = await getUserInfo(user.uid);
    setRole(data.typeUser);
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

  if (role === "") return null;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.brand.hf },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
        drawerLabelStyle: { marginLeft: -25 },
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: colors.brand.hf,
        drawerInactiveTintColor: "#333",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >

      {role === "3" ? (
        <Drawer.Screen
          name="patientMain"
          component={PatientMainNavigator}
          options={{
            title: "Paciente",
            drawerIcon: ({ color }) => (
              <FontAwesome5 name="user-cog" size={22} color={color} />
            ),
          }}
        />
      ) : (
        <Fragment>
          <Drawer.Screen
            name="main"
            component={MainNavigator}
            options={{
              title: "Inicio",
              drawerIcon: ({ color }) => (
                <MaterialIcons name="dashboard" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="ingredient"
            component={IngredientNavigator}
            options={{
              title: "Ingredientes",
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="pepper-hot" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="recipe"
            component={RecipeNavigator}
            options={{
              title: "Recetas",
              drawerIcon: ({ color }) => (
                <Foundation name="book-bookmark" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="mealPlan"
            component={MealPlanNavigator}
            options={{
              title: "Planes de comidas",
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="food-apple"
                  size={22}
                  color={color}
                />
              ),
            }}
          />

          {role === "1" && (
            <Fragment>
              <Drawer.Screen
                name="patient"
                component={PatientNavigator}
                options={{
                  title: "Pacientes",
                  drawerIcon: ({ color }) => (
                    <FontAwesome name="user" size={22} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="assistant"
                component={AssistantNavigator}
                options={{
                  title: "Asistentes",
                  drawerIcon: ({ color }) => (
                    <FontAwesome5 name="user-cog" size={22} color={color} />
                  ),
                }}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </Drawer.Navigator>
  );
};
