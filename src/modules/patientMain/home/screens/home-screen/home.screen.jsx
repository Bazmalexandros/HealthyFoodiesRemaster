import { useState, useContext, useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import {
  SafeArea,
  Loading,
  Spacer,
  Text,
  FadeInView,
} from "../../../../../components";
import { ItemsTitle, ItemsList, ItemTouchCard } from "./home.styles";
import { ItemInfoCard } from "../../components";
import { AuthenticationContext } from "../../../../../services";
import { getUserInfo } from "../../../../../services/authentication/authentication.service";
import {
  getMealPlanById,
  getMealDetails,
} from "../../../../../services/mealPlan/mealPlan.service";

const daysName = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  
}

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const [userDetails, setUserDetails] = useState({});
  const [mealPlanGlobal, setMealPlanGlobal] = useState([]);
  const [dayValue, setDayValue] = useState(0);

  const retrieveUserData = async () => {
    setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await getUserInfo(user.uid);
        const mealPlan = await getMealPlanById(data.mealPlanId);
        const mealPlanDetail = await getMealDetails(mealPlan);

        setUserDetails(data);

        const d = new Date(Date.now());
        const day = d.getDay();
        setDayValue(day);
        switch (day) {
          case 1:
            setMealPlanGlobal(mealPlanDetail.monday);
            break;
          case 2:
            setMealPlanGlobal(mealPlanDetail.tuesday);
            break;
          case 3:
            setMealPlanGlobal(mealPlanDetail.wednesday);
            break;
          case 4:
            setMealPlanGlobal(mealPlanDetail.thursday);
            break;
          case 5:
            setMealPlanGlobal(mealPlanDetail.friday);
            break;
          case 6:
            setMealPlanGlobal(mealPlanDetail.saturday);
            break;
          case 0:
            setMealPlanGlobal(mealPlanDetail.sunday);
            break;
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

  return (
    <SafeArea>
      {isLoading && <Loading />}
      <ItemsTitle variant="label">
        Bienvenido de vuelta paciente {userDetails.name}. Aquí está tu dieta
        para el día de hoy {daysName[dayValue]}.
      </ItemsTitle>
      <ItemsList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={mealPlanGlobal}
        numColumns={1}
        renderItem={({ item }) => {
          if (item.hasOwnProperty("line")) return;
          return (
            <ItemTouchCard
              onPress={() => {
                navigation.navigate("Recipe", { recipe: item });
              }}
            >
              <Spacer position={"bottom"} size={"small"}>
                <FadeInView>
                  <ItemInfoCard recipe={item} />
                </FadeInView>
              </Spacer>
            </ItemTouchCard>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};

export default HomeScreen;
