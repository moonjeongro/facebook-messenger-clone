import React, { useState, useEffect } from 'react'
import Message from './Message/Message'
import FlipMove from 'react-flip-move';
import styled from 'styled-components';
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

const GET_MESSAGES = gql `
  query {
    messages {
      id
      text
      timeStamp
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
    subscription {
      messageAdded {
			  id
        text
      }
    }
`;


async function MessageBox() {

  const [messages, setMessages] = useState([])
  const {loading, error, data} = useQuery(GET_MESSAGES);

  useEffect(() => {
    setMessages( data?.messages?.map( message => ({id: message.id, message: message.text, timeStamp: message.timeStamp}))
  )}, [])

  return (
      <FlipMove>
        <Container>
        {messages?.forEach( message => {
            console.log(message.id, message.text, message.timeStamp) 
        })}
        </Container>
      </FlipMove>
  )
}

export default MessageBox;
