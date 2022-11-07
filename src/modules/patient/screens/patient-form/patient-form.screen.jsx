import { useState, useEffect, useContext } from "react";
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
} from "./patient-form.styles";
//Componentes Generales
import { Spacer, SafeArea, CustomInput } from "../../../../components";
//Contexto de Autenticación
import { keysAreEmpty, trimObject } from "../../../../utils/object.utils";
import {
  updatePatient,
  createPatient,
} from "../../../../services/patients/patients.service";
import { getFirebaseMessage } from "../../../../utils/firebase.utils";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services";

const PatientFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthenticationContext);

  const initState = {
    id: "",
    name: "",
    fatherSurname: "",
    motherSurname: "",
    age: "",
    bmi: "",
    email: "",
    password: "",
    lastPassword: "",
    genre: "",
    height: "",
    mass: "",
    phone: "",
  };

  const [state, setState] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params != undefined) {
      setState(route.params.patient);
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
    state.age = "";
    state.bmi = "";
    state.email = "";
    state.password = "";
    state.genre = "";
    state.height = "";
    state.mass = "";
    state.phone = "";

    setState({
      id: "",
      name: "",
      fatherSurname: "",
      motherSurname: "",
      age: "",
      bmi: "",
      email: "",
      password: "",
      lastPassword: "",
      genre: "",
      height: "",
      mass: "",
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
      age: state.age,
      bmi: state.bmi,
      email: state.email,
      password: state.password,
      genre: state.genre,
      height: state.height,
      mass: state.mass,
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
      lastPassword = route.params.patient.password;
      lastEmail = route.params.patient.email;
    }

    setIsLoading(true);
    let response =
      state.id !== ""
        ? await updatePatient(
            trimmedState,
            state.password,
            lastEmail,
            lastPassword,
            user.uid
          )
        : await createPatient(trimmedState, state.password, user.uid);
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
      text2: `Paciente ${
        state.id !== "" ? "actualizado" : "registrado"
      } correctamente`,
      topOffset: 100,
    });

    if (result) {
     navigation.navigate("Pacientes", { refresh: true });
      clearState();
    }
  };

  const getBMIValue = () => {
    if (state.height === "" || state.mass === "") return "";
    const height = parseFloat(state.height);
    const mass = parseFloat(state.mass);
    const bmi = mass / (height * height);
    setState({ ...state, bmi: bmi.toFixed(2) });
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
            <Title>{state.id ? "Actualizar" : "Registrar"} Paciente</Title>

            <CustomInput
              size="medium"
              label="Nombre del paciente"
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
              label="Edad"
              value={state.age}
              keyboardType="numeric"
              onChangeText={handleChangeText("age")}
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
              label="Género"
              value={state.genre}
              keyboardType="default"
              onChangeText={handleChangeText("genre")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Peso (kg)"
              value={state.mass}
              keyboardType="numeric"
              onChangeText={handleChangeText("mass")}
              onEndEditing={() => getBMIValue()}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Estatura (m)"
              value={state.height}
              keyboardType="numeric"
              onChangeText={handleChangeText("height")}
              onEndEditing={() => getBMIValue()}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="IMC"
              value={state.bmi}
              keyboardType="numeric"
              onChangeText={handleChangeText("bmi")}
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

export default PatientFormScreen;
