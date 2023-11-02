import { DiagnosesEntry, Gender, PatientsEntry, Entry, HealthCheckRating } from '../../types'
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import { red, yellow } from '@mui/material/colors';
import { Box } from '@mui/system';


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

const healthRating = (health: HealthCheckRating) => {
    switch (health) {
        case 0:
            return <FavoriteBorderIcon color="success" />
        case 1:
            return <FavoriteBorderIcon color="disabled" />
        case 2:
            return <FavoriteBorderIcon sx={{ color: yellow[500] }} />
        case 3:
            return <FavoriteBorderIcon sx={{ color: red[500] }} />
        default: return null
    }
}

const handleNever = (value: never): never => {
    throw new Error(
        `Something went wrong: ${JSON.stringify(value)}`
    )
}

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return (
                <div>{healthRating(entry.healthCheckRating)}</div>
            )
        case "Hospital":
            return (
                <div>
                    <p>Discharge date: {entry.discharge.date}</p>
                    <ul>
                        <li>{entry.discharge.criteria}</li>
                    </ul>
                </div>
            )
        case "OccupationalHealthcare":
            return (
                <div>
                    {entry.sickLeave ?
                        <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
                        :
                        null
                    }
                </div>
            )
        default:
            return handleNever(entry)
            break;
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
                    <Box component="section" sx={{ p: 2, border: '1px dashed grey', margin: '8px' }}>
                        <p>{entry.date}</p>
                        {entry.type === "OccupationalHealthcare" ?
                            entry.employerName ?
                                <p>
                                    <WorkIcon /> {entry.employerName}
                                </p>
                                : <WorkIcon />
                            : <MedicalServicesIcon />
                        }
                        <p><i>{entry.description}</i></p>
                        {entry.diagnosisCodes?.map(code => {
                            const diagno = diagnoses.find(diagnose => diagnose.code === code)?.name
                            return (
                                <ul key={code}>
                                    <li>{code} {diagno ? diagno : null}</li>
                                </ul>
                            )
                        })}
                        < EntryDetails entry={entry} />
                        <p>diagnose by {entry.specialist}</p>
                    </Box>
                </div>
            ))
            }
        </div >
    )
}

export default SinglePatientInfo