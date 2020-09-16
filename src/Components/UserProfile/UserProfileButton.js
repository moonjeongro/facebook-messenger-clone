import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';

import styled from 'styled-components';
import { UserContext } from '../../UserManagementContext';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  margin: .2rem;
  padding: .2rem;
`

const DisplayName = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
`

function UserProfileButton({dispatch, displayName}) {

  const [profile, setUserProfile] = useState({})
  const currentUser = useContext(UserContext)

  useEffect(() => {
    setUserProfile(currentUser);
  }, [currentUser])

  function handleOpen(){
    dispatch({type:'open'});
  }

  return (
    <Container onClick={handleOpen}>
      <Avatar alt={profile.displayName} src={profile.photoURL} />
      <DisplayName>{profile.displayName}</DisplayName>
    </Container>
  )
}

export default UserProfileButton;