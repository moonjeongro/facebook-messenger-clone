import React, { useState, useContext } from 'react'

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import ModalFactory from '../../ModalFactory';

import { signInWithEmailAndPassword } from '../../../firebase';
import { UserDispatchContext } from '../../../UserManagementContext';
import SignUpModalButton from '../SignUp/SignUpModalButton';
import SignUpModalContent from '../SignUp/SignUpModalContent';


const Container = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  gap: 1rem;
  place-content: center;
`

const SignInTitle = styled.h1`
  font-family: "Ubuntu" sans-serif;
`

const StyledButton = styled.div`
  &:hover {
    color: lightgray;
  }
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;
`

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  color: red;
`

function SignInContent() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    errorMessage: ''
  })

  const [result, setResult] = useState({
    user: true,
    message: ''
  })

  const userDispatch = useContext(UserDispatchContext)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {

    signInWithEmailAndPassword(values.email, values.password)
    .then((res)=>{
      if(res.user){
        console.log(res.user)
        const currentUser = {
          uid: res.user.uid,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL
        }

        userDispatch({type:'signin', dispatch: currentUser});

      }else{
        setResult(res)
      }
    })
  }

  return (

    <Container>
      <SignInTitle>Hello!</SignInTitle>

      <FormControl>
        <InputLabel htmlFor='signin-email'>Email</InputLabel>
        <Input
          required
          autoFocus
          id='signin-email'
          label='email address'
          type='email'
          value={values.email}
          onChange={handleChange('email')}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="signin-password">Password</InputLabel>
        <Input
          id="signin-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>


      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Sign in
      </Button>
      {result.user===false && <ErrorMessage>{result.message}</ErrorMessage>}

      <StyledButton>Can't login?</StyledButton>
      <ModalFactory button={SignUpModalButton} content={SignUpModalContent} /> 

    </Container>
  )
}

export default SignInContent
