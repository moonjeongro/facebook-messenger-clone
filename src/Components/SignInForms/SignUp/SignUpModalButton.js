import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.div`
  &:hover {
    color: lightgray;
  }
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;
`

function SignUpModalButton({dispatch}) {
  function handleOpen(){
    dispatch({type:'open'});
  }

  return (
    <StyledButton onClick={handleOpen}>
      CREATE ACCOUNT
    </StyledButton>
  )
}

export default SignUpModalButton;
