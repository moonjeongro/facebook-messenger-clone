import React, { forwardRef, useContext } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { UserContext } from '../UserManagementContext';

const CurrentUserMessageCard = styled(Card)`
  grid-column: 2/-1;
  text-align: right;
  justify-self: end;
  background-color: #f6f5f5 !important;
  color: #145374 !important;
`
const OtherMessageCard = styled(Card)`
  grid-column: 1/-2;
  text-align: left;
  justify-self: start;
  background-color: #145374 !important;
  color: #f6f5f5 !important;
`

const Message = forwardRef(({ message }, ref) => {
  const currentUser = useContext(UserContext);

  if ( currentUser.uid === message.userUid ) {
    return (
      <CurrentUserMessageCard>
        <CardContent ref={ref}>
          <Typography
            color="white"
            variant="body2"
            compoment="p"
          >
            {message.text}
          </Typography>
        </CardContent>
      </CurrentUserMessageCard>
    )
  }

  return (
    <OtherMessageCard>
      <CardContent ref={ref}>
        <Typography
          color="white"
          variant="body2"
          compoment="p"
        >
          {message.text}
        </Typography>
      </CardContent>
    </OtherMessageCard>
  )
})

export default Message;