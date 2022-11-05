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
import { itemsMock } from "../../../../../services/items/items.mock";
import { AuthenticationContext } from "../../../../../services";
import { getUserInfo } from "../../../../../services/authentication/authentication.service";
import { getMealPlanById } from "../../../../../services/mealPlan/mealPlan.service";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items] = useState(itemsMock);

  const { user } = useContext(AuthenticationContext);
  const [userDetails, setUserDetails] = useState({});
  const [mealPlanGlobal, setMealPlanGlobal] = useState({});

  const retrieveUserData = async () => {
    const data = await getUserInfo(user.uid);
    setUserDetails(data);
  };

  const getMealPlanById = async () => {
    const mealPlan = await getMealPlanById(user.mealPlanId);
    const mealPlanDetail = await getMealDetails(mealPlan);
    setMealPlanGlobal(mealPlanDetail);
    const d = new Date(Date.now());
    const day = d.getDay();
    switch (day) {
      case 1:
        setMealPlanGlobal(mealPlanDetail.moday);
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
      case 7:
        setMealPlanGlobal(mealPlanDetail.sunday);
        break;
    }
  };

  useEffect(() => {
    retrieveUserData();
    getMealPlanById();
  }, []);

  return (
    <SafeArea>
      {isLoading && <Loading />}
      <ItemsTitle variant="label">
        Bienvenido de vuelta paciente{`${user.displayName}`}. Aquí está tu dieta
        para el día de hoy
      </ItemsTitle>
      <Text>Hola prueba</Text>
    </SafeArea>
  );
};

export default HomeScreen;
