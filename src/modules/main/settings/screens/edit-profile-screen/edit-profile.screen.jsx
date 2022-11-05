import { useState, useContext, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
//Componentes del módulo
import {
  AccountContainer,
  AuthButton,
  AuthLabelContainer,
  AuthLabel,
  Title,
} from "./edit-profile.styles";
//Componentes Generales
import {
  Spacer,
  Loading,
  SafeArea,
  Text,
  CustomInput,
} from "../../../../../components";
//Contexto de Autenticación
import { AuthenticationContext } from "../../../../../services";
import { keysAreEmpty, trimObject } from "../../../../../utils/object.utils";

const EditProfileScreen = ({ navigation }) => {
  const [state, setState] = useState({});
  const { isLoading, onGetUserInfo, user, onUpdateUserInfo } = useContext(
    AuthenticationContext
  );

  /**
   * Función que se ejecuta al presionar el botón de registro
   * Esta función captura los datos del estado y los envía para autenticación
   */
  const onUpdatePress = async () => {
    const toastParams = {
      type: "error",
      text1: "Algo salió mal",
      text2: "",
      topOffset: 100,
    };

    console.log(state);
    const validateState = keysAreEmpty(state);

    if (!validateState)
      toastParams.text2 = "Por favor no dejes ningún campo vacío";

    if (toastParams.text2 !== "") {
      Toast.show(toastParams);
      return;
    }

    const trimmedState = trimObject(state);

    const result = await onUpdateUserInfo(trimmedState);
    if (result) navigation.navigate("Settings");
  };

  /**
   * Función para recuperar los datos del usuario par asignarlos al estado
   */
  const getUserData = async () => {
    const userData = await onGetUserInfo(user.uid);
    delete userData.imgUrl;
    setState(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) return null;

  /**
   * Función para asignar los valores de los inputs al estado
   * @param {string} key Nombre del input
   * @param {string} value Valor del input
   */
  const handleChangeText = (key) => (value) => {
    setState({ ...state, [key]: value });
  };

  return (
    <SafeArea>
      <ScrollView>
        <AccountContainer>
          <Title>Editar Perfil</Title>

          <CustomInput
            size="medium"
            label="Nombre completo"
            value={state.name}
            keyboardType="default"
            onChangeText={handleChangeText("name")}
          />

          <Spacer size="large" />

          {/* <CustomInput
            size="medium"
            label="Correo Electrónico"
            value={state.email}
            keyboardType="emailAddress"
            onChangeText={handleChangeText("email")}
          />

          <Spacer size="large" /> */}

          <CustomInput
            size="medium"
            label="Número de Teléfono"
            value={state.phone}
            keyboardType="phone-pad"
            onChangeText={handleChangeText("phone")}
          />

          <Spacer size="large" />

          {!isLoading && !state.hasOwnProperty("error") ? (
            <Spacer size="large">
              <AuthButton
                mode="contained"
                textColor="black"
                onPress={() => onUpdatePress()}
              >
                Actualizar Info
              </AuthButton>
            </Spacer>
          ) : state.hasOwnProperty("error") ? (
            <Text variant="caption">
              Ocurrio un error en el servidor por favor intenta más tarde
            </Text>
          ) : (
            <Loading />
          )}

          <Spacer size="large" />

          <Spacer size="medium">
            <AuthLabelContainer>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AuthLabel variant="bold">Volver atrás</AuthLabel>
              </TouchableOpacity>
            </AuthLabelContainer>
          </Spacer>

          <Spacer size="large" />
        </AccountContainer>
      </ScrollView>
    </SafeArea>
  );
};

export default EditProfileScreen;
