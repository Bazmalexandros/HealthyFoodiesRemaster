import { useState, useEffect } from "react";
import { SafeArea, Loading, FadeInView, Search } from "../../../../components";
import { ButtonWrapper, ItemsList, ItemTouchCard } from "./recipe-table.styles";
import { RecipeInfoCard } from "../../components";
import { recipesRequest } from "../../../../services/recipes/recipes.service";

const RecipeTable = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [keyword, setKeyword] = useState("");

  //create a method to get ingredientes
  const onGetRecipes = async () => {
    setIsLoading(true);
    try {
      const result = await recipesRequest();
      setRecipes(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeText = async (text) => {
    if (!text) {
      setKeyword("");
      const result = await recipesRequest();
      setRecipes(result);
      return;
    }
    setKeyword(text);
  };

  const onFilterTable = () => {
    const newArray = recipes.filter(function (recipe) {
      const name = recipe.name.toLowerCase();
      return name.includes(keyword.toLowerCase());
    });

    setRecipes(newArray);
  };

  useEffect(() => {
    onGetRecipes();
  }, []);

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
          title="recetas"
          keyword
          onSubmitEditing={onFilterTable}
          onChangeText={onChangeText}
        />
      </ButtonWrapper>

      <ItemsList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={recipes}
        numColumns={1}
        renderItem={({ item }) =>
          item.id !== "dialibre" && (
            <ItemTouchCard
              onPress={() =>
                navigation.navigate("Receta-Detalles", {
                  recipe: item,
                  refresh: true,
                })
              }
            >
              <FadeInView>
                <RecipeInfoCard recipe={item} />
              </FadeInView>
            </ItemTouchCard>
          )
        }
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};

export default RecipeTable;
