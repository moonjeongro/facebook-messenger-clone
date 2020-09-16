import React, { useEffect, useState } from 'react'
import Messages from './Messages'

import { gql, useQuery, useSubscription } from '@apollo/client';

import firebase from 'firebase';

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


const FETCH_MESSAGES = gql`
  query MessageFeed($offset: String!, $limit: Int!) {
    messageFeed (offset: $offset, limit: $limit) {
      text
      userUid
      timeStamp
    }
  }
`;


function MessageBox() {

  const { subscribeToMore, fetchMore, ...result } = useQuery(
    FETCH_MESSAGES,
    {
      variables: {
        offset: 'entry',
        limit: 10
      },
      fetchPolicy: "cache-and-network"
    }
  ) 
  

  // 랜더링이 두번,세번씩 되는 문제
  return (
   
    <Messages
      {...result}
      subscribeToNewMessage={() =>
        subscribeToMore({
          document: MESSAGE_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newAddedMessage = subscriptionData.data.messageAdded;
            return Object.assign({}, prev, {
              messageFeed: [...prev.messageFeed, newAddedMessage]
            });
          }
        })
      }
      onLoadMore={() =>
        fetchMore({
          variables: {
            offset: result?.data.messageFeed.length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              messageFeed: [...prev.messageFeed, ...fetchMoreResult.messageFeed]
            });
          }
        })
      }
    />

  )
}

export default MessageBox;
