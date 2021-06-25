import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import { useAppContext } from "./libs/contextLib";
import Header from "./containers/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
	const [isAuthenticated, userHasAuthenticated] = useState(false);
   const [isAuthenticating, setIsAuthenticating] = useState(true);
   const [userEmail, setUserEmail] = useState();
       const [gameID, setGameID] = useState(null);
       const [importedGameID, setImportedGameID] = useState();
   	const [exportGameID, setExportGameID] = useState();

useEffect(() => {
      onLoad();
    }, []);

    async function onLoad() {
          try {
            await Auth.currentSession();
            userHasAuthenticated(true);
          }
          catch(e) {
            if (e !== 'No current user') {
              onError(e);
            }
          }

          setIsAuthenticating(false);
        }

return (
  <div>

  		<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, userEmail, setUserEmail, importedGameID, setImportedGameID, exportGameID }}>
  			<Header>
  			</Header>
  		</AppContext.Provider>

  </div>
);
}
export default App;