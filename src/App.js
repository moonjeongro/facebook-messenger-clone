import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import Message from './Components/Messages/Message';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {userName: 'mj', text: 'hi'},
    {userName: 'mui', text: 'sup'}
  ]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
      setUserName(prompt("Please enter your name"))
  }, []) // condition

  const sendMessage = (event) => {
    // all the login to send a message goes
    event.preventDefault();
    setMessages([...messages, {userName: userName, text: input}]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Let's start </h1>
      <h2>Welcome {userName}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message... </InputLabel>
          <Input value={input} onChange={ event => setInput(event.target.value) } />
          <Button disabled={!input} type='submit' variant="contained" color="primary" onClick={sendMessage}> Send Message </Button>
        </FormControl>
      </form>

      {messages.map(message => (
        <Message userName={userName} message={message} />
      ))}
      
    </div>
  );
}

export default App;
