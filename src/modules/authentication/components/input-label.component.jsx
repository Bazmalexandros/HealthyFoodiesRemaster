import styled from "styled-components/native";
import { Text } from "../../../components";

export const InputLabel = styled(Text)`
  padding: ${(props) => props.theme.space[1]} 0px;
  color: white;
  font-weight: bold;
`;
