import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import Toast from "react-native-toast-message";
//Tema personalizado
import { theme } from "./src/infrastructure/theme";
//Tipografías
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular, Lato_900Black } from "@expo-google-fonts/lato";
//Estructura de navegación
import Navigation from "./src/infrastructure/navigation";
//Configuración de Toast
import { toastConfig } from "./src/infrastructure/configuration/toast.config";
//Provider de Autenticación
import { AuthenticationContextProvider } from "./src/services";

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular, Lato_900Black });

  //Si las fuentes no se han cargado retorna un nulo hasta que carguen
  if (!oswaldLoaded || !latoLoaded) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <Toast config={toastConfig} />
      <StatusBar style="auto" />
    </>
  );
}
