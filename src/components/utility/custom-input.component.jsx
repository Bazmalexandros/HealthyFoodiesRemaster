import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { TextInput } from "react-native";

import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";

export const Label = styled(Text)`
  padding: ${(props) => props.theme.space[1]} 0px;
  color: black;
  font-weight: bold;
`;

export const Input = styled(TextInput)`
  border-radius: 15px;
  color: black;
  text-decoration: none;
  background-color: white;
  border-color: black;
  padding: ${(props) => props.theme.space[3]};
`;

/**
 * Componente personalizado para los componentes
 * @param {Object} obj - Propiedas del componente.
 * @param {string} obj.size - Tamaño del componente.
 * @param {string} obj.label - Etiqueta del componente y el input.
 * @param {string} obj.keyboardType - Tipo de teclado.
 * @param {any} obj.value - Valor asociado al input.
 * @param {void} obj.onChangeText - Función para manejar el cambio de texto.
 * @param {Bool} [obj.isMultiline] - Definir si el input es multilinea.
 * @param {Object} [obj.cardParams] - Objeto para manipular las propiedas de la carta.
 * @param {*} [props] Propiedades que se pueden manejar del TextInput
 */
export const CustomInput = (
  {
    size,
    label,
    keyboardType,
    value,
    onChangeText,
    isMultiline = false,
    onEndEditing = () => {},
  },
  props
) => (
  <Spacer size={size}>
    <Label variant="caption">{label}</Label>
    <Card elevation={2} mode="elevated">
      <Input
        placeholder={label}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        multiline={isMultiline}
        {...props}
      />
    </Card>
  </Spacer>
);
