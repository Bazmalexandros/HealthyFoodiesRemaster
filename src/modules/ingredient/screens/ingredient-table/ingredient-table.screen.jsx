import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  SafeArea,
  Loading,
  FadeInView,
  Search,
} from "../../../../components";
import {
  ButtonWrapper,
  ItemsList,
  ItemTouchCard,
} from "./ingredient-table.styles";
import { IngredientInfoCard } from "../../components";
import { ingredientsRequest } from "../../../../services/ingredients/ingredients.service";

const IngredientTable = ({ navigation }) => {
    const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [keyword, setKeyword] = useState("");

  //create a method to get ingredientes
  const onGetIngredients = async () => {
    setIsLoading(true);
    try {
      const result = await ingredientsRequest();
      setIngredients(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeText = async (text) => {
    if (!text) {
      setKeyword("");
      const result = await ingredientsRequest();
      setIngredients(result);
      return;
    }
    setKeyword(text);
  };

  const onFilterTable = () => {
    const newArray = ingredients.filter(function (ingredient) {
      const name = ingredient.name.toLowerCase();
      return name.includes(keyword.toLowerCase());
    });

    setIngredients(newArray);
  }

  useEffect(() => {
    onGetIngredients();
  }, [route.params]);

  if (isLoading) {
    return (
      <SafeArea>
        <Loading />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ButtonWrapper>
        <Search
          title="ingredientes"
          keyword
          onSubmitEditing={onFilterTable}
          onChangeText={onChangeText}
        />
      </ButtonWrapper>

      <ItemsList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={ingredients}
        numColumns={1}
        renderItem={({ item }) => (
          <ItemTouchCard>
            <FadeInView>
              <IngredientInfoCard ingredient={item} />
            </FadeInView>
          </ItemTouchCard>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};

export default IngredientTable;
