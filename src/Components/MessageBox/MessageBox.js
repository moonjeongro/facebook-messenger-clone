import React from 'react'
import Messages from './Messages'

import { gql, useSubscription } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql`
    subscription OnMessageAdded {
      messageAdded {
        text
        userUid
      }
    }
`;

function MessageBox() {

  const { data, loading } = useSubscription(
    MESSAGE_SUBSCRIPTION,
  );

  if (loading){
    return null;
  }

  return (
    <>
      <Messages message={data?.messageAdded} />
    </>
  )
}

export default MessageBox;
