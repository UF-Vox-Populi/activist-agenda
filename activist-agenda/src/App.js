import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Login from './components/Login';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MuiThemeProvider theme={theme}>
        <Login />
      </MuiThemeProvider>
      </header>
    </div>
  );
}

export default App;
