import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Spacer } from "../../../../components";
import {
  Description,
  Info,
  Title,
  IngredientCard,
  ButtonWrapper,
  TitleSection,
  CircleButton,
} from "./meal-plan-info-card.styles";
import { deleteMealPlan } from "../../../../services/mealPlan/mealPlan.service";
const MealPlanInfoCard = ({ meal }) => {
  const navigation = useNavigation();
  const { id, name } = meal;

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
          const response = await deleteMealPlan(id);
          if (response) {
            Toast.show({
              type: "success",
              text1: "Proceso completado",
              text2: "Plan eliminado correctamente",
              topOffset: 100,
            });

            navigation.reset({
              index: 0,
              routes: [{ name: "Comidas" }],
            });
          }
        },
      },
    ]);

  return (
    <IngredientCard elevation={2}>
      <Info>
        <TitleSection>
          <Title variant="bold">{name}</Title>
          <ButtonWrapper>
            <CircleButton
              onPress={() => {
                navigation.navigate("mealPlan", {
                  screen: "Agregar/Editar",
                  params: {
                    meal: meal,
                  },
                });

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Agregar/Editar" }],
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
          {`Id: ${id}`}
        </Description>
      </Info>
    </IngredientCard>
  );
};

export default MealPlanInfoCard;
