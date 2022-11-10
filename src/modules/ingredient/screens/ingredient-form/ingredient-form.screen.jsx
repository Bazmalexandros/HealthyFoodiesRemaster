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
} from "./ingredient-form.styles";
//Componentes Generales
import {
  Spacer,
  Loading,
  SafeArea,
  Text,
  CustomInput,
} from "../../../../components";
//Contexto de Autenticación
import { keysAreEmpty, trimObject } from "../../../../utils/object.utils";
import {
  createIngredient,
  updateIngredient,
} from "../../../../services/ingredients/ingredients.service";
import { getFirebaseMessage } from "../../../../utils/firebase.utils";
import { colors } from "../../../../infrastructure/theme/colors";

const IngredientFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const initState = {
    id: "",
    name: "",
    calories: "",
    fat: "",
  };

  const [state, setState] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params != undefined) {
      setState(route.params.ingredient);
    } else {
      setState(initState);
      route.params = undefined;
    }
  }, [route.params]);

  const clearState = () => {
    setState(initState);
    state.id = "";
    state.calories = "";
    state.fat = "";
    state.name = "";
    setState({ id: "", name: "", calories: "", fat: "" });
    route.params = undefined;
  };

  /**
   * Función que se ejecuta al presionar el botón de registro
   * Esta función captura los datos del estado y los envía para autenticación
   */
  const onPressIngredient = async () => {
    const toastParams = {
      type: "error",
      text1: "Algo salió mal",
      text2: "",
      topOffset: 100,
    };

    const validateState = keysAreEmpty(state);

    if (!validateState)
      toastParams.text2 = "Por favor no dejes ningún campo vacío";

    if (toastParams.text2 !== "") {
      Toast.show(toastParams);
      return;
    }

    const trimmedState = trimObject(state);

    setIsLoading(true);
    let response =
      state.id !== ""
        ? await updateIngredient(trimmedState)
        : await createIngredient(trimmedState);
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
      text2: `Ingrediente ${
        state.id !== "" ? "actualizado" : "registrado"
      } correctamente`,
      topOffset: 100,
    });

    if (result) {
      navigation.reset({
        index: 1,
        routes: [{ name: "Ingredientes", params: { refresh: true } }],
      });
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
            <Title>{state.id ? "Actualizar" : "Registrar"} Ingrediente</Title>

            <CustomInput
              size="medium"
              label="Nombre del Ingrediente"
              value={state.name}
              keyboardType="default"
              onChangeText={handleChangeText("name")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Calorías"
              value={state.calories}
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"
              }
              onChangeText={handleChangeText("calories")}
            />

            <Spacer size="large" />

            <CustomInput
              size="medium"
              label="Grasas"
              value={state.fat}
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"
              }
              onChangeText={handleChangeText("fat")}
            />

            <Spacer size="large" />

            {!isLoading ? (
              <>
                <Spacer size="large">
                  <AuthButton
                    mode="contained"
                    textColor="black"
                    onPress={() => onPressIngredient()}
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

export default IngredientFormScreen;
