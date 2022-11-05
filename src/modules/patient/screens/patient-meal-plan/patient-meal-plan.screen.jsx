import { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import Toast from "react-native-toast-message";
//Componentes del módulo
import {
  AccountContainer,
  AuthButton,
  AuthLabelContainer,
  AuthLabel,
  Title,
  listStyles,
} from "./patient-meal-plan.styles";
//Componentes Generales
import {
  Spacer,
  Loading,
  SafeArea,
  Text,
  CustomInput,
} from "../../../../components";
//Contexto de Autenticación
import { keysAreEmpty } from "../../../../utils/object.utils";
import {
  patientsRequest,
  updateMealPlanId,
} from "../../../../services/patients/patients.service";
import { mealPlansRequest } from "../../../../services/mealPlan/mealPlan.service";
import { getFirebaseMessage } from "../../../../utils/firebase.utils";
import { colors } from "../../../../infrastructure/theme/colors";
import { labelsTransform } from "../../../../utils/labels"; 

const PatientMealFormScreen = () => {
  const navigation = useNavigation();

  const initState = {
    userId: "",
    mealId: "",
  };

  const [state, setState] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);

  const onGetData = async () => {
    try {
      setIsLoading(true);
        const user = await patientsRequest();
        const userTransform = labelsTransform(user, "id","name");
      const meal = await mealPlansRequest();
      const mealTransform = labelsTransform(meal, "id", "name");
      setUsers(userTransform);
      setMeals(mealTransform);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getFirebaseMessage(error.code),
      });
    }
  };

  useEffect(() => {
    onGetData();
  }, []);

  const clearState = () => {
    setState(initState);
    state.userId = "";
    state.mealId = "";

    setState({ userId: "", mealId: "" });
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

    setIsLoading(true);
    const response = await updateMealPlanId(state.userId, state.mealId);
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
      text2: `Plan de comidas asignado correctamente`,
      topOffset: 100,
    });

    if (result) {
      navigation.navigate("Pacientes", { refresh: true });
      clearState();
    }
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <AccountContainer>
            <Title>Asignar plan de comida</Title>

            <Spacer size="medium">
              <AuthLabel variant="caption">Paciente</AuthLabel>
              <Spacer size="medium" />
              <Card elevation={2} mode="elevated">
                <SelectList
                  setSelected={(value) => {
                    setState({ ...state, userId: value });
                  }}
                  data={users}
                  placeholder="Selecciona un paciente"
                  searchPlaceholder="Buscar paciente"
                  boxStyles={listStyles}
                  dropdownStyles={listStyles}
                />
              </Card>
            </Spacer>

            <Spacer size="large" />

            <Spacer size="medium">
              <AuthLabel variant="caption">Plan de comida</AuthLabel>
              <Spacer size="medium" />
              <Card elevation={2} mode="elevated">
                <SelectList
                  setSelected={(value) => {
                    setState({ ...state, mealId: value });
                  }}
                  data={meals}
                  placeholder="Selecciona un plan"
                  searchPlaceholder="Buscar plan"
                  boxStyles={listStyles}
                  dropdownStyles={listStyles}
                />
              </Card>
            </Spacer>
            <Spacer size="large" />
            <Spacer size="large" />
            {!isLoading ? (
              <>
                <Spacer size="large">
                  <AuthButton
                    mode="contained"
                    textColor="black"
                    onPress={() => onPressIngredient()}
                  >
                    Registrar
                  </AuthButton>
                </Spacer>
                <Spacer size="large" />

                <Spacer size="medium">
                  <AuthLabelContainer>
                    <TouchableOpacity
                      onPress={() => {
                        setState(initState);
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

export default PatientMealFormScreen;
