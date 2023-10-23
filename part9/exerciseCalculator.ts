interface Solution {
    periodLength: number;
    trainingDays: number;
    success: string;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (a: number[], target: number): Solution => {
    const periodLength = a.length

    const trainingDays = a.filter(n => n > 0).length

    const average = a.reduce((a, b) => (a + b)) / a.length

    const success = average >= target ? 'true' : 'false'

    const rates = (average: number, target: number): number => {
        const myRating = average / target
        if (myRating >= 1) {
            return 3;
        } else if (myRating >= 0.9) {
            return 2
        } else {
            return 1
        }
    }

    const description = (rating: number): string => {
        if (rating = 1) {
            return 'Poor job dude, time to clock in'
        } else if (rating = 2) {
            return 'Not bad but could be better'
        } else {
            return 'Very good job!'
        }
    }

    const rating = rates(average, target)

    const ratingDescription = description(rating)

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))