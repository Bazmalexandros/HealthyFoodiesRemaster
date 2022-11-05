import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  SafeArea,
  Loading,
  FadeInView,
  Search,
} from "../../../../components";
import {
  ButtonWrapper,
  ItemsList,
  ItemTouchCard,
} from "./patient-table.styles";
import { PatientInfoCard } from "../../components";
import { patientsRequest } from "../../../../services/patients/patients.service";

const PatientTable = ({ navigation }) => {
    const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const [keyword, setKeyword] = useState("");

  //create a method to get ingredientes
  const onGetPatients = async () => {
    setIsLoading(true);
    try {
      const result = await patientsRequest();
      setPatients(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeText = async (text) => {
    if (!text) {
      setKeyword("");
      const result = await patientsRequest();
      setPatients(result);
      return;
    }
    setKeyword(text);
  };

  const onFilterTable = () => {
    const newArray = patients.filter(function (patient) {
      const name = patient.name.toLowerCase();
      return name.includes(keyword.toLowerCase());
    });

    setPatients(newArray);
  }

  useEffect(() => {
    onGetPatients();
  }, [route.params]);

  if (isLoading) {
    return (
      <SafeArea>
        <Loading />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ButtonWrapper>
        <Search
          title="pacientes"
          keyword
          onSubmitEditing={onFilterTable}
          onChangeText={onChangeText}
        />
      </ButtonWrapper>

      <ItemsList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={patients}
        numColumns={1}
        renderItem={({ item }) => (
          <ItemTouchCard>
            <FadeInView>
              <PatientInfoCard patient={item} />
            </FadeInView>
          </ItemTouchCard>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};

export default PatientTable;
