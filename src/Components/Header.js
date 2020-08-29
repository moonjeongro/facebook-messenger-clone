import React from 'react'
import FirebaseAuth from './FirebaseAuth';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import UserProfile from './UserProfile';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

function Header() {

  function onClick(e){  
    
  }

  return (
    <Container>
      <UserProfile />
      <Button color="primary" onClick={onClick}>sign-in</Button>
    </Container>
  )
}

export default Header;

// <Avatar alt={} src={} />