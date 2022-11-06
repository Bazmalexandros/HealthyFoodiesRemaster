import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";
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

export const IngredientCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 100%;
`;

export const TitleSection = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled(Text)`
  margin: auto 0;
  width: 75%;
`;

export const ButtonWrapper = styled(View)`
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CircleButton = styled(TouchableOpacity)`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 100px;
  margin: 0 auto;
`;
