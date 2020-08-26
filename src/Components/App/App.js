import React from 'react';

import MessageBox from '../MessageBox';
import styled from 'styled-components';
import InputBar from '../InputBar';

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

function App() {

  return (
    <Container>
      <Header>
        avartar / name
      </Header>
      <StyledMessageBox />
      <StyledInputBar />
      
    </Container>
  );
}

export default App;
