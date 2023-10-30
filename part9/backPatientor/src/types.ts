export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NoSsnPatient = Omit<PatientsEntry, 'ssn' | 'entries'>

export type NewPatient = Omit<PatientsEntry, 'id'>

export type NonSensitivePatient = Omit<PatientsEntry, 'ssn' | 'entries'>;