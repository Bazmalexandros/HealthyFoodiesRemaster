import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Text } from "../../../../components";
import MultiSelect from "react-native-multiple-select";
import { TextInput, View } from "react-native";

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

export const IngredientesView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};

`;

export const Label = styled(Text)`
  color: black;
  font-weight: bold;
  flex: 0.5;
  padding: ${(props) => props.theme.space[3]};
`;


export const Input = styled(TextInput)`
  color: black;
  text-decoration: none;
  background-color: white;
  border-color: black;
  flex: 0.5;
  padding: ${(props) => props.theme.space[3]};
`;