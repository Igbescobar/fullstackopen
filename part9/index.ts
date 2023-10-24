import express from 'express';
import calculateBmi from './bmiCalculator'

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})