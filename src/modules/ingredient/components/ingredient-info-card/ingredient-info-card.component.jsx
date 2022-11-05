import { Entypo } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Spacer, Text } from "../../../../components";
import {
  Description,
  Info,
  Title,
  IngredientCard,
  ButtonWrapper,
  TitleSection,
  CircleButton,
} from "./ingredient-info-card.styles";
import { deleteIngredient } from "../../../../services/ingredients/ingredients.service";

const IngredientInfoCard = ({ ingredient }) => {
  const navigation = useNavigation();
  const { id, name, calories, fat } = ingredient;

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
          const response = await deleteIngredient(id);
          if (response) {
            Toast.show({
              type: "success",
              text1: "Proceso completado",
              text2: "Ingrediente eliminado correctamente",
              topOffset: 100,
            });

            navigation.reset({
              index: 0,
              routes: [{ name: "Ingredientes" }],
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
                navigation.navigate("ingredient", {
                  screen: "Agregar/Editar",
                  params: {
                    ingredient: ingredient,
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
          {`Calorías: ${calories}cal   Fat: ${fat}\nId: ${id}`}
        </Description>
      </Info>
    </IngredientCard>
  );
};

export default IngredientInfoCard;
