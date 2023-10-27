/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients'

import { NewPatient, NoSsnPatient, PatientsEntry } from '../types'

import { v1 as uuid } from 'uuid'

const getPatient = (): PatientsEntry[] => {
    return patientsData;
}

const noSsnPatientsData = (): NoSsnPatient[] => {
    return patientsData.map((patient) => {
        const { id, name, dateOfBirth, gender, occupation } = patient

        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
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

export default {
    noSsnPatientsData,
    getPatient,
    addPatient
}