interface CalcuValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): CalcuValues => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    if (args.length > 4) {
        throw new Error('Too many arguments')
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values are not numbers!')
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const heightMeters = height / 100
    const heightSquared = Math.pow(heightMeters, 2)
    const bmi = weight / heightSquared;

    switch (true) {
        case (bmi <= 18.4):
            if (bmi <= 15.9) {
                return 'Underweight (Severe thinness)';
            } else if (bmi <= 16.9) {
                return 'Underweight (Moderate thinness)';
            } else if (bmi <= 18.4) {
                return 'Underweight(Mild thinness)';
            }
        case (bmi <= 24.9):
            return 'Normal range';
        case (bmi <= 29.9):
            return 'Overweight (Pre-obese';
        case (bmi >= 30):
            if (bmi <= 34.9) {
                return 'Obese (Class I)';
            } else if (bmi <= 39.9) {
                return 'Obese (Class II)';
            } else if (bmi >= 40) {
                return 'Obese (Class III)';
            }
        default:
            throw new Error('Operation is not correct!');
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv)
    calculateBmi(value1, value2)
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage)
}

export default calculateBmi

