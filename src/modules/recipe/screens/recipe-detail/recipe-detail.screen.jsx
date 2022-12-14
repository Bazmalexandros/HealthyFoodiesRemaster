import { useEffect, useState } from "react";
import { ScrollView, Image, Text } from "react-native";
import { List } from "react-native-paper";
import { SafeArea, Loading } from "../../../../components";
import { colors } from "../../../../infrastructure/theme/colors";
import banner from "../../../../../assets/detail.jpg";
import { getRecipeById } from "../../../../services/recipes/recipes.service";

const RecipeDetailScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState(route.params.recipe);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);

  const calculateTotalCalories = () => {
    let totalCalories = 0;
    let totalFat = 0;
    const { ingredients } = recipe;
    ingredients.forEach((item) => {
      totalCalories += parseFloat(item.calories);
      totalFat += parseFloat(item.fat);
    });



    setCalories(parseFloat(totalCalories));
    setFat(parseFloat(totalFat));
  };

  const getMealDetail = async () => {
    setIsLoading(true);
    const response = await getRecipeById(recipe.id);
    if (response) {
      setRecipe(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMealDetail();
  }, []);

  useEffect(() => {
    calculateTotalCalories();
  }, [recipe]);

  if (isLoading) {
    return (
      <SafeArea>
        <Loading />
      </SafeArea>
    );
  }

  const { id, name, preparation, ingredients, ingredientsList } = recipe;
  return (
    <SafeArea>
      <ScrollView>
        <Image
          resizeMode="cover"
          source={banner}
          style={{ flex: 1, height: 300 }}
        />
        <List.Accordion
          title={`Ingredientes para ${name}`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="apple" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {id === "dialibre"
            ? null
            : ingredientsList.map((ingredient, index) => {
                if (JSON.stringify(ingredient) === "{}") return;
                return (
                  <List.Item
                    key={index}
                    title={ingredient.name}
                    description={`Calor??as: ${ingredient.calories}cal Fat: ${
                      ingredient.fat
                    }\n${
                      typeof ingredient.quantity === "undefined"
                        ? ""
                        : `Cantidad: ${ingredient.quantity} - ${
                            typeof ingredient.amount === "undefined"
                              ? ""
                              : `Porci??n: ${ingredient.amount}`
                          }`
                    }`}
                    titleStyle={{ color: colors.brand.hf }}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={colors.brand.hf}
                        icon="circle"
                      />
                    )}
                  />
                );
              })}
        </List.Accordion>

        <List.Accordion
          title={"Preparaci??n"}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="coffee" />
          )}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          expanded={true}
          right={(props) => null}
        >
          <List.Item
            title={() => (
              <Text style={{ color: colors.ui.secondary }} numberOfLines={20}>
                {id === "dialibre"
                  ? "La receta queda a consideraci??n del paciente, puede realizar las comidas que sean de su preferencia."
                  : preparation}
              </Text>
            )}
          />
        </List.Accordion>
        {id !== "dialibre" && (
          <List.Accordion
            title={"Calor??as y grasas totales"}
            left={(props) => (
              <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
            )}
            style={{ backgroundColor: colors.brand.hf }}
            titleStyle={{ color: colors.ui.quaternary }}
            expanded={true}
            right={(props) => null}
          >
            <List.Item
              title={() => (
                <Text style={{ color: colors.ui.secondary }} numberOfLines={20}>
                  {`Calor??as: ${calories}cal    Fat: ${fat}`}
                </Text>
              )}
            />
          </List.Accordion>
        )}
      </ScrollView>
    </SafeArea>
  );
};

export default RecipeDetailScreen;
