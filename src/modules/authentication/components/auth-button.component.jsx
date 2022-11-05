import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const AuthButton = styled(Button).attrs({
  labelStyle: {
    color: "black",
  },
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  border-radius: 30px;
  background-color: white;
`;
