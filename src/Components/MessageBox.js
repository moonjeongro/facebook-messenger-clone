import React, { useEffect, createContext } from 'react'
import Messages from './Messages'
import FlipMove from 'react-flip-move';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

const GET_MESSAGES = gql`
  query {
    messages {
      text
      userUid
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
    subscription OnMessageAdded {
      messageAdded {
        text
        userUid
      }
    }
`;

export const DispatchContext = createContext();

function MessageBox() {

  const { subscribeToMore, ...result } = useQuery(
    GET_MESSAGES,
  )
  
  return (
    <FlipMove>
      <Container>
        <Messages
          {...result}
          subscribeToNewMessage={() =>
            subscribeToMore({
              document: MESSAGE_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newAddedMessage = subscriptionData.data.messageAdded;
                return Object.assign({}, prev, {
                  messages: [...prev.messages, newAddedMessage]
                });
              }
            })
          } />
      </Container>
    </FlipMove>
  )
}

export default MessageBox;