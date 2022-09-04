const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div>
      {notification.message}
    </div>
  )
}



export default Notification