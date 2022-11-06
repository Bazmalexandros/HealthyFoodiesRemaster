import { Spacer } from "../../../../../components";
import {
  Description,
  Info,
  Title,
  IngredientCard,
  TitleSection,
} from "./item-info-card.styles";

const ItemInfoCard = ({ recipe }) => {
  const { name } = recipe;

  return (
    <IngredientCard elevation={2}>
      <Info>
        <TitleSection>
          <Title variant="bold">{name}</Title>
        </TitleSection>
        <Spacer position="top" size="medium" />
        <Description numberOfLines={3} ellipsizeMode="tail">
          Dar click para ver detalle de receta
        </Description>
      </Info>
    </IngredientCard>
  );
};

export default ItemInfoCard;
