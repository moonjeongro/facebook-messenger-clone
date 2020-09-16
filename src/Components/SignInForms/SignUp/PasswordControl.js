import React, { useState } from 'react'

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

import VisibilityOff from '@material-ui/icons/VisibilityOff';

function PasswordControl({state, dispatch}) {

  const [passwordShow, setPasswordShow] = useState(false)

//  const validationForm = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Za-z0-9_]).*$"/;
  const validationForm = /(?=^.{8,}$)/;

  function passwordValidation(value){

    if(validationForm.test(value)){
      dispatch({type:'passwordValidation', payload: true})
    }else{
      dispatch({type:'passwordValidation', payload: false})
    }
  }
    
  const handleChange = (event) => {
    dispatch({type:'password', payload: event.target.value})
    setTimeout(passwordValidation, 1000, event.target.value);
  };

  const handleClickShowPassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl>
      <InputLabel htmlFor='password' error={!state.passwordValidation}>Password</InputLabel>
      <Input
        required
        id='password'
        label='password'
        autocomplete='new-password'
        type={passwordShow ? 'text' : 'password'}
        value={state.password}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='Show password as plain text. 
                  Warning: this will display your password on the screen.'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {passwordShow ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!state.passwordValidation && <FormHelperText id="password" error>Password should be more than 8 characters.</FormHelperText>}
    </FormControl>
  )
}

export default PasswordControl;
