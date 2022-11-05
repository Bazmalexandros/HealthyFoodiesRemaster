import styled from "styled-components/native";
import { TextInput } from "react-native";

export const AuthInput = styled(TextInput)`
  width: 300px;
  border-radius: 15px;
  overflow: hidden;
  color: ${(props) => props.theme.colors.brand.gris};
  text-decoration: none;
  background-color: white;
  padding: ${(props) => props.theme.space[3]};
`;