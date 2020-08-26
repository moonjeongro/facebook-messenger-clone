import React, { useState, } from 'react';

import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { FormControl, Input } from '@material-ui/core';
import styled from 'styled-components';


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

function InputBar() {
  const [input, setInput] = useState('');

  function sendMessage(e){

  }

  return (
    <form>
      <StyledFormControl >
        <StyledInput placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
        <StyledIconButton
          className="app__iconButton"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
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