import React, { useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { UserContext } from '../../UserManagementContext';

import { gql, useQuery } from '@apollo/client';

const CurrentUserSpeechBubble = styled.div`
	background: #145374;
  color: #f6f5f5;
  grid-column: 3/ span 2;
  justify-self: end;
	border-radius: .4em;
  margin: .1rem;
  padding: .8rem;
  font-size: .9rem;
`

const OtherSpeechBubble = styled.div`
	background: #f6f5f5;
  color: #145374;
  grid-column: 2 / span 2;
  justify-self: start;
	border-radius: .4em;
  margin: .1rem;
  padding: .8rem;
  font-size: .9rem;
`

const AvatarDiv = styled.div`
  grid-column: 1;
`

const GET_USER = gql`
  query UserInfo($userUid: String!){
    userInfo(userUid:$userUid){
      uid
      displayName
      photoURL
    }
  }
`;

const Message = ({ message, prevUid }) => {
  const currentUser = useContext(UserContext);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userUid: message.userUid },
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.log('error occured');
    return null;
  }

  if (currentUser.uid === message.userUid) {
    return (
      <CurrentUserSpeechBubble>
        {message.text}
      </CurrentUserSpeechBubble>
    )
  }

  return (
    <>
      <AvatarDiv>
        {message.userUid !== prevUid && <Avatar alt={data?.userInfo.displayName} src={data?.userInfo.photoURL} />}
      </AvatarDiv>
      <OtherSpeechBubble>
        {message.text}
      </OtherSpeechBubble>
    </>
  )
}

export default Message;