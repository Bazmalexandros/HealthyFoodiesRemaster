// import component
import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import Toast from "react-native-toast-message";
import { ingredientsRequest } from "../../../../services/ingredients/ingredients.service";
import { Spacer, SafeArea, CustomInput } from "../../../../components";

import {
  AccountContainer,
  AuthButton,
  AuthLabelContainer,
  AuthLabel,
  Title,
  Select
} from "./recipe-form.styles";

import { colors } from "../../../../infrastructure/theme/colors";

import {
  createRecipe,
  updateRecipe,
} from "../../../../services/recipes/recipes.service";
import { getFirebaseMessage } from "../../../../utils/firebase.utils";
import { keysAreEmpty } from "../../../../utils/object.utils";

const initState = {
  isLoading: false,
  selectedItems: [],
  ingredients: [],
  id: "",
  name: "",
  preparation: "",
};

export default class RecipeFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  async onGetIngredients() {
    try {
      const result = await ingredientsRequest();
      this.setState({ ingredients: result });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.onGetIngredients();
    const { route } = this.props;

    if (route.params != undefined) {
      const { recipe } = route.params;
      this.setState(recipe);
      this.setState({ isLoading: false });
      this.setState({
        selectedItems: recipe.ingredients,
      });
      this.setState({ name: recipe.name });
      this.setState({ preparation: recipe.preparation });
      this.setState({ id: recipe.id });
    }
  }

  clear() {
    this.state.id = "";
    this.state.name = "";
    this.state.preparation = "";
    this.props.route.params = undefined;
    this.setState(initState);
    this.setState({ id: "" });
    this.setState({ name: "" });
    this.setState({ preparation: "" });
    this.onGetIngredients();
  }

  /**
   * Función para asignar los valores de los inputs al estado
   * @param {string} key Nombre del input
   * @param {string} value Valor del input
   */
  handleChangeText = (key) => (value) => {
    this.setState({ ...this.state, [key]: value });
  };

  async onPressRecipe() {
    const data = {};
    data.id = this.state.id;
    data.name = this.state.name;
    data.ingredients = this.state.selectedItems;
    data.preparation = this.state.preparation;
    data.active = 1;

    const toastParams = {
      type: "error",
      text1: "Algo salió mal",
      text2: "",
      topOffset: 100,
    };

    if (data.ingredients.length === 0) {
      toastParams.text2 = "Debe seleccionar al menos un ingrediente";
      Toast.show(toastParams);
      return;
    }

    const validateState = keysAreEmpty(data);

    if (!validateState)
      toastParams.text2 = "Por favor no dejes ningún campo vacío";

    if (toastParams.text2 !== "") {
      Toast.show(toastParams);
      return;
    }

    this.setState({ isLoading: true });
    let response =
      this.state.id !== ""
        ? await updateRecipe(data)
        : await createRecipe(data);
    let result = true;
    if (typeof response !== "boolean") {
      const message = getFirebaseMessage(response.code);
      toastParams.text2 = message;
      Toast.show(toastParams);
      this.setState({ isLoading: false });
      result = false;
    }
    this.setState({ isLoading: false });
    Toast.show({
      type: "success",
      text1: "Proceso completado",
      text2: `Receta ${
        this.state.id !== "" ? "actualizada" : "registrada"
      } correctamente`,
      topOffset: 100,
    });

    const { navigation } = this.props;

    if (result) {
      this.clear();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Recetas Menu",
            params: {
              screen: "Recetas",
              refresh: true,
            },
          },
        ],
      });
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  render() {
    const { selectedItems, ingredients } = this.state;

    return (
      <SafeArea>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <AccountContainer>
              <Title>{this.state.id ? "Actualizar" : "Registrar"} Receta</Title>

              <CustomInput
                size="medium"
                label="Nombre de la receta"
                value={this.state.name}
                keyboardType="default"
                onChangeText={this.handleChangeText("name")}
              />

              <Spacer size="large" />
              <Spacer size="large" />
              <View>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
      
                      items={ingredients}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={selectedItems}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona los ingredientes"
                      searchInputPlaceholderText="Buscar ingredientes..."
                      altFontFamily="Lato_400Regular"
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: "#CCC" }}
                      styleDropdownMenuSubsection={{
                        borderRadius: 5,
                        borderColor: "#fff",
                      }}
                      styleIndicator={{
                        
                        paddingVertical: 16,
                        color: "#fff",
                      }}
                      styleSelectorContainer={{
                        flex: 1,
                      }}
                      tagContainerStyle={{
                        width: "98%",
        
                      }}
                      submitButtonColor="#CCC"
                      submitButtonText="Agregar"
                    />
                  </Card>

              
                </View>
              </View>

              <Spacer size="large" />

              <CustomInput
                size="medium"
                isMultiline
                label="Preparación"
                value={this.state.preparation}
                keyboardType="default"
                onChangeText={this.handleChangeText("preparation")}
              />

              <Spacer size="large" />
              {!this.state.isLoading ? (
                <>
                  <Spacer size="large">
                    <AuthButton
                      mode="contained"
                      textColor="black"
                      onPress={() => this.onPressRecipe()}
                    >
                      {this.state.id ? "Actualizar" : "Registrar"}
                    </AuthButton>
                  </Spacer>
                  <Spacer size="large" />

                  <Spacer size="medium">
                    <AuthLabelContainer>
                      <TouchableOpacity onPress={() => this.clear()}>
                        <AuthLabel variant="bold">Limpiar</AuthLabel>
                      </TouchableOpacity>
                    </AuthLabelContainer>
                  </Spacer>
                </>
              ) : (
                <ActivityIndicator
                  animating={this.state.isLoading}
                  color={colors.brand.hf}
                />
              )}

              <Spacer size="large" />
            </AccountContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeArea>
    );
  }
}
