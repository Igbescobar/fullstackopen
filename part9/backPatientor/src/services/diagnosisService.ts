import diagnosesData from '../../data/diagnoses';

import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosesEntry[] => {
    return diagnoses;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnoses
};