import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {

  const message = useSelector(state => state.notifications)

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