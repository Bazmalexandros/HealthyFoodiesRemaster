import { createStackNavigator } from "@react-navigation/stack";
const HomeStack = createStackNavigator();
import {
  RecipeTable,
  RecipeDetailScreen,
} from "../../../modules/recipe/screens";

const RecipesNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Recetas" component={RecipeTable} />
      <HomeStack.Screen name="Receta-Detalles" component={RecipeDetailScreen} />
    </HomeStack.Navigator>
  );
};

export default RecipesNavigator;
