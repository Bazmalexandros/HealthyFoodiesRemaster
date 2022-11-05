import { useContext } from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { DrawerItemList } from "@react-navigation/drawer";

import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";
import logo from "../../../assets/logowhite.png";
import background from "../../../assets/background.jpg";

const DrawerView = styled.View`
  flex: 1;
`;

const DrawerBackground = styled(ImageBackground).attrs({
  source: background,
})`
  padding: ${(props) => props.theme.space[5]} ${(props) => props.theme.space[4]}
    ${(props) => props.theme.space[4]} ${(props) => props.theme.space[4]};
`;

const DrawerText = styled(Text)`
  color: white;
`;

const ItemsView = styled.View`
  flex: 1;
  background-color: white;
  padding-top: ${(props) => props.theme.space[2]};
`;

const FooterWrapper = styled.View.attrs({
  padding: 20,
  borderTopWidth: 1,
  borderTopColor: "#ccc",
})``;

const ImageLogo = styled(Image).attrs({
  source: logo,
  resizeMode: "cover",
  })`
  width: 130px;
  height: 100px;
  margin-bottom: 30px;
`;

import { AuthenticationContext } from "../../services";
import { Ionicons } from "@expo/vector-icons";

export const CustomDrawer = (props) => {
  const { user, onLogout } = useContext(AuthenticationContext);

  return (
    <DrawerView>
      <DrawerBackground>
        <ImageLogo />
        <Spacer size="medium" position={"bottom"}>
          <DrawerText variant="caption">{user.email}</DrawerText>
        </Spacer>
        {user.displayName && (
          <Spacer size="medium" position={"bottom"}>
            <DrawerText variant="caption">{user.displayName}</DrawerText>
          </Spacer>
        )}
      </DrawerBackground>
      <ItemsView>
        <DrawerItemList {...props} />
      </ItemsView>
      <FooterWrapper>
        <TouchableOpacity onPress={onLogout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons style={{ marginRight: 15 }} name="log-out" size={22} />
            <Text variant="caption">Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </FooterWrapper>
    </DrawerView>
  );
};
