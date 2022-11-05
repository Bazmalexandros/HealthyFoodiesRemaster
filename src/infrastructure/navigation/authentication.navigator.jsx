import {
  ForgotPasswordScreen,
  LoginScreen
} from "../../modules/authentication/screens";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
