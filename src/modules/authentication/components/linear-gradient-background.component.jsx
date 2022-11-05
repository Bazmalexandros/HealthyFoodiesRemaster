import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const LinearGradientBackground = styled(LinearGradient).attrs({
  colors: ["#80C244", "#81c24473"],
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
