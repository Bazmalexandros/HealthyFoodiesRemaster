import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const WrapperFull = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px ${(props) => props.theme.space[4]};
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: black;
`;

const TextWrapper = styled.View`
  margin: 0px ${(props) => props.theme.space[2]};
`;

const TextLine = styled(Text)`
  width: 100%;
  text-align: center;
`;

export const HorizontalRule = ({ text = "" }) => {
  return (
    <Wrapper>
      <Line />
      {text && (
        <>
          <TextWrapper>
            <TextLine variant="caption">{text}</TextLine>
          </TextWrapper>
          <Line />
        </>
      )}
    </Wrapper>
  );
};

export const Hr = () => <WrapperFull />;
