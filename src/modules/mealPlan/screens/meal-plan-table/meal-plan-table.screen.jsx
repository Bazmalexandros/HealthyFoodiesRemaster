import { useState, useEffect } from "react";
import { SafeArea, Loading, FadeInView, Search } from "../../../../components";
import { ButtonWrapper, ItemsList, ItemTouchCard } from "./meal-plan-table.styles";
import { MealPlanInfoCard } from "../../components";
import { mealPlansRequest } from "../../../../services/mealPlan/mealPlan.service";

const MealPlanTable = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);

  const [keyword, setKeyword] = useState("");

  //create a method to get ingredientes
  const onGetRecipes = async () => {
    setIsLoading(true);
    try {
      const result = await mealPlansRequest();
      setMealPlans(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeText = async (text) => {
    if (!text) {
      setKeyword("");
      const result = await mealPlansRequest();
      setMealPlans(result);
      return;
    }
    setKeyword(text);
  };

  const onFilterTable = () => {
    const newArray = mealPlans.filter(function (mealPlan) {
      const name = mealPlan.name.toLowerCase();
      return name.includes(keyword.toLowerCase());
    });

    setMealPlans(newArray);
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
          title="planes de comidas"
          keyword
          onSubmitEditing={onFilterTable}
          onChangeText={onChangeText}
        />
      </ButtonWrapper>

      <ItemsList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={mealPlans}
        numColumns={1}
        renderItem={({ item }) => (
          <ItemTouchCard
            onPress={() =>
              navigation.navigate("Comidas-Detalles", {
                meal: item,
                refresh: true,
              })
            }
          >
            <FadeInView>
              <MealPlanInfoCard meal={item} />
            </FadeInView>
          </ItemTouchCard>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};

export default MealPlanTable;
