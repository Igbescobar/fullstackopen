import patientsData from '../../data/patients'

import { PatientsEntry } from '../types'

const patients: PatientsEntry[] = patientsData

const noSsnPatientsData = (): PatientsEntry[] => {
    return patients.map((patient) => {
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

export default {
    noSsnPatientsData
}