import './SucessMessage.css'
import { useNotificationValue } from '../notificationContext'

const SuccessMessage = () => {

    const message = useNotificationValue()

    if (message === null) {
        return null
    }

    return (
        <div className="correct">
            {message}
        </div>
    )
}

export default SuccessMessage