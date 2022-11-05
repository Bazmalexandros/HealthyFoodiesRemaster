import styled from "styled-components/native";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";

export const ItemCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 100%;
`;

export const ItemCardCover = styled(Card.Cover).attrs({
  resizeMode: "contain",
})`
  padding: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Info = styled(View)`
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
`;

export const Description = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  height: 75px;
`;
