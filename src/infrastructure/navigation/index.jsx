import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { DrawerNavigator } from "./drawer.navigator";
import { AuthenticationNavigator } from "./authentication.navigator";
import { AuthenticationContext } from "../../services";

const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
