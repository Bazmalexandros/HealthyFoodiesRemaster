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
} from "./assistant-table.styles";
import { AssistantInfoCard } from "../../components";
import { assistantsRequest } from "../../../../services/assistants/assistants.service";

const AssistantTable = ({ navigation }) => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [assistants, setAssistants] = useState([]);

  const [keyword, setKeyword] = useState("");

  //create a method to get ingredientes
  const onGetPatients = async () => {
    setIsLoading(true);
    try {
      const result = await assistantsRequest();
      setAssistants(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeText = async (text) => {
    if (!text) {
      setKeyword("");
      const result = await assistantsRequest();
      setAssistants(result);
      return;
    }
    setKeyword(text);
  };

  const onFilterTable = () => {
    const newArray = assistants.filter(function (assistant) {
      const name = assistant.name.toLowerCase();
      return name.includes(keyword.toLowerCase());
    });

    setPatients(newArray);
  };

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
          title="asistentes"
          keyword
          onSubmitEditing={onFilterTable}
          onChangeText={onChangeText}
        />
      </ButtonWrapper>

      <ItemsList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={assistants}
        numColumns={1}
        renderItem={({ item }) => (
          <ItemTouchCard>
            <FadeInView>
              <AssistantInfoCard assistant={item} />
            </FadeInView>
          </ItemTouchCard>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};

export default AssistantTable;
