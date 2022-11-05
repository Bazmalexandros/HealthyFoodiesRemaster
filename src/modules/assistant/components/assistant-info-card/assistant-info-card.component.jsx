import { useState,useEffect } from 'react';
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
 
} from "./assistant-info-card.styles";
import { deleteAssistant } from "../../../../services/assistants/assistants.service";

const AssistantInfoCard = ({ assistant }) => {
  const navigation = useNavigation();
  const { id, name, email, password} = assistant;


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
          const response = await deleteAssistant(id, email, password);
          if (response) {
            Toast.show({
              type: "success",
              text1: "Proceso completado",
              text2: "Asistente eliminado correctamente",
              topOffset: 100,
            });

            navigation.reset({
              index: 0,
              routes: [{ name: "Asistentes" }],
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
                navigation.navigate("assistant", {
                  screen: "Agregar/Editar",
                  params: {
                    assistant: assistant,
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
      </Info>
    </IngredientCard>
  );
};

export default AssistantInfoCard;
