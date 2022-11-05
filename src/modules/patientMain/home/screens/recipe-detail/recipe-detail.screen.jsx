import { ScrollView, Image, Text } from "react-native";
import { List } from "react-native-paper";
import { SafeArea } from "../../../../../components";
import { colors } from "../../../../../infrastructure/theme/colors";
import banner from "../../../../../../assets/detail.jpg";

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const { name, preparation, ingredients } = recipe;
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
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {ingredients.map((ingredient, index) => (
            <List.Item
              key={index}
              title={ingredient.name}
              description={`Calorías: ${ingredient.calories}cal   Fat: ${ingredient.fat}`}
              titleStyle={{ color: colors.brand.hf }}
              left={(props) => (
                <List.Icon {...props} color={colors.brand.hf} icon="circle" />
              )}
            />
          ))}
        </List.Accordion>

        <List.Accordion
          title={"Preparación"}
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
                {preparation}
              </Text>
            )}
          />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};

export default RecipeDetailScreen;
