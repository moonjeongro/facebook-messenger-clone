import React, { useState, useEffect } from 'react';

import { FormControl, Input } from '@material-ui/core';

import { db } from '../../firebase';
import firebase from 'firebase';

import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MessageBox from '../MessageBox';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const Header = styled.div`
  grid-row: 1;
  
  position: sticky;
  top: 0px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .10);

  z-index: 1;
  width: 100%;
  padding: 20px;
`

const Content = styled.div`
  grid-row: 2;
  padding: 20px;
  position: relative;
  overflow-y: auto;
`

const InputBox = styled.div`
  grid-row: 3;
  
  position: sticky;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 10px;
  background-color: white;
`

const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
`

const StyledInput = styled(Input)`
  flex: 1;
`

const StyledIconButton = styled(IconButton)`
  flex: 0;
`

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // run once when the app component loads
    // snapshot으로 데이터베이스가 업데이트 될 때마다 이 코드를 실행한다.
    db.collection('messages')
      .orderBy('timeStamp')
      .onSnapshot(snapshot => {
        setMessages(snapshot?.docs.map(doc => ({
          id: doc.id, message: doc.data()
        })))
      })
  }, [])

  useEffect(() => {
    setUserName(prompt("Please enter your name"))
  }, []) // condition

  const sendMessage = (event) => {
    // all the login to send a message goes
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      userName: userName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <Container>
      <Header>
        avartar / name
      </Header>

      <Content>
        <MessageBox messages={messages} userName={userName} />
      </Content>

      <InputBox>
        <form>
          <StyledFormControl >
            <StyledInput className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
            <StyledIconButton
              className="app__iconButton"
              disabled={!input}
              type="submit"
              onClick={sendMessage}
              color="primary"
              variant="contained"
              className="app__button"
            >
              <SendIcon />
            </StyledIconButton>
          </StyledFormControl>
        </form>
      </InputBox>
    </Container>
  );
}

export default App;
