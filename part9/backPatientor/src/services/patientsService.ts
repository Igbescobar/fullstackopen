/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients'

import { Entry, EntryWithoutId, NewPatient, NoSsnPatient, PatientsEntry } from '../types'

import { v1 as uuid } from 'uuid'

const getPatient = (): PatientsEntry[] => {
    return patientsData;
}

const singlePatient = (id: string): PatientsEntry | undefined => {
    return patientsData.find(w => w.id === id)
}

const noSsnPatientsData = (): NoSsnPatient[] => {
    return patientsData.map((patient) => {
        const { id, name, dateOfBirth, gender, occupation } = patient

        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        }
    })
}

const addPatient = (entry: NewPatient): PatientsEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuid()
    const newPatient = { id: id, ...entry }
    patientsData.push(newPatient)
    return newPatient
}

const addEntry = (patient: PatientsEntry, entry: EntryWithoutId): Entry => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    noSsnPatientsData,
    getPatient,
    addPatient,
    singlePatient,
    addEntry
}