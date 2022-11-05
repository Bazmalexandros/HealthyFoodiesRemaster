import { useContext, useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Avatar, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AvatarContainer, SettingsItem } from "./settings.styles";
import { AuthenticationContext } from "../../../../../services";
import { HorizontalRule, SafeArea, Spacer } from "../../../../../components";
import logo from "../../../../../../assets/logo.png";
import { colors } from "../../../../../infrastructure/theme/colors";

const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  /**
   * Con esta función podemos recuperar la foto de perfil del usuario que se ha guardado en el dispositivo
   * @param {UserCredential} currentUser Usuario sesión
   */
  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useEffect(() => {
    getProfilePicture(user);
  }, [user]);

  return (
    <SafeArea>
      <ScrollView>
        <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            {!photo ? (
              <Avatar.Image
                size={120}
                source={logo}
                backgroundColor="transparent"
              />
            ) : (
              <Avatar.Image
                size={120}
                source={{ uri: photo }}
                backgroundColor="transparent"
              />
            )}
          </TouchableOpacity>
        </AvatarContainer>

        <Spacer size="large" />

        <Spacer position="top" size="large">
          <HorizontalRule text={`Información del usuario`} />
        </Spacer>

        <List.Section>
          <SettingsItem
            title="Editar perfil"
            description="Edita tu información personal"
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.brand.tec}
                icon="account-edit"
              />
            )}
            onPress={() => navigation.navigate("EditProfile")}
          />

          <SettingsItem
            title="Cerrar sesión"
            left={(props) => (
              <List.Icon {...props} color={colors.brand.tec} icon="door" />
            )}
            onPress={onLogout}
          />
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};

export default SettingsScreen;
