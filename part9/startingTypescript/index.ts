import express from 'express';
const app = express()

import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!!')
})

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: 'malformatted parameters' }).status(400)
    }
    const bmi = calculateBmi(height, weight)

    const result = {
        weight,
        height,
        bmi
    }
    res.send(result).status(200)
})

app.post('/exercises', (req, res) => {
    const body = req.body

    const target: number = body.target

    const daily_exercises: number[] = body.daily_exercises

    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' })
    }

    if (isNaN((target)) || daily_exercises.some(item => isNaN(Number(item)))) {
        res.status(400).send({ error: 'malformatted parameters' })
    }
    try {
        const result = calculateExercises(target, daily_exercises);
        res.send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message })
        }
        res.status(400).send({ error: 'something went wrong' });
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})