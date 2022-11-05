import { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { SearchContainer } from "./search.styles";

export const Search = ({ onSubmitEditing, title = "productos", keyword, onChangeText }) => {

  return (
    <SearchContainer>
      <Searchbar
        placeholder={`Busca ${title}`}
        value={keyword}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
      />
    </SearchContainer>
  );
};
