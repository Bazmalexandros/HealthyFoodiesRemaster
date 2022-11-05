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
  flex: 0.5;
  height: 310px;
  max-height: 310px;
  margin: 4px 6px;
`;

