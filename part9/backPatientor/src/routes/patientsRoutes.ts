import express from 'express'
import patientsService from '../services/patientsService'
import newPatientEntry from '../utils/toNewPatient'
import toNewEntry from '../utils/toNewEntry'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientsService.getPatient())
})

router.post('/', (req, res) => {
    try {
        const newPatient = newPatientEntry(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id
        const singlePatient = patientsService.singlePatient(id)
        res.json(singlePatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message
        }
        res.status(400).send(errorMessage)
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientsService.singlePatient(req.params.id);
        if (patient === undefined) {
            res.status(404).send(`patient not found`);
            return;
        }
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientsService.addEntry(patient, newEntry);
        res.json(addedEntry);

    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router
