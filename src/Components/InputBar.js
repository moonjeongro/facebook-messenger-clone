import React, { useState, useContext, } from 'react';

import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { FormControl, Input } from '@material-ui/core';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { UserContext } from '../UserManagementContext';

const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
`

const StyledInput = styled(Input)`
  flex: 1;
`

const StyledIconButton = styled(IconButton)`
  flex: 0;
`
const SEND_MESSAGE = gql`
  mutation SendMessage($text:String!, $userUid: String!) {
    sendMessage(text:$text, userUid:$userUid){
      id
      userUid
      text
    }
  }
`

function InputBar() {
  const [input, setInput] = useState('');
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);

  const currentUser = useContext(UserContext);

  function onClick(e) {
    e.preventDefault();
    sendMessage({ variables: 
      { text: input, 
        userUid: currentUser.uid} });
    setInput('')
  }

  return (
    <form>
      <StyledFormControl >
        <StyledInput placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
        <StyledIconButton
          className="app__iconButton"
          disabled={!input}
          type="submit"
          onClick={onClick}
          color="primary"
          variant="contained"
          className="app__button"
        >
          <SendIcon />
        </StyledIconButton>
      </StyledFormControl>
    </form>
  )
}

export default InputBar;