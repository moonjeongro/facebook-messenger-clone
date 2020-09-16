import React, { useReducer, createContext } from 'react'

import Button from '@material-ui/core/Button'

import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';

import PasswordControl from './PasswordControl';
import EmailControl from './EmailControl';
import UsernameControl from './UsernameControl';

import { gql, useMutation } from '@apollo/client';

const Container = styled.div`
  display:grid;
  gap: 10px;
  grid-template-rows: repeat(1fr, auto);
`

const Line = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: rgba(var(--b38,219,219,219),1);
  height: 1px;
  position: relative;
  top: .45em;
`

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`

const SIGN_UP = gql`
  mutation sendEmailSignUpInfo($emailAddress:String!, $username: String!, $password: String!) {
    sendEmailSignUpInfo(emailAddress: $emailAddress, username: $username, password: $password){
    result
    message
    }
  }
`

const initialState = {
  email: '',
  emailValidation: true,
  password: '',
  passwordValidation: true,
  username: '',
  usernameValidation: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'emailValidation':
      return { ...state, emailValidation: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'passwordValidation':
      return { ...state, passwordValidation: action.payload };
    case 'username':
      return { ...state, username: action.payload };
    case 'usernameValidation':
      return { ...state, usernameValidation: action.payload };
    default:
      throw new Error();
  }
}

function SignUpModalContent() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [signUpMutation, { loading, error, data }] = useMutation(SIGN_UP);

  function clickHandler(event) {
    const result = signUpMutation({
      variables: {
        emailAddress: state.email,
        username: state.username,
        password: state.password
      }
    });
  }

  return (
    <form>
      <Container>
        <EmailControl state={state} dispatch={dispatch} />
        <PasswordControl state={state} dispatch={dispatch} />
        <UsernameControl state={state} dispatch={dispatch} />

        <Button variant='contained' color='primary'
          disabled={state.email === '' | !state.emailValidation || !state.emailValidation | !state.passwordValidation}
          onClick={clickHandler}>
          SIGN-UP
        </Button>

        <Divider variant="middle" />
        <ErrorMessage>{!loading && !data?.sendEmailSignUpInfo.message}</ErrorMessage>
      </Container>
    </form>
  )
}

export default SignUpModalContent;
