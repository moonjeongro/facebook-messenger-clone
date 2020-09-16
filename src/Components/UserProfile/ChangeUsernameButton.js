import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';

const DisplayName = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
`

function ChangeUsernameButton({dispatch, displayName}) {

  function handleClick(){
    dispatch({type:'open'});
  }

  return (
    <DisplayName onClick={handleClick}>
      {displayName} <EditIcon />
    </DisplayName>
  )
}

export default ChangeUsernameButton;