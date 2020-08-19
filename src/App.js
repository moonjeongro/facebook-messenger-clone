import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    // all the login to send a message goes
    event.preventDefault();
    setMessages([...messages, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Let's start </h1>
      <form>
        <input value={input} onChange={ event => setInput(event.target.value) } />
        <Button disable={!input} type='submit' variant="contained" color="primary" onClick={sendMessage}> Send Message </Button>
      </form>

      {messages.map(message => (
        <p>{message}</p>
      ))}
      
    </div>
  );
}

export default App;
