import BMI from '../helpers/bmi';

export const calculateBMI = (weight, height) => {
    const bmi = weight / (height ** 2);
    return bmi.toFixed(2);
}

export const calculateBMICategory = (bmi) => {
    if (bmi < 18.5) {
        return BMI.underWeight;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return BMI.normal;
    } else if (bmi >= 25 && bmi <= 29.9) {
        return BMI.overWeight;
    } else if (bmi >= 30 && bmi <= 34.9) {
        return BMI.obese;
    } else if (bmi > 35) {
        return BMI.extremelyObese;
    }
}

export const calculateBMICategoryDescription = (bmi) => {
    if (bmi < 18.5) {
        return BMI.bmiCategory[BMI.underWeight];
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return BMI.bmiCategory[BMI.normal];
    } else if (bmi >= 25 && bmi <= 29.9) {
        return BMI.bmiCategory[BMI.overWeight];
    } else if (bmi >= 30 && bmi <= 34.9) {
        return BMI.bmiCategory[BMI.obese];
    } else if (bmi > 35) {
        return BMI.bmiCategory[BMI.extremelyObese];
    }
}