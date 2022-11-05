import { Component } from "react";
import {  Spacer, Text } from "../../../../../components";
import {
  Description,
  Info,
  ItemCard,
  ItemCardCover,
} from "./item-info-card.styles";


export default class ItemInfoCard extends Component {
  constructor({ item }) {
    super();
    this.item = item;
  }

  render() {
    const { id, title, image, description } = this.item;

    return (
      <ItemCard elevation={2}>
        <ItemCardCover key={id} source={image} />
        <Info>
          <Text variant="bold">{title}</Text>
          <Spacer position="top" size="medium" />
          <Description numberOfLines={3} ellipsizeMode="tail">
            {description}
          </Description>
        </Info>
      </ItemCard>
    );
  }
}
