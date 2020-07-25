import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AppSkeleton from './components/AppSkeleton';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import { MuiThemeProvider } from '@material-ui/core/styles'; // Allows custom color theme
import theme from './theme.js' //Only draws from the login theme. Can't figure out how to switch to the skeleton theme :/
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

/*
Info: 
The Router basically moves the user from webpage to webpage via different URL Extentions.
If you want to set up a new page for the user, underneath the Switch you need to add a new Route, following the same format as the others.
The extension should be different, and the word between the brackets should link to the component. The component needs to be imported as well.

In your component, there are two main ways to switch to other pages:
 - Change a Link's href value to the wanted page's extension
 - Import useHistory via the line "import {useHistory} from 'react-router-dom';"", then put "const history = useHistory()' somewhere in the function. From there, the command history.push('/') can be used to switch between pages, depending on the extension input.

 The second one's the best, imo, as you can just hardcode it in wherever needed, even conditionally. Will likely need something else for the pop-up buttons, though.
*/

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        {/* Wrapper for custom theme */}
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component = {AppSkeleton} />
            <Route path="/signup" render={(props) => <SignUp open={true} modal={false} />} />
            <Route path="/login" render={(props) => <Login open={true} modal={false} />} />
            <Route path="/userprofile" component = {UserProfile} />
            <Route path="/editprofile" component = {EditProfile} />
          </Switch>
        </MuiThemeProvider>
        </header>
      </div>
    </Router>
  );
}

export default App;
