import { createStackNavigator } from "@react-navigation/stack";
const SettingsStack = createStackNavigator();
import {
  CameraScreen,
  SettingsScreen,
  EditProfileScreen,
} from "../../../../modules/main/settings/screens";

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
      <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
    </SettingsStack.Navigator>
  );
};
