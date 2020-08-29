import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { currentUserVar } from './apollo';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px;
`

function UserProfile() {

  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    setDisplayName(currentUserVar()?.displayName)
  }, [currentUserVar()])

  return (
    <Container>
      <Avatar /> {displayName}
    </Container>
  )
}

export default UserProfile
