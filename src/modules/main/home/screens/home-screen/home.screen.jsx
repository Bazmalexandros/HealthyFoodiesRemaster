import { useState, useContext, useEffect } from "react";
import { Dimensions } from "react-native";
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

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items] = useState(itemsMock);
  const width = Dimensions.get("window").width;

  const { user } = useContext(AuthenticationContext);
  const [role, setRole] = useState("");

  const retrieveUserData = async () => {
    const data = await getUserInfo(user.uid);
    setRole(data.typeUser);
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

  return (
    <SafeArea>
      {isLoading && <Loading />}
      {role !== "3" ? (
        <>
          <ItemsTitle variant="label">
            Bienvenido de vuelta {role === "2" ? "Asistente" : "Nutriólogo"}.
            ¿Qué deseas hacer hoy?
          </ItemsTitle>
          <ItemsList
            contentContainerStyle={{ paddingBottom: 30 }}
            data={items}
            numColumns={2}
            renderItem={({ item }) => {
              if (
                role === "2" &&
                (item.title === "Pacientes" || item.title === "Asistentes")
              )
                return;
              return (
                <ItemTouchCard
                  onPress={() => {
                    navigation.navigate(item.titleEn, item.route);
                  }}
                >
                  <Spacer position={"bottom"} size={"small"}>
                    <FadeInView>
                      <ItemInfoCard item={item} />
                    </FadeInView>
                  </Spacer>
                </ItemTouchCard>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : null}
    </SafeArea>
  );
};

export default HomeScreen;
