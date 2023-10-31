import { DiagnosesEntry, Gender, PatientsEntry } from '../../types'
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';

interface Props {
    patient: PatientsEntry | null | undefined
    diagnoses: DiagnosesEntry[]
}

const genderIcon = (gender: Gender | undefined) => {
    switch (gender) {
        case 'male':
            return <ManIcon />
        case 'female':
            return <WomanIcon />
        default:
            return null
    }
}
const SinglePatientInfo = ({ patient, diagnoses }: Props) => {
    return (
        <div>
            <h2>{patient?.name}{genderIcon(patient?.gender)}</h2>
            <p>ssh: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <br />
            <h3>entries</h3>
            {patient?.entries.map(entry => (
                <div key={entry.id}>
                    <p >{entry.date} {entry.description}</p>
                    {entry.diagnosisCodes?.map(code => {
                        const diagno = diagnoses.find(diagnose => diagnose.code === code)?.name
                        return (
                            <ul key={code}>
                                <li>{code} {diagno ? diagno : null}</li>
                            </ul>
                        )

                    })}
                </div>
            ))
            }
        </div >
    )
}

export default SinglePatientInfo