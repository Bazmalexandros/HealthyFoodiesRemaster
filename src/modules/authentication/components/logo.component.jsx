import styled from "styled-components";
import { Image, View, Dimensions } from "react-native";
//Título de la imagen
import logo from "../../../../assets/logowhite.png";

const { width, height } = Dimensions.get("window");

const LogoContainer = styled(View)`
  align-items: center;
  width: ${width * 0.8}px;
  height: ${height * 0.25}px;
  z-index: 20;
`;

const LogoImage = styled(Image).attrs({
  resizeMode: "contain",
})`
  width: 100%;
  height: 100%;
`;

export const Logo = () => (
  <LogoContainer>
    <LogoImage source={logo} />
  </LogoContainer>
);
