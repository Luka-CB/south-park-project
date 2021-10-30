export const ErrorMsg = ({ msg }) => {
  return (
    <div className='err_msg'>
      <p>{msg}</p>
    </div>
  )
}

ErrorMsg.defaultProps = {
  msg: 'Something Went Wrong!',
}

export const NoticeMsg = ({ msg }) => {
  return (
    <div className='notice_message'>
      <p>{msg}</p>
    </div>
  )
}

NoticeMsg.defaultProps = {
  msg: `Nothing's Here!`,
}
