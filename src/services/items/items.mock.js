import pl from '../../../assets/patient.png'
import al from '../../../assets/manager.png'
import rl from '../../../assets/cook-book.png'
import dl from '../../../assets/diet.png'

export const itemsMock = [
    {
        id: 1,
        title: 'Pacientes',
        titleEn: 'patient',
        image: pl,
        description: 'Consultar pacientes para dar altas y bajas',
        route: {
            screen: "Pacientes Menu",
            params: {
                screen: "Pacientes",
            }
        }
    },
    {
        id: 2,
        title: 'Asistentes',
        titleEn: 'assistant',
        image: al,
        description: 'Consultar asistentes para dar altas y bajas',
        route: {
            screen: "Asistentes Menu",
            params: {
                screen: "Asistentes",
            }
        }
    },
    {
        id: 3,
        title: 'Recetas',
        titleEn: 'recipe',
        image: rl,
        description: 'Dar altas nuevas recetas y modificarlas',
        route: {
            screen: "Recetas Menu",
            params: {
                screen: "Recetas",
            }
        }
    },
    {
        id: 4,
        title: 'Planes',
        titleEn: 'mealPlan',
        image: dl,
        description: 'Crear planes de alimentación para los pacientes',
        route: {
            screen: "Comidas Menu",
            params: {
                screen: "Comidas",
            }
        }
    },
];