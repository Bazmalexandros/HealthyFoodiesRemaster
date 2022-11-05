export default class BMI {
    static underWeight = 1;
    static normal = 2;
    static overWeight = 3;
    static obese = 4;
    static extremelyObese = 5;

    static bmiCategory = {
        1: 'Bajo de peso',
        2: 'Normal',
        3: 'Sobrepeso',
        4: 'Obesidad',
        5: 'Obesidad extrema'
    }

    static bmiCategoryEn = {
        1: 'Underweight',
        2: 'Normal',
        3: 'Overweight',
        4: 'Obese',
        5: 'Extremely Obese'
    }

    static bmiArray = [
        { id: 1, name: 'Bajo de peso', nameEn: 'Underweight' },
        { id: 2, name: 'Normal', nameEn: 'Normal' },
        { id: 3, name: 'Sobrepeso', nameEn: 'Overweight' },
        { id: 4, name: 'Obesidad', nameEn: 'Obese' },
        { id: 5, name: 'Obesidad extrema', nameEn: 'Extremely Obese' }
    ]

    static bmiArraySelect = [
        { key: 1, value: 'Bajo de peso' },
        { key: 2, value: 'Normal' },
        { key: 3, value: 'Sobrepeso'},
        { key: 4, value: 'Obesidad'},
        { key: 5, value: 'Obesidad extrema' }

    ]
}