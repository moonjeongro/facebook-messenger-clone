import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import  Input from '@material-ui/core/Input';


function UsernameControl({state, dispatch}) {

  const validationForm =  /(?=^.{3,}$)/;

  function usernameValidation(value){
    if(validationForm.test(value)){
      dispatch({type:'usernameValidation', payload:true})
    }else{
      dispatch({type:'usernameValidation', payload:false})
    }
  }
    
  const handleChange = (event) => {
    dispatch({type:'username', payload: event.target.value})
    setTimeout(usernameValidation, 1000, event.target.value);
  };

  return (
    <FormControl>
      <InputLabel htmlFor='username' error={!state.usernameValidation}>Username</InputLabel>
      <Input
        required
        id='username'
        label='user name'
        value={state.username}
        onChange={handleChange}
      />
      {!state.usernameValidation && <FormHelperText id="username" error>Username should be more than 8 characters.</FormHelperText>}
    </FormControl>
  )
}

export default UsernameControl;
