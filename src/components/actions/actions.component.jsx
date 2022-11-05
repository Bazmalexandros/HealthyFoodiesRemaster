import { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../infrastructure/theme/colors";
import { ProductsContext, FavouritesContext } from "../../services";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const ActionButton = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[3]};
  z-index: 9;
`;

export const Actions = ({ product }) => {
  const navigation = useNavigation();
  const { onDeleteProduct } = useContext(ProductsContext);
  const { removeToFavourites } = useContext(FavouritesContext);

  return (
    <Wrapper>
      <ActionButton
        onPress={() =>
          navigation.navigate("AddProduct", {
            product: product,
          })
        }
      >
        <AntDesign name={"edit"} size={24} color={colors.brand.hf} />
      </ActionButton>
      <ActionButton
        onPress={async () => {
          removeToFavourites(product);
          const result = await onDeleteProduct(product);
          if (result) {
            Toast.show({
              type: "success",
              text1: `Producto eliminado`,
              text2: `El producto fue eliminado con éxito`,
              topOffset: 100,
            });

            navigation.navigate("MyProducts");
            navigation.reset({
              index: 0,
              routes: [{ name: "MyProducts" }],
            });
          } else {
            Toast.show({
              type: "error",
              text1: `Algo salió mal`,
              text2: `Falló la eliminación de el producto`,
              topOffset: 100,
            });
          }
        }}
      >
        <AntDesign name={"delete"} size={24} color={"red"} />
      </ActionButton>
    </Wrapper>
  );
};
