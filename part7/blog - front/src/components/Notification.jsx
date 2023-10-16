import './Notification.css'
import { useNotificationValue } from '../notificationContext'

const Notification = () => {

  const message = useNotificationValue()

  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification