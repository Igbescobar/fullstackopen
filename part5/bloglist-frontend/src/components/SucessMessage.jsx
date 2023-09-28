import './SucessMessage.css'

const SuccessMessage = ({ message }) => {
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