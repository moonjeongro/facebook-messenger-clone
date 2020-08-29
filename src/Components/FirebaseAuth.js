import React from 'react'
import { startAuthUi } from '../firebase';

function FirebaseAuth() {

  const elementId = 'firebaseui-auth-container';
  startAuthUi(`#${elementId}`)

  return (
    <>
      <div id={elementId}> </div>
      <div id="loader">Loading...</div>
    </>
  )
}

export default FirebaseAuth;