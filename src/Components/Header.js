import React from 'react'

import styled from 'styled-components';

import ModalFactory from './ModalFactory';
import UserProfileButton from './UserProfile/UserProfileButton';
import UserProfileContent from './UserProfile/UserProfileContent';
import SignInButton from './SignInForms/SignIn/SignInButton';
import SignInContent from './SignInForms/SignIn/SignInContent';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {

  const signUpButtonProps = {
    color: 'primary'
  }
  const signUpButtonText = 'sign-up';

  return (
    <Container>
      <ModalFactory button={UserProfileButton} content={UserProfileContent} />
      <ModalFactory button={SignInButton} content={SignInContent} />
    </Container>
  )
}

export default Header;