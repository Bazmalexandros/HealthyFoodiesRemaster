import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Text } from "../../../../components";
import MultiSelect from "react-native-multiple-select";

export const listStyles = {
  borderRadius: 15,
  backgroundColor: "white",
  textDecoration: "none",
  overflow: "hidden",
  borderColor: "transparent",
};

export const Select = styled(MultiSelect)`
  border-radius: 15px;
  color: black;
  border-color: black;
`;

export const AccountContainer = styled.View`
  background-color: transparent;
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  labelStyle: {
    color: "white",
  },
})`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.brand.hf};
`;

export const AuthLabelContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const AuthLabel = styled(Text)`
  color: black;
`;

export const Title = styled(Text)`
  font-size: 30px;
  text-align: center;
  margin-bottom: ${(props) => props.theme.space[3]};
`;
