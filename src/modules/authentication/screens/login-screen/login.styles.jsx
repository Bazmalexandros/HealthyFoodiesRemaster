import styled from "styled-components/native";

export const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 300px;
  margin-bottom: ${(props) => props.theme.space[4]};
`;
