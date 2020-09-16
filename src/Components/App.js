import React, { useReducer, useEffect } from 'react';

import MessageBox from './MessageBox/MessageBox';

import InputBar from './InputBar';
import Header from './Header';

import { UserContext, UserDispatchContext } from '../UserManagementContext';
import styled from 'styled-components';
import { getAnonymousUser } from '../firebase';
import { gql, useMutation } from '@apollo/client';


const ADD_USER = gql`
  mutation AddUser($userUid:String!, $displayName: String! $photoURL: String!) {
    addUser(userUid:$userUid, displayName:$displayName, photoURL:$photoURL){
      result
      message
    }
  }
`

const Container = styled.div`
  display: grid;
  overflow: hidden;
  height: 98vh;
  width: 98vw;

  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "message"
    "inputbar";
`

const HeaderArea = styled.div`
  grid-area: header;

  position: sticky;
  top: 0px;
  
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .10);

  z-index: 1;
  width: 100%;
`

const MessageBoxArea = styled.div`
  grid-area: message;
  overflow-y: auto;
  position: relative;
  
  align-self: end;
`

const InputBarArea = styled.div`
  grid-area: inputbar;

  position: sticky;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background-color: white;
`

const initialState = {
  uid: '',
  displayName: '',
  photoURL: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'signin':
      return {...action.payload};
    case 'signout':
      return {...action.payload};
    case 'changeDisplayName':
      return {...state, displayName:action.payload}
      case 'changePhotoURL':
        return {...state, photoURL:action.payload}
    default:
      throw new Error();
  }
}

function App() {

  const [user, dispatch] = useReducer(reducer, initialState);

  const [addUser] = useMutation(ADD_USER);

  // app이 시작되면 익명 사용자로 로그인
  useEffect(() => {
    getAnonymousUser()
      .then((user) => {
        console.log(user)
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
        dispatch({ type: 'signin', payload: userInfo })

        addUser({ variables: 
          { userUid: user.uid, 
            displayName: user.displayName,
            photoURL: (user.photoURL!==null? user.photoURL:'null')
          }});
      })
  }, [])

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        <Container>
          <HeaderArea> <Header /> </HeaderArea>
          <MessageBoxArea> <MessageBox /> </MessageBoxArea>
          <InputBarArea> <InputBar /> </InputBarArea>
        </Container>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;