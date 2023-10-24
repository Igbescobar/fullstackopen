interface findIbm {
    target: number;
    time: number[];
}

const parseArguments = (args: string[]): findIbm => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const time: number[] = [];

    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
            time.push(Number(args[i]));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    return {
        target: Number(args[2]),
        time: time
    };
};
interface Solution {
    periodLength: number;
    trainingDays: number;
    success: string;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, a: number[]): Solution => {
    const periodLength = a.length;

    const trainingDays = a.filter(n => n > 0).length;

    const average = a.reduce((a, b) => (a + b)) / a.length;

    const success = average >= target ? 'true' : 'false';

    const rates = (average: number, target: number): number => {
        const myRating = average / target;
        if (myRating >= 1) {
            return 3;
        } else if (myRating >= 0.9) {
            return 2;
        } else {
            return 1;
        }
    };

    const description = (rating: number): string => {
        if (rating === 1) {
            return 'Poor job dude, time to clock in';
        } else if (rating === 2) {
            return 'Not bad but could be better';
        } else {
            return 'Very good job!';
        }
    };
    const rating = rates(average, target);

    const ratingDescription = description(rating);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
try {
    const { target, time } = parseArguments(process.argv);
    console.log(calculateExercises(target, time));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += 'Error:' + error.message;
    }
    console.log(errorMessage);
}