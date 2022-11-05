import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import {colors} from '../../infrastructure/theme/colors'

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;


const SpinnerWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const SpinnerIndicator = styled(ActivityIndicator)`
  justify-content: center;
  align-items: center;
`;

export const Loading = () => (
  <LoadingContainer>
    <SpinnerWrapper>
      <SpinnerIndicator size={50} animating={true} color={Colors.green500} />
    </SpinnerWrapper>
  </LoadingContainer>
);
