import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';

import styled from 'styled-components';
import { UserDispatchContext } from '../../UserManagementContext';

import { updateDisplayName } from '../../firebase';


const CHANGE_DISPLAYNAME = gql`
  mutation ChangeDisplayName($userUid:String!, $displayName:String!){
    updateDisplayName(userUid:$userUid, displayName: $displayName){
   	result
  }
}
`

const UsernameChange = styled.div`
  display: flex;
  justify-content: center;
`

function ChangeUsernameContent({ dispatch, userUid }) {
  const [username, setUsername] = useState('');
  const userDispatch = useContext(UserDispatchContext)

  const [changeDisplayName, { data }] = useMutation(CHANGE_DISPLAYNAME);

  function onChangeHandler(event) {
    setUsername(event.target.value);
  }

  function onClickHandler() {
    userDispatch({ type: 'changeDisplayName', payload: username })
    console.log(userUid, username)


    // 유저 정보 업데이트
    updateDisplayName(username)

    // 데이터베이스 업데이트
    changeDisplayName({
      variables:
      {
        userUid,
        displayName: username
      }
    });

    setUsername('');
    dispatch({ type: 'close' });
  }

  return (
    <UsernameChange>
      <TextField
        id="change-username"
        label="Change username"
        variant="outlined"
        onChange={onChangeHandler}
        value={username}
      />
      <Button onClick={onClickHandler} color="primary" >OK</Button>
    </UsernameChange>
  )
}

export default ChangeUsernameContent;
