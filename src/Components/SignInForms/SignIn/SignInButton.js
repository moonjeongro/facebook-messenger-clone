import React from 'react'
import Button from '@material-ui/core/Button';

function SignInButton({dispatch}) {

  function handleOpen(){
    dispatch({type:'open'});
  }

  return (
    <Button color='primary' onClick={handleOpen}>
      Sign-in
    </Button>
  )
}

export default SignInButton;
