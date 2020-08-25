import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Message = forwardRef(({ userName, message }, ref) => {
  const isUser = (userName === message.userName);

  const MessageCard = styled.div`
    grid-column: ${isUser? '2 / -1': '1 / -2' };
    text-align: ${isUser? 'right': 'left'};
    justify-self: ${isUser? 'end': 'start'};
  `;

  const StyledCard = styled(Card)`
    background-color: ${isUser? '#f6f5f5': '#145374' } !important;
    color: ${!isUser? '#f6f5f5': '#145374' } !important;
  `

  return (
    <MessageCard ref={ref} >
      <StyledCard className={isUser ? 'message__userCard' : 'message__guestCard'}>
        <CardContent>
          <Typography
            color="white"
            variant="body2"
            compoment="p"
          >
            {!isUser && `${message.userName || 'Unknown user'}:`} {message.message}
          </Typography>
        </CardContent>
      </StyledCard>
    </MessageCard>
  )
})

export default Message;