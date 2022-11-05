import { BaseToast, ErrorToast } from 'react-native-toast-message';

/** Se crea la configuración del Toast */
export const toastConfig = {
    /* Se sobreeescribe el tipo 'success', modificando el componente existente `BaseToast` */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#4BB543' }}

            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#4BB543' }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#fff',
            }}
            text2Style={{
                color: '#fff',
            }}
        />
    ),
    /* Se sobreeescribe el tipo 'error', modificando el componente existente `ErrorToast` */
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#ff3333' }}

            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#ff3333' }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#fff',
            }}
            text2Style={{
                color: '#fff',
            }}
        />
    ),
    /*
        Aquí se crea un nuevo tipo llamada `tomatoToast`,
        este layout se puede crear desde 0.
            
        Se puede consumir cualquier propiedad que desee.
        Estas propiedades se pasan a través de la llamada de `show`
    */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};