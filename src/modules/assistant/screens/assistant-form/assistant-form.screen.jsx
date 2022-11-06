import { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
//Componentes del módulo
import {
  AccountContainer,
  AuthButton,
  AuthLabelContainer,
  AuthLabel,
  Title,
} from "./assistant-form.styles";
//Componentes Generales
import { Spacer, SafeArea, CustomInput } from "../../../../components";
//Contexto de Autenticación
import { keysAreEmpty, trimObject } from "../../../../utils/object.utils";
import {
  updateAssistant,
  createAssistant,
} from "../../../../services/assistants/assistants.service";
import { getFirebaseMessage } from "../../../../utils/firebase.utils";
import { colors } from "../../../../infrastructure/theme/colors";

const AssistantFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const initState = {
    id: "",
    name: "",
    fatherSurname: "",
    motherSurname: "",
    email: "",
    password: "",
    lastPassword: "",
    phone: "",
  };

  const [state, setState] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params != undefined) {
      setState(route.params.assistant);
    } else {
      setState(initState);
      route.params = undefined;
    }
  }, [route.params]);

  const clearState = () => {
    setState(initState);
    state.id = "";
    state.name = "";
    state.fatherSurname = "";
    state.motherSurname = "";
    state.email = "";
    state.password = "";
    state.phone = "";

    setState({
      id: "",
      name: "",
      fatherSurname: "",
      motherSurname: "",
      email: "",
      password: "",
      lastPassword: "",
      phone: "",
    });
    route.params = undefined;
  };

  /**
   * Función que se ejecuta al presionar el botón de registro
   * Esta función captura los datos del estado y los envía para autenticación
   */
  const onPressPatient = async () => {
    const toastParams = {
      type: "error",
      text1: "Algo salió mal",
      text2: "",
      topOffset: 100,
    };

    const data = {
      id: state.id,
      name: state.name,
      fatherSurname: state.fatherSurname,
      motherSurname: state.motherSurname,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };

    const validateState = keysAreEmpty(data);

    if (!validateState)
      toastParams.text2 = "Por favor no dejes ningún campo vacío";

    if (toastParams.text2 !== "") {
      Toast.show(toastParams);
      return;
    }

    const trimmedState = trimObject(state);
    let lastPassword;
    let lastEmail;

    if (state.id) {
      lastPassword = route.params.assistant.password;
      lastEmail = route.params.assistant.email;
    }

    setIsLoading(true);
    let response =
      state.id !== ""
        ? await updateAssistant(
            trimmedState,
            state.password,
            lastEmail,
            lastPassword
          )
        : await createAssistant(trimmedState, state.password);
    let result = true;

    if (typeof response !== "boolean") {
      const message = getFirebaseMessage(response.code);
      toastParams.text2 = message;
      Toast.show(toastParams);
      result = false;
    }
    setIsLoading(false);
    Toast.show({
      type: "success",
      text1: "Proceso completado",
      text2: `Asistente ${
        state.id !== "" ? "actualizado" : "registrado"
      } correctamente`,
      topOffset: 100,
    });

    if (result) {
      navigation.navigate("Asistentes", { refresh: true });
      clearState();
    }
  };

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <AccountContainer>
            <Title>{state.id ? "Actualizar" : "Registrar"} Asistente</Title>

            <CustomInput
              size="medium"
              label="Nombre del asistente"
              value={state.name}
              keyboardType="default"
              onChangeText={handleChangeText("name")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Apellido paterno"
              value={state.fatherSurname}
              keyboardType="default"
              onChangeText={handleChangeText("fatherSurname")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Apellido materno"
              value={state.motherSurname}
              keyboardType="default"
              onChangeText={handleChangeText("motherSurname")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Email"
              value={state.email}
              keyboardType="email-address"
              onChangeText={handleChangeText("email")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Contraseña"
              value={state.password}
              keyboardType="password"
              onChangeText={handleChangeText("password")}
            />

            <Spacer size="large" />
            <CustomInput
              size="medium"
              label="Número de teléfono"
              value={state.phone}
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"
              }
              onChangeText={handleChangeText("phone")}
            />

            <Spacer size="large" />

            {!isLoading ? (
              <>
                <Spacer size="large">
                  <AuthButton
                    mode="contained"
                    textColor="black"
                    onPress={() => onPressPatient()}
                  >
                    {state.id ? "Actualizar" : "Registrar"}
                  </AuthButton>
                </Spacer>
                <Spacer size="large" />

                <Spacer size="medium">
                  <AuthLabelContainer>
                    <TouchableOpacity
                      onPress={() => {
                        setState(initState);
                        route.params = undefined;
                      }}
                    >
                      <AuthLabel variant="bold">Limpiar</AuthLabel>
                    </TouchableOpacity>
                  </AuthLabelContainer>
                </Spacer>
              </>
            ) : (
              <ActivityIndicator
                animating={isLoading}
                color={colors.brand.hf}
              />
            )}

            <Spacer size="large" />
          </AccountContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default AssistantFormScreen;
