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
    const height: number = Number(process.argv[2])
    const weight: number = Number(process.argv[3])
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage)
}

