import React from 'react'
import Message from './Message/Message'
import FlipMove from 'react-flip-move';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

function MessageBox({ messages, userName }) {

  return (

      <FlipMove>
        <Container>
        {
          messages.map(({ id, message }) => (
            <Message key={id} userName={userName} message={message} />
          ))
        }
        </Container>
      </FlipMove>
  )
}

export default MessageBox;
