import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from '../Message/Message';
import db from '../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // run once when the app component loads
    // snapshot으로 데이터베이스가 업데이트 될 때마다 이 코드를 실행한다.
    db.collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data()})))
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
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"></img>
      <h1>Let's start </h1>
      <h2>Welcome {userName}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            type="submit"
            onClick={sendMessage}
            color="primary"
            variant="contained"
            className="app__button"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} userName={userName} message={message} />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
