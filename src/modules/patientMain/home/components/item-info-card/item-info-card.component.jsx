import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Spacer } from "../../../../../components";
import {
  Description,
  Info,
  Title,
  IngredientCard,
  TitleSection,
} from "./item-info-card.styles";

const ItemInfoCard = ({ recipe }) => {
  const navigation = useNavigation();
  const { name } = recipe;

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate("Recipe", { recipe: recipe });
    }}>
      <IngredientCard elevation={2}>
        <Info>
          <TitleSection>
            <Title variant="bold">{name}</Title>
          </TitleSection>
          <Spacer position="top" size="medium" />
          <Description numberOfLines={3} ellipsizeMode="tail">
            {`Dar click para ver detalle de receta`}
          </Description>
        </Info>
      </IngredientCard>
    </TouchableOpacity>
  );
};

export default ItemInfoCard;
