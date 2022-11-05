import { useState, useEffect } from "react";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeArea, Loading } from "../../../../components";
import { colors } from "../../../../infrastructure/theme/colors";
import banner from "../../../../../assets/meal2.jpg";
import { getMealDetails } from "../../../../services/mealPlan/mealPlan.service";

const MealPlanDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [meal, setMeal] = useState(props.route.params.meal);

  const getMealDetail = async () => {
    setIsLoading(true);
    const response = await getMealDetails(meal);
    if (response) {
      setMeal(response);
    }
    setIsLoading(false);
  };

  const navigation = useNavigation();
  useEffect(() => {
    getMealDetail();
  }, []);

 if (isLoading) {
   return (
     <SafeArea>
       <Loading />
     </SafeArea>
   );
 }

  const {
    name,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = meal;
  return (
    <SafeArea>
      <ScrollView>
        <Image
          resizeMode="cover"
          source={banner}
          style={{ flex: 1, height: 300 }}
        />
        <List.Accordion
          title={`Plan para lunes`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {monday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>

        <List.Accordion
          title={`Plan para martes`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {tuesday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>

        <List.Accordion
          title={`Plan para miércoles`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {wednesday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>

        <List.Accordion
          title={`Plan para jueves`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {thursday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>

        <List.Accordion
          title={`Plan para viernes`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {friday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>

        <List.Accordion
          title={`Plan para sábado`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {saturday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>

        <List.Accordion
          title={`Plan para domingo`}
          style={{ backgroundColor: colors.brand.hf }}
          titleStyle={{ color: colors.ui.quaternary }}
          left={(props) => (
            <List.Icon {...props} color={colors.ui.quaternary} icon="food" />
          )}
          expanded={true}
          right={(props) => null}
        >
          {sunday.map((recipe, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("recipe", {
                  screen: "Recetas Menu",
                  params: {
                    screen: "Receta-Detalles",
                    params: {
                      recipe: recipe,
                      refresh: true,
                    },
                  },
                })
              }
              key={index}
            >
              <List.Item
                title={recipe.name}
                description={`Click para revisar mejor`}
                titleStyle={{ color: colors.brand.hf }}
                left={(props) => (
                  <List.Icon {...props} color={colors.brand.hf} icon="circle" />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};

export default MealPlanDetailScreen;
