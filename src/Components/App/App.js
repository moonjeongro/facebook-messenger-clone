import React, { useReducer, useEffect } from 'react';

import MessageBox from '../MessageBox';
import styled from 'styled-components';
import InputBar from '../InputBar';
import Header from '../Header';
import firebase from 'firebase';
import { UserContext } from '../../UserManagementContext';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const StyledHeader = styled(Header)`
  grid-row: 1;
  
  position: sticky;
  top: 0px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .10);

  z-index: 1;
  width: 100%;
  padding: 20px;
`

const StyledMessageBox = styled(MessageBox)`
  grid-row: 2;
  padding: 20px;
  position: relative;
  overflow-y: auto;
`

const StyledInputBar = styled(InputBar)`
  grid-row: 3;
  
  position: sticky;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 10px;
  background-color: white;
`

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case 'signin':
      return action.payload;
    case 'signout':
      return action.payload;
    default:
      throw new Error();
  }
}

function App() {
  const [user, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // app이 시작되면 익명 사용자로 로그인
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch({ type: 'signin', payload: user })
      } else {
        firebase.auth().signInAnonymously().catch(function (error) {

        });
        dispatch({ type: 'signin', payload: firebase.auth().currentUser })
      }
    });
  }, [])

  return (
    <UserContext.Provider value={user}>
      <Container>
        <StyledHeader />
        <StyledMessageBox />
        <StyledInputBar />
      </Container>
    </UserContext.Provider>
  );
}

export default App;