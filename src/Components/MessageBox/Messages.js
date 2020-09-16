import React, { useEffect, useState } from 'react'
import Message from './Message';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: auto 1fr 4fr 1fr;
  gap: 0.5rem;
`

function Messages({message}) {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([...messages, message])
    window.scroll({
      top: document.getElementById('root').scrollHeight,
      behavior: 'smooth'
    });
  }, [message])

  return (
    <Container>
      {messages.map((message, index, array) => {
        if (index !== 0) {
          const prevUid = array[index - 1].userUid;
          return <Message message={message} prevUid={prevUid} />
        }

        return <Message message={message} />
      })}
    </Container>
  )
}

export default Messages;