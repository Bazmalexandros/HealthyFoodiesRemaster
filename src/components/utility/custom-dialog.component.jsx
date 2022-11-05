import Dialog from "react-native-dialog";

export const CustomDialog = ({ visible, field, handleCancel, handleOk }) => (
  <Dialog.Container visible={visible}>
    <Dialog.Title>Actualizar Datos</Dialog.Title>
    <Dialog.Input placeholder={`Escribe tu ${field}`} />
    <Dialog.Description>
      Escribe en el campo el dato por el que vas a actualizar
    </Dialog.Description>
    <Dialog.Button label="Cancelar" onPress={handleCancel} />
    <Dialog.Button label="Actualizar" onPress={handleOk} />
  </Dialog.Container>
);