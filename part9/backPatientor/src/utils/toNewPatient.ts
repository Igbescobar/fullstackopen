import { Gender, NewPatient } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or mising name')
    }
    return name;
}

const isDateOfBirth = (birth: string): Boolean => {
    return Boolean(Date.parse(birth))
}

const parseBirth = (birth: unknown): string => {
    if (!isString(birth) || !isDateOfBirth(birth)) {
        throw new Error('Incorrect or mising date: ' + birth)
    }
    return birth
}

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn)
    }
    return ssn
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(n => n.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation)
    }
    return occupation
}

const newPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }
    if ('name' in object
        && 'dateOfBirth' in object
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object
        && 'entries' in object) {
        const newEntry: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        }
        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing')
}

export default newPatientEntry