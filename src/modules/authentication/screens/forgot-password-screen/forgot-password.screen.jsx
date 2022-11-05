import { Fragment,useState, useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
//Componentes del módulo
import {
  LinearGradientBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  AuthLabelContainer,
  AuthLabel,
  Description,
  InputLabel,
  Logo,
} from "../../components";
//Componentes Generales
import { Spacer, Loading } from "../../../../components";
//Contexto de Autenticación
import { AuthenticationContext } from "../../../../services";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { isLoading, onForgotPassword } = useContext(AuthenticationContext);

  /**
   * Función que se ejecuta al presionar el botón de registro
   * Esta función captura los datos del estado y los envía para autenticación
   */
  const onForgotPress = async () => {
    const toastParams = {
      type: "error",
      text1: "Algo salió mal",
      text2: "",
      topOffset: 100,
    };

    if (!email) {
      toastParams.text2 = "Por favor no dejes el correo vacío";
      Toast.show(toastParams);
      return;
    }

    const result = await onForgotPassword(email.trim());
    if (result) {
      navigation.goBack();
    }
  };

  return (
    <LinearGradientBackground>
      {isLoading && <Loading />}
        <AccountContainer>
          <Logo />
          <Spacer size="large">
            <Description variant="label">
              Escribe tu correo electrónico y recibirás un correo para que
              puedas modificar tu contraseña.
            </Description>
          </Spacer>
          <Spacer size="large">
            <InputLabel variant="caption">Correo Electrónico</InputLabel>
          </Spacer>
          <AuthInput
            placeholder="Correo Electrónico"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            type="outlined"
            onChangeText={(email) => setEmail(email)}
          />

          <Spacer size="large" />

          {!isLoading && (
            <Fragment>
              <Spacer size="large">
                <AuthButton
                  mode="contained"
                  textColor="black"
                  onPress={() => onForgotPress()}
                >
                  Restablecer
                </AuthButton>
              </Spacer>
              <Spacer size="large" />
              <Spacer size="large">
                <AuthLabelContainer>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AuthLabel variant="bold">Volver atrás</AuthLabel>
                  </TouchableOpacity>
                </AuthLabelContainer>
              </Spacer>
            </Fragment>
          )}

          <Spacer size="large" />
        </AccountContainer>
    </LinearGradientBackground>
  );
};

export default ForgotPasswordScreen;
