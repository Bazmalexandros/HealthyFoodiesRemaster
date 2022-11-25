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
import { Spacer, SafeArea, CustomInput } from "../../../../components";

import {
  AccountContainer,
  AuthButton,
  AuthLabelContainer,
  AuthLabel,
  Title,
  Select,
  Label,
} from "./meal-plan-form.styles";

import { colors } from "../../../../infrastructure/theme/colors";

import { recipesRequest } from "../../../../services/recipes/recipes.service";
import {
  createMealPlan,
  updateMealPlan,
} from "../../../../services/mealPlan/mealPlan.service";
import { getFirebaseMessage } from "../../../../utils/firebase.utils";

const initState = {
  isLoading: false,
  selectedItemsMonday: [],
  selectedItemsTuesday: [],
  selectedItemsWednesday: [],
  selectedItemsThursday: [],
  selectedItemsFriday: [],
  selectedItemsSaturday: [],
  selectedItemsSunday: [],
  recipes: [],
  id: "",
  name: "",
};

export default class MealPlanFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  onSelectedItemsMondayChange = (selectedItemsMonday) => {
    this.setState({ selectedItemsMonday });
  };

  onSelectedItemsTuesdayChange = (selectedItemsTuesday) => {
    this.setState({ selectedItemsTuesday });
  };

  onSelectedItemsWednesdayChange = (selectedItemsWednesday) => {
    this.setState({ selectedItemsWednesday });
  };

  onSelectedItemsThursdayChange = (selectedItemsThursday) => {
    this.setState({ selectedItemsThursday });
  };

  onSelectedItemsFridayChange = (selectedItemsFriday) => {
    this.setState({ selectedItemsFriday });
  };

  onSelectedItemsSaturdayChange = (selectedItemsSaturday) => {
    this.setState({ selectedItemsSaturday });
  };

  onSelectedItemsSundayChange = (selectedItemsSunday) => {
    this.setState({ selectedItemsSunday });
  };

  async onGetRecipes() {
    try {
      const result = await recipesRequest();
      this.setState({ recipes: result });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.onGetRecipes();
    const { route } = this.props;

    if (route.params != undefined) {
      const { meal } = route.params;
      this.setState(meal);
      this.setState({ isLoading: false });
      this.setState({
        selectedItemsMonday: meal.monday,
      });
      this.setState({
        selectedItemsTuesday: meal.tuesday,
      });
      this.setState({
        selectedItemsWednesday: meal.wednesday,
      });
      this.setState({
        selectedItemsThursday: meal.thursday,
      });
      this.setState({
        selectedItemsFriday: meal.friday,
      });
      this.setState({
        selectedItemsSaturday: meal.saturday,
      });
      this.setState({
        selectedItemsSunday: meal.sunday,
      });
      this.setState({ name: meal.name });
      this.setState({ id: meal.id });
    }
  }

  clear() {
    this.state.id = "";
    this.state.name = "";
    this.props.route.params = undefined;
    this.setState(initState);
    this.setState({ id: "" });
    this.setState({ name: "" });
    this.setState({ preparation: "" });
    this.onGetRecipes();
  }

  /**
   * Función para asignar los valores de los inputs al estado
   * @param {string} key Nombre del input
   * @param {string} value Valor del input
   */
  handleChangeText = (key) => (value) => {
    this.setState({ ...this.state, [key]: value });
  };

  async onPressMeal() {
    const data = {};
    data.id = this.state.id;
    data.name = this.state.name;
    data.monday = this.state.selectedItemsMonday;
    data.tuesday = this.state.selectedItemsTuesday;
    data.wednesday = this.state.selectedItemsWednesday;
    data.thursday = this.state.selectedItemsThursday;
    data.friday = this.state.selectedItemsFriday;
    data.saturday = this.state.selectedItemsSaturday;
    data.sunday = this.state.selectedItemsSunday;
    data.active = 1;

    const toastParams = {
      type: "error",
      text1: "Algo salió mal",
      text2: "",
      topOffset: 100,
    };

    if (data.monday.length === 0) {
      toastParams.text2 = "Debe seleccionar al menos una receta para el lunes";
      Toast.show(toastParams);
      return;
    }

    if (data.tuesday.length === 0) {
      toastParams.text2 = "Debe seleccionar al menos una receta para el martes";
      Toast.show(toastParams);
      return;
    }

    if (data.wednesday.length === 0) {
      toastParams.text2 =
        "Debe seleccionar al menos una receta para el miércoles";
      Toast.show(toastParams);
      return;
    }

    if (data.thursday.length === 0) {
      toastParams.text2 = "Debe seleccionar al menos una receta para el jueves";
      Toast.show(toastParams);
      return;
    }

    if (data.friday.length === 0) {
      toastParams.text2 =
        "Debe seleccionar al menos una receta para el viernes";
      Toast.show(toastParams);
      return;
    }

    if (data.saturday.length === 0) {
      toastParams.text2 = "Debe seleccionar al menos una receta para el sábado";
      Toast.show(toastParams);
      return;
    }

    if (data.sunday.length === 0) {
      toastParams.text2 =
        "Debe seleccionar al menos una receta para el domingo";
      Toast.show(toastParams);
      return;
    }

    if (data.name === "") {
      toastParams.text2 = "Debe ingresar un nombre para el plan";
      Toast.show(toastParams);
      return;
    }

    this.setState({ isLoading: true });
    let response =
      this.state.id !== ""
        ? await updateMealPlan(data)
        : await createMealPlan(data);
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
      text2: `Plan ${
        this.state.id !== "" ? "actualizado" : "registrado"
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
            name: "Comidas Menu",
            params: {
              screen: "Comidas",
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
    const {
      selectedItemsMonday,
      selectedItemsTuesday,
      selectedItemsWednesday,
      selectedItemsThursday,
      selectedItemsFriday,
      selectedItemsSaturday,
      selectedItemsSunday,
      recipes,
    } = this.state;

    return (
      <SafeArea>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <AccountContainer>
              <Title>
                {this.state.id ? "Actualizar" : "Registrar"} Plan de comida
              </Title>

              <CustomInput
                size="medium"
                label="Nombre del plan"
                value={this.state.name}
                keyboardType="default"
                onChangeText={this.handleChangeText("name")}
              />

              {/* Lunes */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Lunes</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsMondayChange}
                      selectedItems={selectedItemsMonday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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

              {/* Martes */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Martes</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsTuesdayChange}
                      selectedItems={selectedItemsTuesday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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

              {/* Miércoles */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Miércoles</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={
                        this.onSelectedItemsWednesdayChange
                      }
                      selectedItems={selectedItemsWednesday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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

              {/* Jueves */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Jueves</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsThursdayChange}
                      selectedItems={selectedItemsThursday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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

              {/* Viernes */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Viernes</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsFridayChange}
                      selectedItems={selectedItemsFriday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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

              {/* Sábado */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Sábado</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsSaturdayChange}
                      selectedItems={selectedItemsSaturday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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

              {/* Domingo */}
              <Spacer size="large" />
              <Spacer size="large" />

              <View>
                <Label variant="caption">Domingo</Label>
                <View style={{ flex: 1 }}>
                  <Card elevation={2} mode="elevated">
                    <Select
                      items={recipes}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsSundayChange}
                      selectedItems={selectedItemsSunday}
                      selectText="&nbsp;&nbsp;&nbsp;&nbsp;Selecciona las recetas"
                      searchInputPlaceholderText="Buscar recetas..."
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
              <Spacer size="large" />
              {!this.state.isLoading ? (
                <>
                  <Spacer size="large">
                    <AuthButton
                      mode="contained"
                      textColor="black"
                      onPress={() => this.onPressMeal()}
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
