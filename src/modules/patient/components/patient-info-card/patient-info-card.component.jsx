import { useState, useEffect, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Spacer } from "../../../../components";
import {
  Info,
  Title,
  IngredientCard,
  ButtonWrapper,
  TitleSection,
  CircleButton,
  Description,
} from "./patient-info-card.styles";
import { deletePatient } from "../../../../services/patients/patients.service";
import { getMealPlanById } from "../../../../services/mealPlan/mealPlan.service";
import { AuthenticationContext } from "../../../../services";

const PatientInfoCard = ({ patient }) => {
  const navigation = useNavigation();
  const { id, name, mealPlanId, email, password } = patient;
  const [mealPlan, setMealPlan] = useState({});
  const { user } = useContext(AuthenticationContext);

  const onGetMealPlan = async () => {
    try {
      const mealPlan = await getMealPlanById(mealPlanId);
      setMealPlan(mealPlan);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getFirebaseMessage(error.code),
      });
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert("¿Estás seguro?", `Se eliminará el registro ${name}`, [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: async () => {
          const response = await deletePatient(id, email, password, user.uid);
          if (response) {
            Toast.show({
              type: "success",
              text1: "Proceso completado",
              text2: "Paciente eliminado correctamente",
              topOffset: 100,
            });

            navigation.navigate("Pacientes", { refresh: true });
          }
        },
      },
    ]);

  useEffect(() => {
    onGetMealPlan();
  });

  return (
    <IngredientCard elevation={2}>
      <Info>
        <TitleSection>
          <Title variant="bold">{name}</Title>
          <ButtonWrapper>
            <CircleButton
              onPress={() => {
                navigation.navigate("patient", {
                  screen: "Agregar/Editar",
                  params: {
                    patient: patient,
                  },
                });
              }}
            >
              <Entypo
                style={{ width: "100%", height: "100%" }}
                name="edit"
                size={22}
                color={"steelblue"}
              />
            </CircleButton>
            <CircleButton onPress={createTwoButtonAlert}>
              <Entypo
                style={{ width: "100%", height: "100%" }}
                name="trash"
                size={22}
                color={"indianred"}
              />
            </CircleButton>
          </ButtonWrapper>
        </TitleSection>
        <Spacer position="top" size="medium" />
        <Description numberOfLines={3} ellipsizeMode="tail">
          {mealPlanId
            ? `Actualmente llevando: ${mealPlan.name}`
            : "Sin plan de comidas"}
        </Description>
      </Info>
    </IngredientCard>
  );
};

export default PatientInfoCard;
