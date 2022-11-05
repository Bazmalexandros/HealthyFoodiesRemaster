import { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
//Estilos para los componentes de la vista
import { TextWrapper } from "./login.styles";
//Componentes del módulo
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  AuthLabelContainer,
  AuthLabel,
  InputLabel,
  Logo,
} from "../../components";
//Componentes Generales
import { Spacer, Loading, Text } from "../../../../components";
//Contexto de Autenticación
import { AuthenticationContext } from "../../../../services";

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { isLoading, onLogin } = useContext(AuthenticationContext);

  /**
   * Función que se ejecuta al presionar el botón de inicio de sesión
   * Esta función captura los datos del estado y los envía para autenticación
   */
  const onLoginPress = async () => {
    if (!state.email || !state.password) {
      Toast.show({
        type: "error",
        text1: "Algo salió mal",
        text2: "Por favor no dejes ningún campo vacío",
        topOffset: 100,
      });
      return;
    }

    await onLogin(state.email, state.password);
  };

  return (
    <AccountBackground>
      {/* <AccountCover /> */}
      {isLoading && <Loading />}
      <AccountContainer>
        <Logo />
        <Spacer size="medium">
          <InputLabel variant="caption">Correo Electrónico</InputLabel>
        </Spacer>
        <AuthInput
          placeholder="Escribe tu correo electrónico"
          value={state.email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(email) => setState({ ...state, email })}
        />

        <Spacer size="large" />

        <Spacer size="medium">
          <InputLabel variant="caption">Contraseña</InputLabel>
        </Spacer>
        <AuthInput
          placeholder="Escribe tu contraseña"
          value={state.password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          secure
          onChangeText={(password) => setState({ ...state, password })}
        />
        <Spacer size="large" />

        <TextWrapper>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <AuthLabel variant="caption">¿Olvidaste tu contraseña?</AuthLabel>
          </TouchableOpacity>
        </TextWrapper>

        <Spacer size="large" />

        {!isLoading && (
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            textColor="black"
            onPress={() => onLoginPress()}
          >
            Iniciar Sesión
          </AuthButton>
        )}
      </AccountContainer>
    </AccountBackground>
  );
};

export default LoginScreen;
