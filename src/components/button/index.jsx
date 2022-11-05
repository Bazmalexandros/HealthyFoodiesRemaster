import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const Btn = styled(Button).attrs({
  labelStyle: {
    color: "white",
  },
})`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 30px;
  color: white;
  background-color: ${(props) => props.theme.colors.brand.hf};
`;
