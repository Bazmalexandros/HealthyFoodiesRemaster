import styled from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "../../../../../components";

export const ItemsTitle = styled(Text)`
  padding: ${(props) => props.theme.space[3]};
`;

export const ItemsList = styled(FlatList)`
  padding: ${(props) => props.theme.space[3]};
`;

export const ItemTouchCard = styled(TouchableOpacity)`
  height: 100px;
  max-height: 100px;
  margin: 8px 6px;
`;

