import React, {useEffect} from 'react'
import Message from './Message';

function Messages(props) {

  useEffect(() => {
    props.subscribeToNewMessage()

    window.scroll({
      top:document.getElementById('root').scrollHeight,
      behavior: 'smooth'
    });
    
    return () => {

    }
  }, [])

  return (
    <>
      {props.data?.messages.map(message=><Message message={message} />)}
    </>
  )
}

export default Messages;