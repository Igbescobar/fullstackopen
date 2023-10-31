import { Gender, Patient } from '../../types'
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';

interface Props {
    patient: Patient | null | undefined
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
const SinglePatientInfo = ({ patient }: Props) => {
    console.log(patient)
    return (
        <div>
            <h2>{patient?.name}{genderIcon(patient?.gender)}</h2>
            <p>ssh: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
        </div>
    )
}

export default SinglePatientInfo