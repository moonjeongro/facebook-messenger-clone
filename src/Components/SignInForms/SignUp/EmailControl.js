import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

function EmailControl({state, dispatch}) {

  const validationForm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

  function emailValidation(value) {
    if (validationForm.test(value)) {
      dispatch({ type: 'emailValidation', payload: true })
    } else {
      dispatch({ type: 'emailValidation', payload: false })
    }
  }

  const handleChange = (event) => {
    dispatch({ type: 'email', payload: event.target.value })
    setTimeout(emailValidation, 1000, event.target.value);
  };

  return (
    <FormControl>
      <InputLabel htmlFor='email' error={!state.emailValidation}>Email</InputLabel>
      <Input
        required
        autoFocus
        id='email'
        label='email address'
        type='email'
        error={!state.emailValidation}
        value={state.email}
        onChange={handleChange}
      />
      {!state.emailValidation && <FormHelperText id="email" error>Invalid email address.</FormHelperText>}
    </FormControl>
  )
}

export default EmailControl
